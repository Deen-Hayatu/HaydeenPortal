// Language support for Ghanaian languages
export interface LanguageStrings {
  welcome: string;
  services: string;
  about: string;
  contact: string;
  solutions: string;
  products: string;
  blog: string;
  careers: string;
  home: string;
  getStarted: string;
  learnMore: string;
  contactUs: string;
  readMore: string;
  viewAll: string;
}

// English translations
export const en: LanguageStrings = {
  welcome: "Welcome",
  services: "Services",
  about: "About",
  contact: "Contact",
  solutions: "Solutions",
  products: "Products",
  blog: "Blog", 
  careers: "Careers",
  home: "Home",
  getStarted: "Get Started",
  learnMore: "Learn More",
  contactUs: "Contact Us",
  readMore: "Read More",
  viewAll: "View All"
};

// Twi translations
export const twi: LanguageStrings = {
  welcome: "Akwaaba",
  services: "Nhyehyɛe",
  about: "Yɛn ho nsɛm",
  contact: "Ka yɛn ho",
  solutions: "Ano aduru",
  products: "Nneɛma",
  blog: "Amanneɛbɔ",
  careers: "Adwuma",
  home: "Fie",
  getStarted: "Fi aseɛ",
  learnMore: "Sua pii",
  contactUs: "Ka yɛn ho",
  readMore: "Kenkan pii",
  viewAll: "Hwɛ nyinaa"
};

export type SupportedLanguage = 'en' | 'twi';

export const languages = {
  en,
  twi
};

export function getLanguageStrings(lang: SupportedLanguage): LanguageStrings {
  return languages[lang] || languages.en;
}

export function getCurrentLanguage(): SupportedLanguage {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('language');
    if (stored && (stored === 'en' || stored === 'twi')) {
      return stored as SupportedLanguage;
    }
  }
  return 'en';
}

export function setLanguage(lang: SupportedLanguage): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang);
    // Update document language attribute
    document.documentElement.lang = lang;
  }
}