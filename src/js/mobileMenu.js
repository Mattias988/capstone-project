import { mainHeader, menuToggle } from './domElements.js';

function initializeMobileMenu() {
    if (menuToggle && mainHeader) {
        menuToggle.addEventListener('click', () => {
            mainHeader.classList.toggle('nav-active');
        });
    } else {
        console.warn("Mobile menu elements not found, menu toggle disabled.");
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMobileMenu);
} else {
    initializeMobileMenu();
}

export { initializeMobileMenu };