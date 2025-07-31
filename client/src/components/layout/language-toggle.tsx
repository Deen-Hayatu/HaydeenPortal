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
    // International
    { code: 'en' as const, name: 'English', flag: '🇺🇸', region: 'International' },
    { code: 'fr' as const, name: 'Français', flag: '🇫🇷', region: 'West Africa' },
    
    // Ghanaian Languages
    { code: 'twi' as const, name: 'Twi (Akan)', flag: '🇬🇭', region: 'Ghana' },
    { code: 'fante' as const, name: 'Fante', flag: '🇬🇭', region: 'Ghana' },
    { code: 'ga' as const, name: 'Ga', flag: '🇬🇭', region: 'Ghana' },
    { code: 'ewe' as const, name: 'Ewe', flag: '🇬🇭', region: 'Ghana' },
    { code: 'hausa' as const, name: 'Hausa', flag: '🇬🇭', region: 'Ghana' },
    { code: 'dagbani' as const, name: 'Dagbani', flag: '🇬🇭', region: 'Ghana' }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 max-h-80 overflow-y-auto">
        <div className="p-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2">International</div>
          {languages.filter(lang => lang.region === 'International' || lang.region === 'West Africa').map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center gap-2 cursor-pointer rounded-md ${
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
        </div>
        
        <div className="p-2 border-t">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Ghanaian Languages</div>
          {languages.filter(lang => lang.region === 'Ghana').map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center gap-2 cursor-pointer rounded-md ${
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
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;