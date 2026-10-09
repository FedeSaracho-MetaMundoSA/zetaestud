import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language } from "../translations";

export type { Language };

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  short: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "es", name: "Español", nativeName: "Español", flag: "🇪🇸", short: "ES" },
  { code: "en", name: "Inglés", nativeName: "English", flag: "🇬🇧", short: "EN" },
  { code: "pt", name: "Portugués", nativeName: "Português", flag: "🇧🇷", short: "PT" },
  { code: "fr", name: "Francés", nativeName: "Français", flag: "🇫🇷", short: "FR" },
  { code: "it", name: "Italiano", nativeName: "Italiano", flag: "🇮🇹", short: "IT" }
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  currentOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("zeta_lang") as Language;
    if (saved && LANGUAGES.some(l => l.code === saved)) {
      return saved;
    }
    return "es";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("zeta_lang", lang);
    // Also update html lang attribute
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, fallback?: string): string => {
    const dict = translations[language];
    if (dict && dict[key]) {
      return dict[key];
    }
    const esDict = translations.es;
    if (esDict && esDict[key]) {
      return esDict[key];
    }
    return fallback || key;
  };

  const currentOption = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentOption }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
