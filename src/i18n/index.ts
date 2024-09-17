import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ru from "./langs/ru.json";

import deployment from "@/deployment/deployment.json";

const debug = deployment.env === "development";

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
