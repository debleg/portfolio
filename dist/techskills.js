export function techSkillsShowcase() {
    const skillSection = document.getElementById("tech-skills");
    //the data is located in a json file
    let skills = [];
    /**
     * Fetches skills from json file
     * @returns array of skills
     */
    async function fetchSkills() {
        try {
            const response = await fetch(`./src/data/techskills.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            skills = data;
            return skills;
        }
        catch (error) {
            console.error("Skills could not be fetched:", error);
            return [];
        }
    }
    /**
     * Injects fetched skills into html
     */
    async function injectSkills() {
        try {
            const fetchedSkills = await fetchSkills();
            fetchedSkills.forEach((tech) => {
                const skillItem = document.createElement("div");
                skillItem.className = "tech-skill__item, neumorphism-raised";
                const skillLogo = document.createElement("div");
                skillLogo.className = "tech-skill__item--logo";
                skillLogo.innerHTML = tech.img;
                const skillName = document.createElement("p");
                skillName.className = "tech-skill__item--name";
                skillName.innerText = tech.name;
                skillItem.appendChild(skillLogo);
                skillItem.appendChild(skillName);
                skillSection?.appendChild(skillItem);
            });
        }
        catch (error) {
            console.error("GenerateSkills function error:", error);
        }
    }
    injectSkills();
}
//# sourceMappingURL=techskills.js.map