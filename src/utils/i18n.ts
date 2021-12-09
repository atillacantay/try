import i18next from "i18next";

export const getCurrentLanguage = () =>
  localStorage.getItem("language") ?? i18next.language;

export const changeLanguage = (languageKey: string) =>
  i18next.changeLanguage(languageKey);

export const getLanguageList = () => i18next.languages;

export const getLanguageLabel = (languageKey: string) => {
  let languageNames = new Intl.DisplayNames([languageKey], {
    type: "language",
  });
  return languageNames.of(languageKey);
};
