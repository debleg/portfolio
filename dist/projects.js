//from a json file once set up properly
//remember issue with i18n, need a way to take nesting into account if needed
export function projectsShowcase() {
    console.log("my projects!");
    const projectDiv = document.getElementById("project-showcase");
    const projects = [
        {
            name: "ohmyfood",
            blurb: "oh-blurb",
            tech: "Sass",
            img: "INSERTIMG",
            description: "oh-desc",
            repo: "https://github.com/debleg/OC-P4-Ohmyfood",
            website: "https://debleg.github.io/OC-P4-Ohmyfood/",
        },
        {
            name: "Nina Carducci",
            blurb: "nina-blurb",
            img: "INSERTIMG",
            description: "nina-desc",
            repo: "https://github.com/debleg/OC-P8-Nina-Carducci",
            website: "https://debleg.github.io/OC-P8-Nina-Carducci/",
        },
    ];
    const techLogos = {
        sass: "./src/logos/sass.svg",
    };
    function injectProjects() {
        projects.forEach((project) => {
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
    injectProjects();
}
//# sourceMappingURL=projects.js.map