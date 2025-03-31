document.addEventListener('DOMContentLoaded', function() {

    // Obsługa zakładek wyszukiwania
    const tabs = document.querySelectorAll('.search-tabs .tab-item');
    const searchInput = document.querySelector('.search-input'); // Przykład, jeśli chcesz coś zmieniać

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 1. Usuń klasę 'active' ze wszystkich zakładek
            tabs.forEach(t => t.classList.remove('active'));

            // 2. Dodaj klasę 'active' do klikniętej zakładki
            this.classList.add('active');

            // 3. (Opcjonalnie) Zrób coś w zależności od wybranej zakładki
            const selectedTab = this.getAttribute('data-tab');
            console.log('Wybrano zakładkę:', selectedTab);

            // Przykład: zmiana placeholdera
            if (selectedTab === 'for-rent') {
                searchInput.placeholder = "Enter location for rent...";
            } else {
                searchInput.placeholder = "Enter an address, neighborhood, city, or ZIP code";
            }
            // Tutaj można by dodać logikę np. zmiany parametrów wysyłanych przez formularz
        });
    });

    // (Opcjonalnie) Obsługa Hamburger Menu - wymaga HTML dla menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.main-navigation'); // Załóżmy, że masz <nav class="main-navigation"> gdzieś

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('is-open'); // Dodaj/Usuń klasę CSS, która pokazuje/ukrywa menu
            // Możesz też zmienić ikonę hamburgera na 'X'
        });
    }

});