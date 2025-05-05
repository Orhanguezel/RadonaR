import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// EN files
import enCommon from './translations/en/common.json'
import enNavbar from './translations/en/navbar.json'
import enAdmin from './translations/en/admin.json'
import enFooter from './translations/en/footer.json'
import enHome from './translations/en/home.json'
import enProducts from './translations/en/products.json'
import enCart from './translations/en/cart.json'


// DE files
import deCommon from './translations/de/common.json'
import deNavbar from './translations/de/navbar.json'
import deAdmin from './translations/de/admin.json'
import deFooter from './translations/de/footer.json'
import deHome from './translations/de/home.json'
import deProducts from './translations/de/products.json'
import deCart from './translations/de/cart.json'


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        navbar: enNavbar,
        footer: enFooter,
        admin: enAdmin,
        home: enHome,
        products: enProducts,
        cart: enCart,
      },
      de: {
        common: deCommon,
        navbar: deNavbar,
        footer: deFooter,
        admin: deAdmin,
        home: deHome,
        products: deProducts,
        cart: deCart,
      },
    },
    fallbackLng: 'en',
    ns: ['common', 'navbar', 'footer', 'home', 'products', 'cart'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
