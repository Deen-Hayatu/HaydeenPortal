import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
  type: 'error' | 'warning' | 'info';
}

interface EnhancedValidationProps {
  value: string;
  rules: ValidationRule[];
  showValidation?: boolean;
  className?: string;
}

export const EnhancedValidation = ({
  value,
  rules,
  showValidation = true,
  className,
}: EnhancedValidationProps) => {
  const [validationResults, setValidationResults] = useState<Array<{
    rule: ValidationRule;
    passed: boolean;
  }>>([]);

  useEffect(() => {
    const results = rules.map(rule => ({
      rule,
      passed: rule.test(value),
    }));
    setValidationResults(results);
  }, [value, rules]);

  if (!showValidation || validationResults.length === 0) {
    return null;
  }

  const hasErrors = validationResults.some(r => !r.passed && r.rule.type === 'error');
  const hasWarnings = validationResults.some(r => !r.passed && r.rule.type === 'warning');

  return (
    <div className={cn('mt-2 space-y-1', className)}>
      {validationResults.map((result, index) => {
        if (result.passed) return null;

        const Icon = result.rule.type === 'error' 
          ? AlertCircle 
          : result.rule.type === 'warning' 
          ? Info 
          : CheckCircle2;

        const colorClasses = {
          error: 'text-red-600 bg-red-50 border-red-200',
          warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
          info: 'text-blue-600 bg-blue-50 border-blue-200',
        };

        return (
          <div
            key={index}
            className={cn(
              'flex items-center gap-2 text-sm p-2 rounded border',
              colorClasses[result.rule.type]
            )}
            role="alert"
            aria-live="polite"
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{result.rule.message}</span>
          </div>
        );
      })}
    </div>
  );
};

// Password strength validation rules
export const passwordRules: ValidationRule[] = [
  {
    test: (value) => value.length >= 8,
    message: 'Password must be at least 8 characters long',
    type: 'error',
  },
  {
    test: (value) => /[A-Z]/.test(value),
    message: 'Include at least one uppercase letter',
    type: 'error',
  },
  {
    test: (value) => /[a-z]/.test(value),
    message: 'Include at least one lowercase letter',
    type: 'error',
  },
  {
    test: (value) => /\d/.test(value),
    message: 'Include at least one number',
    type: 'error',
  },
  {
    test: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
    message: 'Include at least one special character',
    type: 'warning',
  },
];

// Email validation rules
export const emailRules: ValidationRule[] = [
  {
    test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Please enter a valid email address',
    type: 'error',
  },
  {
    test: (value) => !value.includes('..'),
    message: 'Email cannot contain consecutive dots',
    type: 'error',
  },
];

// Phone validation rules (Ghana format)
export const ghanaPhoneRules: ValidationRule[] = [
  {
    test: (value) => /^(\+233|0)[2-5][0-9]{8}$/.test(value.replace(/\s/g, '')),
    message: 'Please enter a valid Ghana phone number (e.g., +233 207 884 182)',
    type: 'error',
  },
];