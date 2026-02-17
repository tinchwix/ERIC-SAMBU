// ============================================
// Navigation and Mobile Menu Logic
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("Navigation script loaded.");
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!mobileBtn || !mobileMenu) {
        console.warn("Mobile menu elements not found. Navigation logic disabled for this page.");
        return;
    }

    function toggleMenu() {
        console.log("Toggling mobile menu");
        mobileMenu.classList.toggle('translate-x-full');
        document.body.classList.toggle('overflow-hidden');
    }

    mobileBtn.addEventListener('click', toggleMenu);
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleMenu);
    } else {
        console.warn("Close menu button not found.");
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
});

