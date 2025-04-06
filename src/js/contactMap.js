document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('map-container');

    if (mapContainer) {
        const mapCoordinates = [40.6782, -73.9442];
        const mapZoomLevel = 14;

        const map = L.map(mapContainer).setView(mapCoordinates, mapZoomLevel);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const marker = L.marker(mapCoordinates).addTo(map);

        marker.bindPopup("<b>Real Estate Office</b><br>123 Real Estate Ave").openPopup();

    } else {
        console.error("Map container with ID 'map-container' not found.");
    }
});