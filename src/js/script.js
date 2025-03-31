document.addEventListener('DOMContentLoaded', function() {

    const tabs = document.querySelectorAll('.search-tabs .tab-item');
    const searchInput = document.querySelector('.search-input');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));

            this.classList.add('active');

            const selectedTab = this.getAttribute('data-tab');
            console.log('Wybrano zakładkę:', selectedTab);

            if (selectedTab === 'for-rent') {
                searchInput.placeholder = "Enter location for rent...";
            } else {
                searchInput.placeholder = "Enter an address, neighborhood, city, or ZIP code";
            }
        });
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.main-navigation');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('is-open');
        });
    }

});