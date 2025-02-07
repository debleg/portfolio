"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Theme handling based on toggle switch
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
//If theme preference is stored, apply on reload
const theme = localStorage.getItem("theme");
if (theme) {
    body.classList.add(theme);
}
//on click the class is changed and the user choice saved in local storage
themeToggle === null || themeToggle === void 0 ? void 0 : themeToggle.addEventListener("click", () => {
    if (body.classList.contains("light")) {
        body.classList.replace("light", "dark");
        localStorage.setItem("theme", "dark");
    }
    else {
        body.classList.replace("dark", "light");
        localStorage.setItem("theme", "light");
    }
});
//I18n setup
//the default language, French for now
const defaultLocale = "fr";
//the language the site will be translated to
let locale;
//the translations relocated to json files
let translations = {};
//as the page loads
document.addEventListener("DOMContentLoaded", () => {
    setLocale(defaultLocale);
    bindLocaleSwitcher(defaultLocale);
});
//allows user to select their language preference
function bindLocaleSwitcher(initialValue) {
    const switcher = document.querySelector("[data-i18n-switcher]");
    if (!switcher)
        return;
    switcher.value = initialValue;
    switcher.onchange = (e) => {
        //typescript can't infer the e.target type without an extra step
        const target = e.target;
        setLocale(target.value);
    };
}
//on locale change, new translations are fetched, applied, and html lang updated
function setLocale(newLocale) {
    return __awaiter(this, void 0, void 0, function* () {
        if (newLocale === locale)
            return;
        const newTranslations = yield fetchTranslationsFor(newLocale);
        locale = newLocale;
        translations = newTranslations;
        translatePage();
        updateHtmlLang(newLocale);
    });
}
//translations are retrieved from the corresponding json file
function fetchTranslationsFor(newLocale) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`/src/lang/${newLocale}.json`);
        return yield response.json();
    });
}
//all translatable elements with the right key are replaced
function translatePage() {
    document
        .querySelectorAll("[data-i18n-key]")
        .forEach(translateElement);
}
//elements are only replaced if both the key and the corresponding translation exist
function translateElement(element) {
    const key = element.getAttribute("data-i18n-key");
    if (key === null)
        return;
    const translation = translations[key];
    if (translation) {
        element.innerText = translation;
    }
    else {
        console.warn(`Translation missing for key: ${key}"`);
    }
}
//updates the lang attribute to new locale when called
function updateHtmlLang(newLocale) {
    document.documentElement.setAttribute('lang', newLocale);
}
//# sourceMappingURL=index.js.map