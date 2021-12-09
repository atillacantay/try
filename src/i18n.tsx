import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getCurrentLanguage } from "utils/i18n";
import translationDE from "./locales/de.json";
import translationEN from "./locales/en.json";
import translationTR from "./locales/tr.json";

i18n.use(initReactI18next).init({
  lng: getCurrentLanguage(),
  fallbackLng: ["en", "de", "tr"],
  debug: true,
  resources: {
    en: {
      translation: translationEN,
    },
    de: {
      translation: translationDE,
    },
    tr: {
      translation: translationTR,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
