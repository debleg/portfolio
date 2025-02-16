 import {themeHandling} from "./theme.js";
 import { i18nSetup } from "./i18n.js";

 //only initialize the theme and i18n when the DOM is ready
 document.addEventListener('DOMContentLoaded', () => {
  themeHandling();
  
});

i18nSetup();