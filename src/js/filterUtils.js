export function filterByStatus(properties, status) {
    if (!status || status === 'all') return properties;
    const lowerCaseStatus = status.toLowerCase();
    return properties.filter(p => p.status && p.status.toLowerCase() === lowerCaseStatus);
}

export function filterBySearch(properties, searchTerm) {
    if (!searchTerm) return properties;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return properties.filter(p =>
        (p.title && p.title.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (p.address && p.address.toLowerCase().includes(lowerCaseSearchTerm))
    );
}

export function filterBySqft(properties, min, max) {
    const minVal = min ? parseInt(min, 10) : null;
    const maxVal = max ? parseInt(max, 10) : null;
    if (isNaN(minVal) && isNaN(maxVal)) return properties;
    return properties.filter(p => {
        const sqft = p.sqft ? parseInt(p.sqft, 10) : null;
        if (isNaN(sqft) || sqft === null) return false;
        const passesMin = isNaN(minVal) || minVal === null || sqft >= minVal;
        const passesMax = isNaN(maxVal) || maxVal === null || sqft <= maxVal;
        return passesMin && passesMax;
    });
}

export function filterByBeds(properties, min) {
    const minVal = min ? parseInt(min, 10) : null;
    if (isNaN(minVal) || minVal === null) return properties;
    return properties.filter(p => {
        const beds = p.beds ? parseInt(p.beds, 10) : null;
        if (isNaN(beds) || beds === null) return false;
        return beds >= minVal;
    });
}

export function filterByBaths(properties, min) {
    const minVal = min ? parseInt(min, 10) : null;
    if (isNaN(minVal) || minVal === null) return properties;
    return properties.filter(p => {
        const baths = p.baths ? parseInt(p.baths, 10) : null;
        if (isNaN(baths) || baths === null) return false;
        return baths >= minVal;
    });
}