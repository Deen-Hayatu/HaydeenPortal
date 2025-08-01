import { useEffect, useState } from 'react';

interface ScreenReaderAnnouncementProps {
  message: string;
  priority?: 'polite' | 'assertive';
  clearAfter?: number;
}

const ScreenReaderAnnouncement = ({ 
  message, 
  priority = 'polite', 
  clearAfter = 5000 
}: ScreenReaderAnnouncementProps) => {
  const [currentMessage, setCurrentMessage] = useState(message);

  useEffect(() => {
    setCurrentMessage(message);
    
    if (clearAfter > 0) {
      const timer = setTimeout(() => {
        setCurrentMessage('');
      }, clearAfter);

      return () => clearTimeout(timer);
    }
  }, [message, clearAfter]);

  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {currentMessage}
    </div>
  );
};

export default ScreenReaderAnnouncement;

// Hook for programmatic announcements
export const useScreenReaderAnnouncement = () => {
  const [announcement, setAnnouncement] = useState('');

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    // Clear first to ensure the message is read even if it's the same
    setAnnouncement('');
    setTimeout(() => {
      setAnnouncement(message);
    }, 10);
  };

  return {
    announce,
    AnnouncementComponent: () => (
      <ScreenReaderAnnouncement message={announcement} />
    ),
  };
};