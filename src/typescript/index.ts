 import {themeHandling} from "./theme.js";

 //only initialize the theme when the DOM is ready
 document.addEventListener('DOMContentLoaded', () => {
  themeHandling();
});

//I18n setup

//the default language, French for now
let defaultLocale: string;
//the language stored in local storage if the visitor has already changed it
let storedLocale: string | null = localStorage.getItem("lang");

//default changed to stored if stored exists
if (!storedLocale) {
  defaultLocale = "fr";
} else {
  defaultLocale = storedLocale;
}

//the language the site will be translated to
let locale: string;

interface Translations {
  [key: string]: string;
}
//the translations relocated to json files
let translations: Translations = {};

//as the page loads
document.addEventListener("DOMContentLoaded", () => {
  setLocale(defaultLocale);
  bindLocaleSwitcher(defaultLocale);
});

//allows user to select their language preference
function bindLocaleSwitcher(initialValue: string) {
  const switcher: HTMLSelectElement | null = document.querySelector(
    "[data-i18n-switcher]"
  );
  if (!switcher) return;
  switcher.value = initialValue;
  switcher.onchange = (e: Event) => {
    //typescript can't infer the e.target type without an extra step
    const target = e.target as HTMLSelectElement;
    setLocale(target.value);
    localStorage.setItem("lang", target.value);
    storedLocale = target.value;
  };
}

//on locale change, new translations are fetched, applied, and html lang updated
async function setLocale(newLocale: string) {
  if (newLocale === locale) return;
  const newTranslations = await fetchTranslationsFor(newLocale);
  locale = newLocale;
  translations = newTranslations;
  translatePage();
  updateHtmlLang(newLocale);
}

//translations are retrieved from the corresponding json file
async function fetchTranslationsFor(newLocale: string): Promise<Translations> {
  const response = await fetch(`./lang/${newLocale}.json`);
  return await response.json();
}

//all translatable elements with the right key are replaced
function translatePage() {
  document
    .querySelectorAll<HTMLElement>("[data-i18n-key]")
    .forEach(translateElement);
}

//elements are only replaced if both the key and the corresponding translation exist
function translateElement(element: HTMLElement) {
  const key: string | null = element.getAttribute("data-i18n-key");
  if (key === null) return;

  const translation = translations[key];
  if (translation) {
    element.innerText = translation;
  } else {
    console.warn(`Translation missing for key: ${key}"`);
  }
}

//updates the lang attribute to new locale when called
function updateHtmlLang(newLocale: string) {
  document.documentElement.setAttribute("lang", newLocale);
}
