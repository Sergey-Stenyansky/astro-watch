import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ru from "./langs/ru.json";

const debug = process.env.NODE_ENV === "development";

i18n.use(initReactI18next).init({
  lng: "ru",
  resources: {
    ru: {
      translation: ru,
    },
  },
  interpolation: {
    escapeValue: false,
  },
  debug,
});

export default i18n;
