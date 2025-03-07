export function projectsShowcase():Promise<void> {
  return new Promise<void>((resolve, reject) => { //add promise, allows for functions to be chained in index so translation + modal listeners are triggered only once everything exists!
    const projectDiv = document.getElementById(
      "project-showcase"
    ) as HTMLDivElement | null;
    const modalDiv = document.getElementById(
      "modal-container"
    ) as HTMLDivElement | null;

    interface Project {
      id: string; //to differenciate projects and help dialog interaction
      name: string; //i18n attribute
      blurb: string; //i18n attribute
      tech?: string[]; //tech logos, maybe different aspect
      img: string;
      description: string; //i18n attribute
      repo: string;
      website?: string;
    }

    interface TechLogos {
      [key: string]: string;
    }

    let projects: Project[] = [];

    const techLogos: TechLogos = {
      html: "./src/logos/html5.svg",
      css: "./src/logos/css.svg",
      sass: "./src/logos/sass.svg",
      javascript: "./src/logos/javascript.svg",
      typescript: "./src/logos/typescript.svg",
      react: "./src/logos/react_dark.svg",
      lighthouse: "./src/logos/lighthouse.svg",
      figma: "./src/logos/figma.svg",
      git: "./src/logos/git.svg",
      sql: "./src/logos/sql.svg",
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
          projectItem.className = "project neumorphism-raised unfold";

          const projectName = document.createElement("h3");
          projectName.className = "project__title";
          projectName.innerText = project.name;
          projectItem.appendChild(projectName);

          const projectBlurb = document.createElement("p");
          projectBlurb.className = "project__blurb";
          projectBlurb.setAttribute("data-i18n-key", project.blurb);
          projectItem.appendChild(projectBlurb);

          //the tech is optional, loop through the logo list to find relevant ones
          if (project.tech) {
            const projectTechsContainer = document.createElement("div");
            projectTechsContainer.className = "project__techs neumorphism-base";
            project.tech.forEach((techLogo) => {
              //wrap logos in a div, even if there's only one, for styling purposes
              const projectTechs = document.createElement("div");
              projectTechs.className = "project__tech";
              const projectTech = document.createElement("img");
              projectTech.src = techLogos[techLogo];
              projectTech.alt = `Logo ${techLogo}`;

              projectTech.className = "project__tech--img";
              projectTechs.appendChild(projectTech);
              projectTechsContainer.appendChild(projectTech);
            });
            projectItem.appendChild(projectTechsContainer);
          }

          //the open button is in the main div
          const openButton = document.createElement("button");
          openButton.classList.add(
            "open-dialog",
            "project__button",
            "neumorphism-raised"
          );
          openButton.setAttribute(
            "data-dialog-target",
            `project-dialog-${project.id}`
          );
          openButton.setAttribute("data-i18n-key", "discover");
          projectItem.appendChild(openButton);

          //the dialog is in the main div and every other element inside it
          const modal = document.createElement("dialog");
          modal.id = `project-dialog-${project.id}`;
          modal.className = "dialog project-dialog";

          if (modalDiv) {
            //modal created in specific div at the bottom of the body before the scripts outside the complex nesting to handle it more easily + styling
            modalDiv.appendChild(modal);
          }

          //container for the modal content for styling purposes
          const modalInnerContainer = document.createElement("div");
          modalInnerContainer.className = "project__modal";

          const closeButton = document.createElement("button");
          closeButton.classList.add(
            "close-dialog",
            "project__close",
            "neumorphism-base"
          );
          closeButton.setAttribute(
            "data-dialog-id",
            `project-dialog-${project.id}`
          );
          closeButton.setAttribute("aria-label", "Close Project");
          const closeButtonIcon = document.createElement("i");
          closeButtonIcon.setAttribute("data-lucide", "x");
          closeButtonIcon.setAttribute("aria-hidden", "true");
          closeButton.appendChild(closeButtonIcon);
          modalInnerContainer.appendChild(closeButton);

          const projectCover = document.createElement("img");
          projectCover.className = "project__cover";
          projectCover.src = project.img;
          projectCover.alt = `website ${project.name}`;
          modalInnerContainer.appendChild(projectCover);

          //the description is i18n: fields must exist in lang data!
          const projectDesc = document.createElement("div");
          projectDesc.className = "project__desc";
          projectDesc.setAttribute("data-i18n-key", project.description);
          modalInnerContainer.appendChild(projectDesc);

          //link container
          const projectLinks = document.createElement("div");
          projectLinks.className = "project__links";

          //setting up the repo link with lucide icon
          const projectRepo = document.createElement("a");
          projectRepo.href = project.repo;
          projectRepo.target = "_blank";
          projectRepo.setAttribute("aria-label", "Github Code");
          const projectRepoIcon = document.createElement("i");
          projectRepoIcon.setAttribute("data-lucide", "github");
          projectRepoIcon.setAttribute("aria-hidden", "true");
          projectRepo.appendChild(projectRepoIcon);
          projectLinks.appendChild(projectRepo);

          //the project website is optional, not all projects are deployed, lucide icon used
          if (project.website) {
            const projectSite = document.createElement("a");
            projectSite.href = project.website;
            projectSite.target = "_blank";
            projectSite.setAttribute("aria-label", "website");
            const projectSiteIcon = document.createElement("i");
            projectSiteIcon.setAttribute("data-lucide", "link");
            projectSiteIcon.setAttribute("aria-hidden", "true");
            projectSite.appendChild(projectSiteIcon);
            projectLinks.appendChild(projectSite);
          }
          modalInnerContainer.appendChild(projectLinks);
          modal.appendChild(modalInnerContainer);

          projectDiv?.appendChild(projectItem);
          lucide.createIcons(); //called here or else the icons in the modals don't show
          resolve(); //the promise!
        });
      } catch (error) {
        console.error("InjectProjects function error:", error);
        reject(error); //rejects promise in case of an error
      }
    }
    injectProjects();
  });
}
