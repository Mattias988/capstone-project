import propertiesDataElement from './propertiesData';

document.addEventListener('DOMContentLoaded', () => {
    const propertiesGrid = document.getElementById('properties-grid-container');
    const cardTemplate = document.getElementById('property-card-template');

    let propertiesData = [];
    if (propertiesDataElement) {
        try {
            propertiesData = JSON.parse(propertiesDataElement);
            displayProperties(propertiesData);
        } catch (e) {
            console.error(e);
        }
    }
    function displayProperties(properties) {
        properties.innerHTML = '';

        properties.forEach(property => {
            const cardClone = cardTemplate.cloneNode(true);

            const imgElement = cardClone.querySelector('[data-image]');
            const priceElement = cardClone.querySelector('[data-price]');
            const titleElement = cardClone.querySelector('[data-title]');
            const addressElement = cardClone.querySelector('[data-address]');
            const bedsElement = cardClone.querySelector('[data-beds] .features-value');
            const bathsElement = cardClone.querySelector('[data-baths] .features-value');
            const sqftElement = cardClone.querySelector('[data-sqft] .features-value');
            const statusElement = cardClone.querySelector('[data-status]');

            if (imgElement) {
                imgElement.src = property.imageSrc;
                imgElement.alt = property.imageAlt;
            }
            if (priceElement) priceElement.textContent = property.price;
            if (titleElement) titleElement.textContent = property.title;
            if (addressElement) addressElement.textContent = property.address;
            if (bedsElement) bedsElement.textContent = property.beds;
            if (bathsElement) bathsElement.textContent = property.baths;
            if (sqftElement) sqftElement.textContent = property.sqft;
            if (statusElement) statusElement.textContent = property.status;

            propertiesGrid.appendChild(cardClone);
        });
    }

    displayProperties(propertiesData);
})