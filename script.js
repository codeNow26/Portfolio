const glow = document.querySelector('.cursor-glow');

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
        }
    },
}

function getTranslation(lang, key) {
    return key.split('.').reduce((obj, i) => obj[i], translations[lang]);
}

function setLanguage(lang, key) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        el.innerHTML = getTranslation(lang, el.dataset.i18n);
    });

    localStorage.setItem("lang", lang);
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

function openProjectsOverlay() {
    const overlay = document.getElementById("portfolio-overlay");
    overlay.classList.add("show");

    const backdrop = document.querySelector(".overlay-backdrop");
    backdrop.classList.add("activeshow");
}

function closeProjectsOverlay() {
    const overlay = document.getElementById("portfolio-overlay");
    overlay.classList.remove("show");

    const backdrop = document.querySelector(".overlay-backdrop");
    backdrop.classList.remove("activeshow");
}