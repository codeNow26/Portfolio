const glow = document.querySelector('.cursor-glow');
let currentLanguage = localStorage.getItem("lang") || "en";

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

function animate() {
    currentX += (mouseX - currentX) * 0.7;
    currentY += (mouseY - currentY) * 0.7;

    glow.style.left = currentX + 'px';
    glow.style.top = currentY + 'px';

    requestAnimationFrame(animate);
}

animate();


const translations = {
    en: {
        nav: {
            about: "About me",
            skills: "Skills",
            projects: "Projects"
        },
        hero: {
            role: "Frontend Developer",
            work: "Check my work",
            contact: "Contact me",
            ticker_remote: "Available for remote work",
            ticker_frontend: "Frontend Developer",
            ticker_town: "based in Hoyerswerda",
            ticker_work: "Open to work",
        },
        about: {
            header: "Who I Am",
            title: "About me",
            description: "Hey there, I'm Philipp! I got into coding because I wanted to build things myself instead of just consuming them. I enjoy turning ideas into clean, functional interfaces and am always eager to learn new technologies and improve my skills.",
            remote: "I’m open to remote, hybrid, or on-site work - whatever fits best for the project and the team.",
            skills: "I enjoy learning new technologies and constantly improving my skills. I’m always open to new ideas, tools, and better ways of doing things.",
            solutions: "I like to break problems down and find simple, efficient solutions. I stay persistent, think creatively, and focus on building clean and maintainable code.",
        },
        technologies: {
            header: "Technologies",
            skillset: "Skill set",
            description: "I build things that actually work. Clean, structured, without unnecessary complexity.",
            skill_text: "You need <span class=\"skill-span\">another skill?</span>",
            contact: "Feel free to contact me. I look forward to <br> expanding on my previous knowledge",
            button: "Let's Talk",
        },
        portfolio: {
            title: "Featured Projects",
            description: "Explore a selection of my work here - interact with <br>projects to see my skills in action",
            about: "what is this project about?",
            projects: {
                join: {
                    description: "Task manager inspired by the Kanban system. Create and organize tasks using drag and drop functions, assign users and categories",
                    number: "01"
                },
                el_pollo_loco: {
                    description: "Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight agains the crazy hen",
                    number: "02"
                }
            }
        },
        feedback: {
            title: "What my colleagues say about me",
        },
        contact: {
            contact_me: "Contact me",
            title: "Let's work<br>together",
            problem: "Got a problem to solve?",
            description: "I’m always open to new opportunities and collaborations, so feel free to reach out. I’m particularly interested in roles where I can combine clean, structured code with thoughtful design to create real value for users.<br><br>Need a Frontend developer? <span class=\"contact-description-span\">Let's talk!</span>",
            name: "What's your name?",
            name_placeholder: "your name goes here",
            email: "What's your email?",
            email_placeholder: "youremail@email.com",
            help: "How can I help you?",
            help_placeholder: "Hello Lukas, i am interested in...",
            privacy_policy: "I've read the <span>privacy policy</span> and agree to the processing of my data as outlined",
            button: "Say Hello ;)",
        }

    },
    de: {
        nav: {
            about: "Über mich",
            skills: "Skills",
            projects: "Projekte"
        },
        hero: {
            role: "Frontend Entwickler",
            work: "meine Projekte",
            contact: "Kontakt",
            ticker_remote: "verfügbar für Remote-Arbeit",
            ticker_frontend: "Frontend Entwickler",
            ticker_town: "Ansässig in Hoyerswerda",
            ticker_work: "Offen für neue Projekte",
        },
        about: {
            header: "Wer ich bin",
            title: "Über mich",
            description: "Hallo, ich bin Philipp! Ich habe mit dem Programmieren angefangen, weil ich Dinge selbst bauen wollte, anstatt sie nur zu konsumieren. Ich genieße es, Ideen in saubere, funktionale Schnittstellen umzusetzen und bin immer bestrebt, neue Technologien zu lernen und meine Fähigkeiten zu verbessern.",
            remote: "Ich bin offen für Remote-, Hybrid- oder On-Site-Arbeit - je nachdem, was am besten für das Projekt und das Team passt.",
            skills: "Ich genieße es, neue Technologien zu lernen und meine Fähigkeiten ständig zu verbessern. Ich bin immer offen für neue Ideen, Tools und bessere Möglichkeiten, Dinge zu tun.",
            solutions: "Ich mag es, Probleme zu zerlegen und einfache, effiziente Lösungen zu finden. Ich bleibe hartnäckig, denke kreativ und konzentriere mich darauf, sauberen und wartbaren Code zu schreiben.",
        },
        technologies: {
            header: "Technologien",
            skillset: "Fähigkeiten",
            description: "Ich baue Dinge, die tatsächlich funktionieren. Sauber, strukturiert, ohne unnötige Komplexität.",
            skill_text: "Du suchst <span class=\"skill-span\">eine bestimmte Fähigkeit?</span>",
            contact: "Zögere nicht, mich zu kontaktieren. Ich freue mich darauf, mein bisheriges Wissen zu erweitern",
            button: "Lass uns reden",
        },
        portfolio: {
            title: "Ausgewählte Projekte",
            description: "Entdecke eine Auswahl meiner Arbeiten hier - interagiere mit <br>Projekten, um meine Fähigkeiten in Aktion zu sehen",
            projects: {
                about: "Worum geht es bei diesem Projekt?",
                join: {
                    description: "Task-Manager inspiriert vom Kanban-System. Erstelle und organisiere Aufgaben mit Drag-and-Drop-Funktionen, weise Benutzer und Kategorien zu",
                    number: "01"
                },
                el_pollo_loco: {
                    description: "Sprung-, Lauf- und Wurfspiel basierend auf einem objektorientierten Ansatz. Hilf Pepe, Münzen und Tabasco-Salsa zu finden, um gegen das verrückte Huhn zu kämpfen",
                    number: "02"
                }
            }
        },
        feedback: {
            title: "Was meine Kollegen über mich sagen",
        },
        contact: {
            contact_me: "Kontaktiere mich",
            title: "Lass uns<br>zusammen arbeiten",
            problem: "Gibt es ein Problem zu lösen?",
            description: "Ich bin immer offen für neue Möglichkeiten und Kooperationen, also zögere nicht, dich zu melden. Ich bin besonders an Rollen interessiert, in denen ich sauberen, strukturierten Code mit durchdachtem Design kombinieren kann, um echten Mehrwert für Benutzer zu schaffen.<br><br>Du brauchst einen Frontend-Entwickler? <span class=\"contact-description-span\">Lass uns reden!</span>",
            name: "Wie ist dein Name?",
            name_placeholder: "Dein Name hier",
            email: "Wie ist deine E-Mail?",
            email_placeholder: "youremail@email.com",
            help: "Wie kann ich dir helfen?",
            help_placeholder: "Hallo Lukas, ich interessiere mich für...",
            privacy_policy: "Ich habe die <span>Datenschutzrichtlinie</span> gelesen und stimme der Verarbeitung meiner Daten wie beschrieben zu",
            button: "Sag Hallo ;)",
        }
    },
}

