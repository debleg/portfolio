export function techSkillsShowcase() {
  const skillSection = document.getElementById(
    "tech-skills"
  ) as HTMLDivElement | null;

  interface Skill {
    img: string;
    name: string;
  }
  //the data is located in a json file
  let skills: Skill[] = [];

  /**
   * Fetches skills from json file
   * @returns array of skills
   */
  async function fetchSkills(): Promise<Skill[]> {
    try {
      const response = await fetch(`./src/data/techskills.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      skills = data as Skill[];

      return skills;
    } catch (error) {
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
        skillItem.className = "tech-skill__item neumorphism-raised";
        
        const skillLogo = document.createElement("img");
        skillLogo.className = "tech-skill__item--logo";
        skillLogo.src = tech.img;
        skillLogo.alt = `${tech.name} logo`
        skillLogo.setAttribute("loading", "lazy");

        const skillName = document.createElement("p");
        skillName.className = "tech-skill__item--name";
        skillName.innerText = tech.name;

        skillItem.appendChild(skillLogo);
        skillItem.appendChild(skillName);

        skillSection?.appendChild(skillItem);
      });
    } catch (error) {
      console.error("GenerateSkills function error:", error);
    }
  }

  injectSkills();
}
