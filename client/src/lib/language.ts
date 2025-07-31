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

// Ga translations
export const ga: LanguageStrings = {
  welcome: "Akwaaba",
  services: "Nkwaahemee",
  about: "Niihii",
  contact: "Gbaleme",
  solutions: "Tsuilii",
  products: "Nkɛmoo",
  blog: "Bloo",
  careers: "Saamɛi",
  home: "Fie",
  getStarted: "Daase",
  learnMore: "Kɛ sɛ pii",
  contactUs: "Gbaleme",
  readMore: "Klan pii",
  viewAll: "Lɛ nyɛ"
};

// Ewe translations
export const ewe: LanguageStrings = {
  welcome: "Wolɔ̃",
  services: "Dɔwɔwɔwo",
  about: "Míawo ŋuti",
  contact: "Kaa nu mí",
  solutions: "Kpɔɖenuwɔwo",
  products: "Nuwo",
  blog: "Nuŋlɔɖi",
  careers: "Dɔwɔwo",
  home: "Aƒe",
  getStarted: "Dze egɔme",
  learnMore: "Srɔ̃ wu",
  contactUs: "Ka nu mí",
  readMore: "Xlẽ wu",
  viewAll: "Kpɔ wo katã"
};

// Hausa translations
export const hausa: LanguageStrings = {
  welcome: "Barka da zuwa",
  services: "Ayyuka",
  about: "Game da mu",
  contact: "Tuntube mu",
  solutions: "Mafita",
  products: "Kayayyaki",
  blog: "Rubutu",
  careers: "Aiki",
  home: "Gida",
  getStarted: "Fara",
  learnMore: "Kara koyo",
  contactUs: "Tuntube mu",
  readMore: "Karanta kara",
  viewAll: "Duba duka"
};

// Dagbani translations
export const dagbani: LanguageStrings = {
  welcome: "Marhaba",
  services: "Tuma",
  about: "Ti shɛli",
  contact: "Gɔli ti",
  solutions: "Yɛltɔɣi",
  products: "Tiɣri",
  blog: "Karatu",
  careers: "Tuma",
  home: "Yiili",
  getStarted: "Piili",
  learnMore: "Karandi pam",
  contactUs: "Gɔli ti",
  readMore: "Karandi kpam",
  viewAll: "Lɛbi kpakpam"
};

// Fante translations
export const fante: LanguageStrings = {
  welcome: "Akwaaba",
  services: "Adwuma",
  about: "Yen ho nsɛm",
  contact: "Ka yen ho",
  solutions: "Ano aduru",
  products: "Nneɛma",
  blog: "Amanneɛbɔ",
  careers: "Adwuma",
  home: "Efie",
  getStarted: "Fi ase",
  learnMore: "Sua bio",
  contactUs: "Ka yen ho",
  readMore: "Kenkan bio",
  viewAll: "Hwɛ nyinaa"
};

// French translations (for neighboring countries)
export const fr: LanguageStrings = {
  welcome: "Bienvenue",
  services: "Services",
  about: "À propos",
  contact: "Contact",
  solutions: "Solutions",
  products: "Produits",
  blog: "Blog",
  careers: "Carrières",
  home: "Accueil",
  getStarted: "Commencer",
  learnMore: "En savoir plus",
  contactUs: "Nous contacter",
  readMore: "Lire plus",
  viewAll: "Voir tout"
};

export type SupportedLanguage = 'en' | 'twi' | 'ga' | 'ewe' | 'hausa' | 'dagbani' | 'fante' | 'fr';

export const languages = {
  en,
  twi,
  ga,
  ewe,
  hausa,
  dagbani,
  fante,
  fr
};

export function getLanguageStrings(lang: SupportedLanguage): LanguageStrings {
  return languages[lang] || languages.en;
}

export function getCurrentLanguage(): SupportedLanguage {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('language');
    const supportedLanguages: SupportedLanguage[] = ['en', 'twi', 'ga', 'ewe', 'hausa', 'dagbani', 'fante', 'fr'];
    if (stored && supportedLanguages.includes(stored as SupportedLanguage)) {
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