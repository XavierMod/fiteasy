import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import langEn from '../locales/en.json';
import langEs from '../locales/es.json';

const resources = {
  en: {
    translation: langEn,
  },
  es: {
    translation: langEs,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lgn: 'en',
  // debug: process.env.NODE_ENV === 'development',
  debug: true,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
