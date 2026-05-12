
let currentProjectIndex = 0;
let currentSplideIndex = 0;

const projectOrder = ["join", "el_pollo_loco"];
const nextBtn = document.querySelector('.next');
document.getElementById("next-project").addEventListener("click", nextProject);

const projects = {
    join: {
        image: "./img/icons/Join Screenshot.png",
        github: "https://github.com/codeNow26/Join---Portfolio",
        live: "https://codenow26.github.io/Join---Portfolio/",
        tech: ["angularoverlay.png", "typescriptoverlay.png", "htmloverlay.png", "CSS.png", "firebaseoverlay.png"],
    },
    el_pollo_loco: {
        image: "./img/El Pollo Loco Screenshot 2.png",
        github: "https://github.com/codeNow26/El-Pollo-Loco",
        live: "https://codenow26.github.io/El-Pollo-Loco/",
        tech: ["htmloverlay.png", "CSS.png", "javascriptoverlay.png"],
    },
};

emailjs.init("mDZPlBNGP4szLcUBH");

const splide = new Splide('.splide', {
    type: 'loop',
    arrows: false,
    pagination: false,
    focus: 'center',
    perPage: 1,
    start: 0,
    trimSpace: false,
    gap: 30,
    breakpoints: {
        800: {
            fixedWidth: '300px',
            start: 0,
        }
    }
});

splide.mount();

nextBtn.addEventListener('click', () => {
    splide.go('>');
    updateDots();
});

/** Animates cursor glow */
function animate() {
    currentX += (mouseX - currentX) * 0.7;
    currentY += (mouseY - currentY) * 0.7;

    glow.style.left = currentX + 'px';
    glow.style.top = currentY + 'px';

    requestAnimationFrame(animate);
}

/**
 * Opens project overlay (new version)
 * @param {string} project
 */
function openProjectsOverlay(project) {
    setCurrentProject(project);
    showOverlay();
    renderProject(project);
}

/**
 * Sets current project index
 * @param {string} project
 */
function setCurrentProject(project) {
    currentProjectIndex = projectOrder.indexOf(project);
    if (currentProjectIndex === -1) currentProjectIndex = 0;
}

/** Shows project overlay */
function showOverlay() {
    document.getElementById("portfolio-overlay").classList.add("show");
    document.querySelector(".overlay-backdrop").classList.add("activeshow");
}

/** Closes project overlay */
function closeProjectsOverlay() {
    document.getElementById("portfolio-overlay").classList.remove("show");
    document.querySelector(".overlay-backdrop").classList.remove("activeshow");
}

/**
 * Renders project
 * @param {string} project
 */
function renderProject(project) {
    const lang = currentLanguage || "en";
    const projectData = translations[lang].portfolio.projects[project];
    const projectInfo = projects[project];

    if (!projectData || !projectInfo) return;

    updateText(projectData, project);
    updateLinks(projectInfo);
    updateTech(projectInfo.tech);
}

/**
 * Updates text
 * @param {object} data
 * @param {string} project
 */
function updateText(data, project) {
    document.querySelector("#overlay-title").textContent =
        data.title || formatProjectName(project);

    document.querySelector("#overlay-about").textContent =
        getTranslation(currentLanguage, "portfolio.projects.about");

    document.querySelector("#overlay-number").textContent =
        data.number || "";

    document.querySelector("#overlay-description").textContent =
        data.description || "";
}

/**
 * Updates links
 * @param {object} info
 */
function updateLinks(info) {
    document.querySelector("#overlay-screenshot").src = info.image || "";
    document.querySelector("#overlay-github").href = info.github || "#";
    document.querySelector("#overlay-live").href = info.live || "#";
}

/**
 * Updates tech icons
 * @param {string[]} techArray
 */
function updateTech(techArray = []) {
    const container = document.querySelector("#overlay-tech");
    container.innerHTML = "";

    techArray.forEach(icon => {
        container.innerHTML += `
            <img class="tech-icon" src="./img/icons/${icon}">
        `;
    });
}

/** Shows next project in carousel */
function nextProject() {
    currentProjectIndex++;

    if (currentProjectIndex >= projectOrder.length) {
        currentProjectIndex = 0;
    }

    renderProject(projectOrder[currentProjectIndex]);
}

/**
 * Formats project name
 * @param {string} name
 * @returns {string}
 */
function formatProjectName(name) {
    return name
        .replaceAll("_", " ")
        .replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * Updates the active state of the slider dots.
 */
function updateDots() {
    const dots = document.querySelectorAll(".dot");
    const currentSplideIndex = splide.index;
    dots.forEach((dot, index) => {
        if (index === currentSplideIndex) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

/** Adds click navigation to the slider dots */
function setupDotNavigation() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            splide.go(index);
            updateDots();
        });
    });
}

/**
 * Initializes slider dot navigation
 */
setupDotNavigation();

/**
 * Updates legal notice link based on selected language
 * @param {string} lang
 */
function updateLegalNoticeLink(lang) {
    if (lang === "de") {
        legalNoticeLink.href = "./legal-notice-de.html";
        legalNoticeLink.textContent = "Impressum";
    } else {
        legalNoticeLink.href = "./legal-notice.html";
        legalNoticeLink.textContent = "Legal Notice";
    }
}