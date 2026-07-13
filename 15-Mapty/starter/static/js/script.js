'use strict';

// POI Helpers
// POI Leaflet
// Starting Leaflet API
const startMap = (lat, lng) => {
  // Leaflet implementation
  const map = L.map('map').setView([lat, lng], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  return map;
};

// Add marker to map
const addMarker = function (map, msg, openForm) {
  // Add marker to leaflet map from click event, see leaflet docs
  map.on('click', (e) => {
    // Location from event
    const { lat, lng } = e.latlng;

    // Popup config
    const popup = L.popup({
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: 'running-popup',
      content: msg,
    });

    // Express marker
    L.marker([lat, lng]).addTo(map).bindPopup(popup).openPopup();

    // Open form using callback
    openForm();
  });
};

// Main driver fn for Mapty app, using Alpine.js for state management
const mapty = () => ({
  showForm: false,
  lat: null,
  lng: null,
  errorMsg: null,
  popupMsg: 'Popup message',
  map: null,
  init() {
    // Geolocate and initialize leaflet
    navigator.geolocation.getCurrentPosition(
      (position) => {
        try {
          // Get coords from browser
          const { latitude, longitude } = position.coords;
          this.lat = latitude;
          this.lng = longitude;

          // Load map on current location
          this.map = startMap(this.lat, this.lng);

          // Handle add marker event
          addMarker(this.map, this.popupMsg, () => {
            this.showForm = true;
          });

          // Error handling
        } catch (error) {
          this.errorMsg = 'Error in loading map.';
        }
      },
      (err) => {
        alert(`Position not found! (${err.message})`);
      },
    );
  },
});

document.addEventListener('alpine:init', () => {
  Alpine.data('mapty', mapty);
});
