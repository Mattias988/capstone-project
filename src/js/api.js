export async function fetchProperties(url = 'src/property-data.json') {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const propertiesData = await response.json();
        if (!Array.isArray(propertiesData)) {
            throw new Error('Invalid data format received.');
        }
        return propertiesData;
    } catch (error) {
        console.error('Error fetching or parsing property data:', error);
        throw error;
    }
}