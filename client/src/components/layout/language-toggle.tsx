import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getCurrentLanguage, setLanguage, type SupportedLanguage } from '@/lib/language';

const LanguageToggle = () => {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('en');

  useEffect(() => {
    setCurrentLang(getCurrentLanguage());
  }, []);

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
    setCurrentLang(lang);
    // Trigger a page reload to update all language-dependent content
    window.location.reload();
  };

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'twi' as const, name: 'Twi', flag: '🇬🇭' }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`flex items-center gap-2 cursor-pointer ${
              currentLang === lang.code ? 'bg-accent' : ''
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="flex-1">{lang.name}</span>
            {currentLang === lang.code && (
              <span className="text-xs text-muted-foreground">Current</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;