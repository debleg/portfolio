export function projectsShowcase() {
  console.log("my projects!");
  const projectDiv = document.getElementById(
    "project-showcase"
  ) as HTMLDivElement | null;

  interface Project {
    name: string; //i18n attribute
    blurb: string; //i18n attribute
    tech?: string; //tech logos, maybe different aspect
    img: string;
    description: string; //i18n attribute
    repo: string;
    website?: string;
  }

  let projects: Project[] = [];

  const techLogos: object = {
    sass: "./src/logos/sass.svg",
  };

  /**
   * Fetches projects from json file
   * @returns array of projets
   */
  async function fetchProjects(): Promise<Project[]> {
    try {
      const response = await fetch(`./src/data/projects.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      projects = data as Project[];

      return projects;
    } catch (error) {
      console.error("Skills could not be fetched:", error);
      return [];
    }
  }

  /**
   * Injects fetched projects into dedicated html section
   */
  async function injectProjects() {
    try {
        const fetchedProjects = await fetchProjects();

      fetchedProjects.forEach((project) => {
        //creating the encapsulating div
        const projectItem = document.createElement("div");
        projectItem.className = "project neumorphism-raised";

        //creating the name and blurb
        const projectName = document.createElement("h3");
        projectName.className = "project__title"
        projectItem.appendChild(projectName);

        const projectBlurb = document.createElement("p");
        projectBlurb.className = "project__blurb"
        projectItem.appendChild(projectBlurb);

        //the tech is optional, maps through the logo list
        if (project.tech) {
          const projectTech = document.createElement("img");
          projectTech.className = "project__tech"
          projectItem.appendChild(projectTech);
        }

        //the open button is in the main div
        const openButton = document.createElement("button");
        openButton.className = "project__button open-dialog"
        projectItem.appendChild(openButton);

        //the dialog is in the main div and every other element inside it
        const modal = document.createElement("dialog");
        modal.className = "dialog project-dialog"
        projectItem.appendChild(modal);

        const closeButton = document.createElement("button");
        closeButton.className = "project__close close-dialog"
        modal.appendChild(closeButton);

        const projectCover = document.createElement("img");
        projectCover.className = "project__cover"
        modal.appendChild(projectCover);
        const projectDesc = document.createElement("div");
        projectDesc.className = "project__desc"
        modal.appendChild(projectDesc);
        const projectRepo = document.createElement("a");
        projectRepo.className = "project__link--repo"
        modal.appendChild(projectRepo);
        //the project website is optional, not all projects are deployed
        if (project.website) {
          const projectSite = document.createElement("a");
          projectSite.className = "project__link--website"
          modal.appendChild(projectSite);
        }

        projectDiv?.appendChild(projectItem);
      });
    } catch (error) {
      console.error("InjectProjects function error:", error);
    }
  }

  injectProjects();
}
