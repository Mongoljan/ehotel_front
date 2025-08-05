'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const TranslationContext = createContext();

// Available languages
const LANGUAGES = {
  en: { code: 'en', name: 'English', flag: '🇺🇸' },
  mn: { code: 'mn', name: 'Монгол', flag: '🇲🇳' }
};

// Translation hook
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    // Return a default function for SSR or when context is unavailable
    return {
      t: (key) => key, // Return the key itself as fallback
      currentLanguage: 'en',
      changeLanguage: () => {},
      switchLanguage: () => {},
      isLoading: false,
      languages: LANGUAGES,
      availableLanguages: Object.values(LANGUAGES),
      getLanguageInfo: (code) => LANGUAGES[code] || LANGUAGES.en
    };
  }
  return context;
};

export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations
  const loadTranslations = async (language) => {
    try {
      setIsLoading(true);
      const response = await import(`../locales/${language}.json`);
      setTranslations(response.default || response);
    } catch (error) {
      console.error(`Failed to load translations for ${language}:`, error);
      // Fallback to English if loading fails
      if (language !== 'en') {
        const fallback = await import('../locales/en.json');
        setTranslations(fallback.default || fallback);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize language from localStorage or browser preference
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const savedLanguage = localStorage.getItem('preferred-language');
    const browserLanguage = navigator.language.split('-')[0];
    const initialLanguage = savedLanguage || (LANGUAGES[browserLanguage] ? browserLanguage : 'en');
    
    setCurrentLanguage(initialLanguage);
    loadTranslations(initialLanguage);
  }, []);

  // Change language function
  const changeLanguage = (languageCode) => {
    if (LANGUAGES[languageCode]) {
      setCurrentLanguage(languageCode);
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-language', languageCode);
      }
      loadTranslations(languageCode);
    }
  };

  // Translation function
  const t = (key, params = {}) => {
    if (isLoading) return key;

    const keys = key.split('.');
    let value = translations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }

    if (value === undefined) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }

    // If value is a string, do parameter replacement
    if (typeof value === 'string') {
      return Object.keys(params).reduce((text, param) => {
        return text.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
      }, value);
    }

    // If value is an object (e.g., for FAQ), return as is
    return value;
  };

  const contextValue = {
    currentLanguage,
    changeLanguage,
    switchLanguage: changeLanguage, // Alias for consistency
    t,
    isLoading,
    languages: LANGUAGES,
    availableLanguages: Object.values(LANGUAGES),
    getLanguageInfo: (code) => LANGUAGES[code]
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};
