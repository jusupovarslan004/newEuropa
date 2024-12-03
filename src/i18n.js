import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ru: {
    translation: {
      about: "О нас",
      vacancies: "Вакансии",
      contacts: "Наши контакты",
      partners: "Для партнеров",
      submit: "Оставить заявку",
      stats: {
        title: "Мы в цифрах",
        workers: "Работников",
        workersDesc: "успешно работает",
      },
      hero: {
        title: "Работать за границей - это легко и просто!",
        description:
          "Lorem ipsum dolor sit amet consectetur. Urna gravida lectus diam etiam. Mi ultrices porttitor orci quam porta commodo. Tincidunt eget scelerisque aliquam elit mauris feugiat id.",
      },
      common: {
        leaveRequest: "Оставить заявку",
      },
    },
  },
  en: {
    translation: {
      about: "About",
      vacancies: "Vacancies",
      contacts: "Contacts",
      partners: "For Partners",
      submit: "Submit Application",
      stats: {
        title: "Our Statistics",
        workers: "Workers",
        workersDesc: "successfully working",
      },
    },
  },
  kg: {
    translation: {
      about: "Биз жөнүндө",
      vacancies: "Вакансиялар",
      contacts: "Байланыштар",
      partners: "Өнөктөштөр үчүн",
      submit: "Арыз калтыруу",
      stats: {
        title: "Биз сандарда",
        workers: "Жумушчулар",
        workersDesc: "ийгиликтүү иштеп жатат",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
