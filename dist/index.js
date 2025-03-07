import { themeHandling } from "./theme.js";
import { setupDialogListeners } from "./dialogsetup.js";
import { i18nSetup } from "./i18n.js";
import { techSkillsShowcase } from "./techskills.js";
import { projectsShowcase } from "./projects.js";
import { unfoldSection } from "./unfoldAnimation.js";
//some functions need to wait for the full Dom content to be loaded to work properly, made async to handle promises
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
//back to top logic, no need for a file of its own at this level of complexity
//button is hard-coded in html and styled with classes
const scrollToTop = document.getElementById("scrollToTop");
scrollToTop.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};
//# sourceMappingURL=index.js.map