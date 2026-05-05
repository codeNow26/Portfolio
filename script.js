const glow = document.querySelector('.cursor-glow');
let currentLanguage = localStorage.getItem("lang") || "en";

emailjs.init("mDZPlBNGP4szLcUBH");

window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

/** Animates cursor glow */
function animate() {
    currentX += (mouseX - currentX) * 0.7;
    currentY += (mouseY - currentY) * 0.7;

    glow.style.left = currentX + 'px';
    glow.style.top = currentY + 'px';

    requestAnimationFrame(animate);
}

animate();

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
    bubble: {
        image: "./img/bubble.png"
    }
};

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

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

nextBtn.addEventListener('click', () => {
    splide.go('>');
});

prevBtn.addEventListener('click', () => {
    splide.go('<');
});

document.querySelectorAll(".contact-input").forEach(input => {
    setupValidation(input);
});

/**
 * Sets up validation for input
 * @param {HTMLInputElement} input
 */
function setupValidation(input) {
    const container = input.closest(".contact-field");
    const error = container.querySelector(".error-message");
    let touched = false;

    input.addEventListener("focus", () => {
        touched = true;
    });

    input.addEventListener("blur", () => {
        if (touched) validate();
    });

    input.addEventListener("input", validate);

    function validate() {
        const value = input.value.trim();

        let isValid = value.length > 0;

        if (input.type === "email") {
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

        if (isValid) {
            input.classList.add("valid");
            input.classList.remove("invalid");
        } else {
            input.classList.remove("valid");
            input.classList.add("invalid");
        }

        if (!value && touched) {
            container.classList.add("submit");
            error?.classList.add("opacity-1");
            input.placeholder = "";
        } else {
            container.classList.remove("submit");
            error?.classList.remove("opacity-1");
        }
        validateForm();

        return isValid;
    }
}

function validateForm() {
    const inputs = document.querySelectorAll(".contact-input");
    button = document.getElementById("contact-submit");
    let formValid = true;

    inputs.forEach(input => {
        if (!input.classList.contains("valid")) {
            formValid = false;
        }
    });

    button.disabled = !formValid;
}

//Weitermachen hier, button braucht feedback wann er enabled oder disabled ist

const projectOrder = ["join", "el_pollo_loco", "bubble"];
let currentProjectIndex = 0;

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

/** Shows overlay */
function showOverlay() {
    document.getElementById("portfolio-overlay").classList.add("show");
    document.querySelector(".overlay-backdrop").classList.add("activeshow");
}

/** Closes overlay */
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
        data.about || "What is this project about?";

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

document.getElementById("next-project").addEventListener("click", nextProject);

/** Goes to next project */
function nextProject() {
    currentProjectIndex++;

    if (currentProjectIndex >= projectOrder.length) {
        currentProjectIndex = 0;
    }

    renderProject(projectOrder[currentProjectIndex]);
}

/** Goes to previous project */
function prevProject() {
    currentProjectIndex--;

    if (currentProjectIndex < 0) {
        currentProjectIndex = projectOrder.length - 1;
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

const overlay = document.querySelector(".mobile-overlay-container");
const menuIcon = document.getElementById("mobile-menu-icon");

menuIcon.addEventListener("click", menuToggle);

/** Toggles mobile menu */
function menuToggle() {
    overlay.classList.toggle("show");
}

overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
        overlay.classList.remove("show");
    }
});

const navLeft = document.getElementById("nav-left");
const mobileOverlay = document.getElementById("mobile-overlay");
const navbarContainer = document.querySelector(".navbar-container");

/** Handles nav repositioning */
function handleNavPosition() {
    if (window.innerWidth <= 800) {
        mobileOverlay.appendChild(navLeft);
    } else {
        navbarContainer.insertBefore(navLeft, navbarContainer.querySelector(".logo"));
    }
}

window.addEventListener("resize", handleNavPosition);
window.addEventListener("load", handleNavPosition);

/**
 * Sends email via EmailJS
 * @param {Event} event
 */
function sendMail(event) {
    event.preventDefault();
    const checkbox = document.getElementById("privacy-check");
    const statusSuccess = document.getElementById("form-status");
    const statusError = document.getElementById("privacy-error");
    const btn = document.querySelector('button[type="submit"]');
    statusSuccess.classList.remove("active");
    statusError.classList.remove("active");

    if (!checkbox.checked) {
        statusError.innerText = "Please accept the privacy policy";
        statusError.style.color = "#EC7B7B";
        statusError.classList.add("active");
        return;
    }

    const name = document.querySelector('[name="name"]').value;
    const email = document.querySelector('[name="email"]').value;
    const message = document.querySelector('[name="message"]').value;

    btn.disabled = true;
    btn.innerText = "Sending...";

    emailjs.send("service_a5hs47c", "template_6s3rwh8", {
        name: name,
        email: email,
        message: message
    })
        .then(() => {
            statusSuccess.innerText = "Message sent successfully";
            statusSuccess.style.color = "#3DCFB6";
            statusSuccess.classList.add("active");

            document.querySelector("form").reset();

            btn.disabled = false;
            btn.innerText = "Say Hello ;)";
        })
        .catch((error) => {
            console.error(error);

            statusError.innerText = "Something went wrong. Try again.";
            statusError.style.color = "#EC7B7B";
            statusError.classList.add("active");

            btn.disabled = false;
            btn.innerText = "Try again";
        });
}