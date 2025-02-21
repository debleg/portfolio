export function projectsShowcase() {
    console.log("my projects!");
    const projectDiv = document.getElementById("project-showcase");
    let projects = [];
    const techLogos = {
        sass: "./src/logos/sass.svg",
    };
    /**
     * Fetches projects from json file
     * @returns array of projets
     */
    async function fetchProjects() {
        try {
            const response = await fetch(`./src/data/projects.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            projects = data;
            return projects;
        }
        catch (error) {
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
                projectItem.appendChild(projectName);
                const projectBlurb = document.createElement("p");
                projectItem.appendChild(projectBlurb);
                //the tech is optional, maps through the logo list
                if (project.tech) {
                    const projectTech = document.createElement("img");
                    projectItem.appendChild(projectTech);
                }
                //the open button is in the main div
                const openButton = document.createElement("button");
                projectItem.appendChild(openButton);
                //the dialog is in the main div and every other element inside it
                const modal = document.createElement("dialog");
                projectItem.appendChild(modal);
                const closeButton = document.createElement("button");
                modal.appendChild(closeButton);
                const projectCover = document.createElement("img");
                modal.appendChild(projectCover);
                const projectDesc = document.createElement("div");
                modal.appendChild(projectDesc);
                const projectRepo = document.createElement("a");
                modal.appendChild(projectRepo);
                //the project website is optional, not all projects are deployed
                if (project.website) {
                    const projectSite = document.createElement("a");
                    modal.appendChild(projectSite);
                }
                projectDiv?.appendChild(projectItem);
            });
        }
        catch (error) {
            console.error("InjectProjects function error:", error);
        }
    }
    injectProjects();
}
//# sourceMappingURL=projects.js.map