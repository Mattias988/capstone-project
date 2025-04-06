export const propertiesGrid = document.getElementById('properties-grid-container');
export const cardTemplate = document.getElementById('property-card-template');
export const filterTabs = document.querySelectorAll('.property-filter-tabs .tab');
export const goToTopButton = document.getElementById('go-to-top-button');
export const searchForm = document.querySelector('.search-form');
export const searchInput = document.querySelector('.search-form .search-input');
export const advancedButton = document.querySelector('.search-form .advanced-button');
export const advancedFiltersContainer = document.getElementById('advanced-filters-container');
export const minSqftInput = document.getElementById('min-sqft');
export const maxSqftInput = document.getElementById('max-sqft');
export const minBedsInput = document.getElementById('min-beds');
export const minBathsInput = document.getElementById('min-baths');
export const clearAdvancedButton = document.getElementById('clear-advanced-filters');
export const sortSelect = document.getElementById('sort-by');
export const mainHeader = document.getElementById('main-header');
export const menuToggle = document.querySelector('.menu-toggle');
export const paginationControlsContainer = document.getElementById('pagination-controls-container');

export function checkElementsExist() {
    let elementsExist = true;
    if (!propertiesGrid) { console.error("Element 'properties-grid-container' not found."); elementsExist = false; }
    if (!cardTemplate || cardTemplate.tagName !== 'TEMPLATE') { console.error("Element 'property-card-template' not found or not a <template>."); elementsExist = false; }
    if (!goToTopButton) { console.error("Element 'go-to-top-button' not found."); elementsExist = false; }
    if (!searchForm) { console.error("Element '.search-form' not found."); elementsExist = false; }
    if (!searchInput) { console.error("Element '.search-input' inside '.search-form' not found."); elementsExist = false; }
    if (!advancedButton) { console.error("Element '.advanced-button' not found."); elementsExist = false; }
    if (!advancedFiltersContainer) { console.error("Element '#advanced-filters-container' not found."); elementsExist = false; }
    if (!minSqftInput) { console.error("Element '#min-sqft' not found."); elementsExist = false; }
    if (!maxSqftInput) { console.error("Element '#max-sqft' not found."); elementsExist = false; }
    if (!minBedsInput) { console.error("Element '#min-beds' not found."); elementsExist = false; }
    if (!minBathsInput) { console.error("Element '#min-baths' not found."); elementsExist = false; }
    if (!clearAdvancedButton) { console.error("Element '#clear-advanced-filters' not found."); elementsExist = false; }
    if (!sortSelect) { console.error("Element '#sort-by' not found."); elementsExist = false; }
    if (!mainHeader) { console.error("Element '#main-header' not found."); elementsExist = false; }
    if (!menuToggle) { console.error("Element '.menu-toggle' not found."); elementsExist = false; }
    if (!paginationControlsContainer) { console.error("Element '#pagination-controls-container' not found."); elementsExist = false; }
    return elementsExist;
}