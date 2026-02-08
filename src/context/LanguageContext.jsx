import { createContext, useContext, useState, useEffect } from 'react';
import ko from '../i18n/ko';
import en from '../i18n/en';

const LanguageContext = createContext();

const translations = { ko, en };

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        // Load saved language preference
        const saved = localStorage.getItem('app-language');
        return saved || 'ko';
    });

    useEffect(() => {
        // Save language preference
        localStorage.setItem('app-language', language);
    }, [language]);

    // Translation function
    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                // Fallback to Korean if key not found
                value = translations.ko;
                for (const fallbackKey of keys) {
                    if (value && value[fallbackKey] !== undefined) {
                        value = value[fallbackKey];
                    } else {
                        return key; // Return key if not found
                    }
                }
                break;
            }
        }

        return value;
    };

    const switchLanguage = (lang) => {
        if (lang === 'ko' || lang === 'en') {
            setLanguage(lang);
        }
    };

    return (
        <LanguageContext.Provider value={{
            language,
            switchLanguage,
            t,
            isEnglish: language === 'en',
            isKorean: language === 'ko',
        }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
