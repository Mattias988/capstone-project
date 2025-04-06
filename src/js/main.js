import {
    propertiesGrid, filterTabs, goToTopButton, paginationControlsContainer,
    searchForm, searchInput, advancedButton, advancedFiltersContainer,
    minSqftInput, maxSqftInput, minBedsInput, minBathsInput,
    clearAdvancedButton, checkElementsExist, sortSelect, cardTemplate,
    mainHeader, menuToggle
} from './domElements.js';
import { fetchProperties } from './api.js';
import { renderProperties, appendProperties } from './cardRenderer.js';
import {
    filterByStatus, filterBySearch, filterBySqft, filterByBeds, filterByBaths
} from './filterUtils.js';
import { initializeMobileMenu } from './mobileMenu.js';

document.addEventListener('DOMContentLoaded', async () => {

    if (!checkElementsExist()) {
        console.error("Aborting: One or more required page elements are missing.");
        if (propertiesGrid) { propertiesGrid.innerHTML = '<p style="color: red; text-align: center;">Error: Required page elements missing.</p>'; }
        return;
    }

    let allFetchedProperties = [];
    let activeDataSet = [];
    let displayedProperties = [];
    const itemsPerPage = 12;
    let currentPage = 1;
    let debounceTimer;

    try {
        allFetchedProperties = await fetchProperties();
        activeDataSet = allFetchedProperties;
        updateDisplayedProperties();
        initializeMobileMenu();
        setupEventListeners();

    } catch (error) {
        if (propertiesGrid) {
            propertiesGrid.innerHTML = '<p class="no-results-message" style="color: red;">Error loading properties. Please try again later.</p>';
        }
    }

    function setupEventListeners() {
        filterTabs.forEach(tab => tab.addEventListener('click', handleFilterChange));
        searchForm.addEventListener('submit', handleSearchSubmit);
        goToTopButton.addEventListener('click', () => scrollToGridTop(false));
        advancedButton.addEventListener('click', toggleAdvancedFilters);

        const advancedInputs = [minSqftInput, maxSqftInput, minBedsInput, minBathsInput];
        advancedInputs.forEach(input => {
            input.addEventListener('input', handleDebouncedInput);
        });

        searchInput.addEventListener('input', handleDebouncedInput);

        clearAdvancedButton.addEventListener('click', () => {
            minSqftInput.value = '';
            maxSqftInput.value = '';
            minBedsInput.value = '';
            minBathsInput.value = '';
            performSearchAndFilter();
        });

        if(sortSelect) {
            sortSelect.addEventListener('change', performSearchAndFilter);
        }
    }

    function handleDebouncedInput() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(performSearchAndFilter, 300);
    }

    function updateDisplayedProperties() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        displayedProperties = activeDataSet.slice(startIndex, endIndex);
        renderProperties(displayedProperties, propertiesGrid);
        renderPaginationControls();
        toggleGoToTopButton();
    }

    function renderPaginationControls() {
        if (!paginationControlsContainer) return;
        paginationControlsContainer.innerHTML = '';
        const totalPages = Math.ceil(activeDataSet.length / itemsPerPage);

        if (totalPages <= 1) return;

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Prev';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updateDisplayedProperties();
                scrollToGridTop(true);
            }
        });
        paginationControlsContainer.appendChild(prevButton);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.toggle('active', i === currentPage);
            pageButton.addEventListener('click', () => {
                if (currentPage !== i) {
                    currentPage = i;
                    updateDisplayedProperties();
                    scrollToGridTop(true);
                }
            });
            paginationControlsContainer.appendChild(pageButton);
        }

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                updateDisplayedProperties();
                scrollToGridTop(true);
            }
        });
        paginationControlsContainer.appendChild(nextButton);
    }

    function toggleGoToTopButton() {
        const displayStyle = 'block';
        goToTopButton.style.display = activeDataSet.length > 0 ? displayStyle : 'none';
    }

    function parsePrice(priceString) {
        if (!priceString) return 0;
        const cleanedString = priceString.replace(/[$,]/g, '');
        const price = parseFloat(cleanedString);
        return isNaN(price) ? 0 : price;
    }

    function sortProperties(properties, sortBy) {
        const sortedProperties = [...properties];
        switch (sortBy) {
            case 'price-asc':
                sortedProperties.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
                break;
            case 'price-desc':
                sortedProperties.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
                break;
            case 'sqft-asc':
                sortedProperties.sort((a, b) => (parseInt(a.sqft) || 0) - (parseInt(b.sqft) || 0));
                break;
            case 'sqft-desc':
                sortedProperties.sort((a, b) => (parseInt(b.sqft) || 0) - (parseInt(a.sqft) || 0));
                break;
            case 'default':
            default:
                sortedProperties.sort((a, b) => a.id - b.id);
                break;
        }
        return sortedProperties;
    }

    function performSearchAndFilter() {
        const searchTerm = searchInput.value.trim();
        const activeFilterTab = document.querySelector('.property-filter-tabs .tab.active');
        const filterStatus = activeFilterTab ? activeFilterTab.textContent.trim().toLowerCase() : 'all';
        const minSqft = minSqftInput.value.trim();
        const maxSqft = maxSqftInput.value.trim();
        const minBeds = minBedsInput.value.trim();
        const minBaths = minBathsInput.value.trim();
        const sortValue = sortSelect ? sortSelect.value : 'default';

        let results = allFetchedProperties;
        results = filterByStatus(results, filterStatus);
        results = filterBySearch(results, searchTerm);
        results = filterBySqft(results, minSqft, maxSqft);
        results = filterByBeds(results, minBeds);
        results = filterByBaths(results, minBaths);
        results = sortProperties(results, sortValue);

        activeDataSet = results;
        currentPage = 1;
        updateDisplayedProperties();
    }

    function handleFilterChange(event) {
        filterTabs.forEach(item => item.classList.remove('active'));
        event.target.classList.add('active');
        performSearchAndFilter();
    }

    function handleSearchSubmit(event) {
        event.preventDefault();
        clearTimeout(debounceTimer);
        performSearchAndFilter();
    }

    function toggleAdvancedFilters() {
        advancedFiltersContainer.classList.toggle('hidden');
        advancedButton.classList.toggle('active');
    }

    function scrollToGridTop(immediate = false) {
        if (!propertiesGrid) return;
        const offset = 100;
        const gridTopRelativeToDocument = propertiesGrid.getBoundingClientRect().top + window.scrollY;
        const topPos = gridTopRelativeToDocument - offset;

        window.scrollTo({
            top: topPos > 0 ? topPos : 0 ,
            behavior: immediate ? 'auto' : 'smooth'
        });
    }
});