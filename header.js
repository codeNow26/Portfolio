let currentLanguage = localStorage.getItem("lang") || "en";
const overlay = document.querySelector(".mobile-overlay-container");
const menuIcon = document.getElementById("mobile-menu-icon");
const navLeft = document.getElementById("nav-left");
const mobileOverlay = document.getElementById("mobile-overlay");
const navbarContainer = document.querySelector(".navbar-container");
const legalNoticeLink = document.getElementById("legal-notice-link");
const glow = document.querySelector('.cursor-glow');

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

window.addEventListener("resize", handleNavPosition);
window.addEventListener("load", handleNavPosition);

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
        overlay.classList.remove("show");
    }
});

menuIcon.addEventListener("click", menuToggle);

animate();

/** Animates cursor glow continuously */
function animate() {
    currentX += (mouseX - currentX) * 0.7;
    currentY += (mouseY - currentY) * 0.7;

    glow.style.left = currentX + 'px';
    glow.style.top = currentY + 'px';

    requestAnimationFrame(animate);
}


/** Toggles mobile menu overlay */
function menuToggle() {
    overlay.classList.toggle("show");
}

/** Repositions navigation for responsive layout */
function handleNavPosition() {
    if (!mobileOverlay || !navLeft || !navbarContainer) return;

    if (window.innerWidth <= 800) {
        mobileOverlay.appendChild(navLeft);
    } else {
        navbarContainer.insertBefore(
            navLeft,
            navbarContainer.querySelector(".logo")
        );
    }
}