function getTranslation(lang, key) {
    return key.split('.').reduce((obj, i) => obj[i], translations[lang]);
}

function setLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        el.innerHTML = getTranslation(lang, el.dataset.i18n);
    });

    localStorage.setItem("lang", lang);
    currentLanguage = lang;
    switchLanguageButton(lang);
}

window.onload = () => {
    const lang = localStorage.getItem("lang") || "en";
    setLanguage(lang);
};


document.getElementById("english").onclick = () => setLanguage("en");
document.getElementById("german").onclick = () => setLanguage("de");

function switchLanguageButton(lang) {
    document.getElementById("english").classList.toggle("active-lang", lang === "en");
    document.getElementById("german").classList.toggle("active-lang", lang === "de");
}

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

function openProjectsOverlay(project) {
    const overlay = document.getElementById("portfolio-overlay");
    const backdrop = document.querySelector(".overlay-backdrop");

    overlay.classList.add("show");
    backdrop.classList.add("activeshow");

    const lang = currentLanguage || "en";
    const projectData = translations[lang].portfolio.projects[project];
    const projectInfo = projects[project];

    if (!projectData || !projectInfo) return;


    document.querySelector("#overlay-title").textContent =
        projectData.title || formatProjectName(project);

    document.querySelector("#overlay-about").textContent =
        projectData.about;

    document.querySelector("#overlay-number").textContent =
        projectData.number;

    document.querySelector("#overlay-description").textContent =
        projectData.description;

    document.querySelector("#overlay-screenshot").src =
        projectInfo.image;

    document.querySelector("#overlay-github").href =
        projectInfo.github;

    document.querySelector("#overlay-live").href =
        projectInfo.live;

    const techContainer = document.querySelector("#overlay-tech");
    techContainer.innerHTML = "";

    projectInfo.tech.forEach(icon => {
        techContainer.innerHTML += `
            <img class="tech-icon" src="./img/icons/${icon}">
        `;
    });
}

function formatProjectName(name) {
    return name
        .replaceAll("_", " ")
        .replace(/\b\w/g, char => char.toUpperCase());
}

function closeProjectsOverlay() {
    const overlay = document.getElementById("portfolio-overlay");
    overlay.classList.remove("show");

    const backdrop = document.querySelector(".overlay-backdrop");
    backdrop.classList.remove("activeshow");
}


const splide = new Splide('.splide', {
    type: 'loop',
    arrows: false,
    pagination: false,
    focus: 'center',
    fixedWidth: '900px',
    start: 1,
    trimSpace: false,
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

        if (!value) {
            container.classList.add("submit");
            error?.classList.add("opacity-1");
            input.placeholder = "";
            return false;
        } else {
            container.classList.remove("submit");
            error?.classList.remove("opacity-1");
            return true;
        }
    }
}

const overlay = document.querySelector(".mobile-overlay-container");
const menuIcon = document.getElementById("mobile-menu-icon");

function menuToggle() {
    overlay.classList.toggle("show");
}

menuIcon.addEventListener("click", menuToggle);

overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
        overlay.classList.remove("show");
    }
});