//Theme handling based on toggle switch
const themeToggle = document.getElementById(
  "theme-toggle"
) as HTMLElement | null;
const body = document.body;

//If theme preference is stored, apply on reload
const theme = localStorage.getItem("theme");
if (theme) {
  body.classList.add(theme);
}

//on click the class is changed and the user choice saved in local storage
themeToggle?.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    body.classList.replace("light", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.replace("dark", "light");
    localStorage.setItem("theme", "light");
  }
});

//I18n setup

//the default language, French for now
const defaultLocale: string = "fr";
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
});

async function setLocale(newLocale: string) {
  if (newLocale === locale) return;
  const newTranslations = await fetchTranslationsFor(newLocale);
  locale = newLocale;
  translations = newTranslations;
  translatePage();
}
//translations are retrieved from the corresponding json file
async function fetchTranslationsFor(newLocale: string): Promise<Translations> {
  const response = await fetch(`../src/lang/${newLocale}.json`);
  return await response.json();
}
function translatePage() {
  document
    .querySelectorAll<HTMLElement>("[data-i18n-key]")
    .forEach(translateElement);
}
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
