import { themeHandling } from "./theme.js";
import { setupDialogListeners } from "./dialogsetup.js";
import { i18nSetup } from "./i18n.js";
import { techSkillsShowcase } from "./techskills.js";
import { projectsShowcase } from "./projects.js";
//only initialize the theme and i18n when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    themeHandling();
    projectsShowcase();
    setupDialogListeners();
    i18nSetup();
});
techSkillsShowcase();
//# sourceMappingURL=index.js.map