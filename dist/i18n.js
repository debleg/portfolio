/**
 * Takes the value from a select input element to determine what language the user requires and replaces all text with appropriate translations
 * Resulting preferences are stored in local storage
 * Default is set to French
 */
export function i18nSetup() {
    try {
        let defaultLocale;
        //the language stored in local storage if the visitor has already changed it
        let storedLocale = localStorage.getItem("lang");
        //default changed to stored if stored exists
        if (!storedLocale) {
            defaultLocale = "fr";
        }
        else {
            defaultLocale = storedLocale;
        }
        //the language the site will be translated to
        let locale;
        //the translations relocated to json files
        let translations = {};
        //as the page loads
        document.addEventListener("DOMContentLoaded", () => {
            setLocale(defaultLocale);
            bindLocaleSwitcher(defaultLocale);
        });
        /**
         * Handles language switcher interaction and sets user preference accordingly
         */
        function bindLocaleSwitcher(initialValue) {
            try {
                const switcher = document.querySelector("[data-i18n-switcher]");
                if (!switcher)
                    return;
                switcher.value = initialValue;
                switcher.onchange = (e) => {
                    //typescript can't infer the e.target type without an extra step
                    const target = e.target;
                    setLocale(target.value);
                    localStorage.setItem("lang", target.value);
                    storedLocale = target.value;
                };
            }
            catch (error) {
                console.error("Error in bindLocaleSwitcher:", error);
            }
        }
        /**
         * Fetches new translations, applies them, and updates the html lang on language change
         */
        async function setLocale(newLocale) {
            try {
                if (newLocale === locale)
                    return;
                const newTranslations = await fetchTranslationsFor(newLocale);
                locale = newLocale;
                translations = newTranslations;
                translatePage();
                updateHtmlLang(newLocale);
            }
            catch (error) {
                console.error("Error in setLocale:", error);
            }
        }
        /**
         * Retrieves translations from the corresponding json file
         */
        async function fetchTranslationsFor(newLocale) {
            try {
                const response = await fetch(`./lang/${newLocale}.json`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const translations = await response.json();
                return translations;
            }
            catch (error) {
                console.error("Error fetching translations:", error);
                return {};
            }
        }
        /**
         * Replaces all translatable elements to match user preference
         */
        function translatePage() {
            try {
                document
                    .querySelectorAll("[data-i18n-key]")
                    .forEach(translateElement);
            }
            catch (error) {
                console.error("Error in translatePage:", error);
            }
        }
        /**
         * Replaces elements are only replaced if both the key and the corresponding translation exist
         */
        function translateElement(element) {
            try {
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
            catch (error) {
                console.error("Error in translateElement:", error);
            }
        }
        /**
         * Updates the lang attribute to match applied translations
         */
        function updateHtmlLang(newLocale) {
            document.documentElement.setAttribute("lang", newLocale);
        }
    }
    catch (error) {
        console.error("Error in i18nSetup:", error);
    }
}
//# sourceMappingURL=i18n.js.map