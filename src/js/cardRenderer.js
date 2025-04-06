import { cardTemplate } from './domElements.js';

function initializeCardSlider(cardElement) {
    const imagesContainer = cardElement.querySelector('[data-images-container]');
    const images = imagesContainer?.querySelectorAll('img');
    const prevBtn = cardElement.querySelector('.slider-btn.prev');
    const nextBtn = cardElement.querySelector('.slider-btn.next');

    if (!images || images.length <= 1) {
        return;
    }

    if(prevBtn) prevBtn.style.display = 'block';
    if(nextBtn) nextBtn.style.display = 'block';

    let currentIndex = 0;

    const showImage = (index) => {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    };

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });
}

function createCardElement(property) {
    const cardClone = cardTemplate.content.cloneNode(true);
    const cardElement = cardClone.querySelector('.property-card');

    const imagesContainer = cardClone.querySelector('[data-images-container]');
    if (imagesContainer && Array.isArray(property.imageSrcs)) {
        imagesContainer.innerHTML = '';
        property.imageSrcs.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src || 'placeholder.jpg';
            img.alt = `${property.imageAlt || property.title || 'Property'} - Image ${index + 1}`;
            if (index === 0) {
                img.classList.add('active');
            }
            imagesContainer.appendChild(img);
        });
    } else {
        if(imagesContainer) imagesContainer.innerHTML = '<p style="color:grey; text-align:center; padding: 20px;">No images</p>';
    }

    const priceElement = cardClone.querySelector('[data-price]');
    const titleElement = cardClone.querySelector('[data-title]');
    const addressElement = cardClone.querySelector('[data-address]');
    const bedsElement = cardClone.querySelector('[data-beds] .feature-value');
    const bathsElement = cardClone.querySelector('[data-baths] .feature-value');
    const sqftElement = cardClone.querySelector('[data-sqft] .feature-value');
    const statusElement = cardClone.querySelector('[data-status]');

    if (priceElement) priceElement.textContent = property.price || 'N/A';
    if (titleElement) titleElement.textContent = property.title || 'Untitled';
    if (addressElement) addressElement.textContent = property.address || 'No address';
    if (bedsElement) bedsElement.textContent = property.beds ?? 'N/A';
    if (bathsElement) bathsElement.textContent = property.baths ?? 'N/A';
    if (sqftElement) sqftElement.textContent = property.sqft ?? 'N/A';
    if (statusElement) statusElement.textContent = property.status || 'N/A';

    return cardElement;
}

export function renderProperties(properties, container) {
    container.innerHTML = '';
    if (properties.length === 0) {
        container.innerHTML = '<p class="no-results-message" style="text-align: center; grid-column: 1 / -1; color: var(--secondary-text-color, #adb5bd);">No properties found matching your criteria.</p>';
        return;
    }
    properties.forEach(property => {
        const cardElement = createCardElement(property);
        container.appendChild(cardElement);
        initializeCardSlider(cardElement);
    });
}

export function appendProperties(propertiesToAppend, container) {
    propertiesToAppend.forEach(property => {
        const cardElement = createCardElement(property);
        container.appendChild(cardElement);
        initializeCardSlider(cardElement);
    });
}