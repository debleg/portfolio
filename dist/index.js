import { themeHandling } from "./theme.js";
import { setupDialogListeners } from "./dialogsetup.js";
import { i18nSetup } from "./i18n.js";
import { techSkillsShowcase } from "./techskills.js";
import { projectsShowcase } from "./projects.js";
import { unfoldSection } from "./unfoldAnimation.js";
//only initialize the theme and i18n when the DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
    try {
        themeHandling();
        //the following lines allow the projects promise to be done before the loaded translations are applied to prevent text-less areas
        const { translatePage } = await i18nSetup();
        await projectsShowcase();
        unfoldSection();
        translatePage();
        setupDialogListeners();
    }
    catch (error) {
        console.error("Error in initialization:", error);
    }
});
techSkillsShowcase();
//# sourceMappingURL=index.js.map