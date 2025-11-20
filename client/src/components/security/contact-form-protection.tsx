import { useState, useEffect } from 'react';

// Simple client-side rate limiting and basic protection
class ContactFormProtection {
  private static readonly MAX_ATTEMPTS = 3;
  private static readonly COOLDOWN_PERIOD = 5 * 60 * 1000; // 5 minutes
  private static readonly STORAGE_KEY = 'contact_form_attempts';

  static canSubmit(): boolean {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return true;

    try {
      const data = JSON.parse(stored);
      const now = Date.now();
      
      // Clean old attempts
      data.attempts = data.attempts.filter(
        (timestamp: number) => now - timestamp < this.COOLDOWN_PERIOD
      );

      if (data.attempts.length >= this.MAX_ATTEMPTS) {
        return false;
      }

      // Update storage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch {
      return true;
    }
  }

  static recordAttempt(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    let data: { attempts: number[] } = { attempts: [] };

    if (stored) {
      try {
        data = JSON.parse(stored);
        if (!Array.isArray(data.attempts)) {
          data.attempts = [];
        }
      } catch {
        data = { attempts: [] };
      }
    }

    data.attempts.push(Date.now());
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  static getRemainingCooldown(): number {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return 0;

    try {
      const data = JSON.parse(stored);
      const now = Date.now();
      
      if (data.attempts.length < this.MAX_ATTEMPTS) return 0;

      const oldestAttempt = Math.min(...data.attempts);
      const cooldownEnd = oldestAttempt + this.COOLDOWN_PERIOD;
      
      return Math.max(0, cooldownEnd - now);
    } catch {
      return 0;
    }
  }
}

interface Props {
  children: (params: {
    canSubmit: boolean;
    remainingCooldown: number;
    recordAttempt: () => void;
  }) => React.ReactNode;
}

const ContactFormProtectionProvider = ({ children }: Props) => {
  const [canSubmit, setCanSubmit] = useState(true);
  const [remainingCooldown, setRemainingCooldown] = useState(0);

  useEffect(() => {
    const checkStatus = () => {
      setCanSubmit(ContactFormProtection.canSubmit());
      setRemainingCooldown(ContactFormProtection.getRemainingCooldown());
    };

    checkStatus();
    const interval = setInterval(checkStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  const recordAttempt = () => {
    ContactFormProtection.recordAttempt();
    setCanSubmit(ContactFormProtection.canSubmit());
    setRemainingCooldown(ContactFormProtection.getRemainingCooldown());
  };

  return <>{children({ canSubmit, remainingCooldown, recordAttempt })}</>;
};

export default ContactFormProtectionProvider;