 import {themeHandling} from "./theme.js";
 import { i18nSetup } from "./i18n.js";
 import { techSkillsShowcase } from "./techskills.js";
 import { projectsShowcase } from "./projects.js";

 //only initialize the theme and i18n when the DOM is ready
 document.addEventListener('DOMContentLoaded', () => {
  themeHandling();
  
});

projectsShowcase();
i18nSetup();
techSkillsShowcase();


//dialog logic, needed for menu and projects
const dialogs = document.querySelectorAll<HTMLDialogElement>(".dialog");
const openButtons = document.querySelectorAll<HTMLButtonElement>(".open-dialog");
const closeButtons = document.querySelectorAll<HTMLButtonElement>(".close-dialog");


dialogs.forEach((dialog:HTMLDialogElement, index) => {
  const openButton = openButtons[index]
  const closeButton = closeButtons[index]

  if (openButton && dialog) {
  openButton.addEventListener("click", () => dialog.showModal());
  }

  if (closeButton && dialog) {
    closeButton.addEventListener("click", () => dialog.close());
  }
  
})
