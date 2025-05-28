/* eslint-disable @typescript-eslint/no-require-imports */

// TODO: do all translations

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      translation: require("../public/locales/en/translations.json"),
    },
    de: {
      translation: require("../public/locales/de/translations.json"),
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
