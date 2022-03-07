import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

/**
 * .use(Backend) : Load resources, loadPath: '/locales/{{lng}}/{{ns}}.json'
 * .use(LanguageDetector) : detect user language from the browser
 * .use(initReactI18next) : make it available for all react components
 * 
 */
i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'sv'],
        fallbackLng: 'en', //default language if no language is detected.
        detection: { 
            order: ['localStorage', 'navigator'],
            lookupLocalStorage: 'localStorage.i18nextLng'
        },

        interpolation: {
            escapeValue: false //react already escapes all strings and is safe from XSS.
        }
    });

export default i18n;