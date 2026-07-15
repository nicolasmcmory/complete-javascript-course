'use strict';

// POI Regular fns
// Starting Leaflet API
const startMap = (lat, lng) => {
  // Leaflet implementation
  const map = L.map('map').setView([lat, lng], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  return map;
};

// POI Alpine components
const mapty = () => ({
  // General params
  errorMsg: null,
  map: null,
  clickedLat: null,
  clickedLng: null,

  // Form state and input values
  showForm: false,
  currentMarker: null,
  type: 'running',
  distance: '',
  duration: '',
  cadence: '',
  elevation: '',
  popupMsg: 'New workout',

  // POI Actions
  buildWorkout() {
    const isRunning = this.type === 'running';
    const typeSpecKey = isRunning ? 'cadence' : 'elevation';

    // Helper, validate by coercion to number and positive check
    const validate = (val) => {
      const n = Number(val);
      return n && n > 0;
    };

    // Values
    const values = {
      distance: this.distance,
      duration: this.duration,
      lat: this.clickedLat,
      lng: this.clickedLng,
      [typeSpecKey]: isRunning ? this.cadence : this.elevation,
    };

    // Form validation
    if (!Object.values(values).every(validate)) {
      this.errorMsg = 'Please enter valid numbers';
      alert(this.errorMsg);
      return null;
    }

    const distance = Number(values.distance);
    const duration = Number(values.duration);

    // POI Alpine.store.workouts.workoutObj
    return {
      id: crypto.randomUUID(),
      type: this.type,
      distance,
      duration,
      pace: (duration / distance).toFixed(1),
      lat: values.lat,
      lng: values.lng,
      marker: this.currentMarker,
      moveToMarker: () => {
        this.map.closePopup();
        this.map.setView([values.lat, values.lng], 13, {
          animate: true,
          duration: 1,
        });
      },
      [typeSpecKey]: Number(values[typeSpecKey]),
    };
  },

  updateMarkerPopup(workout) {
    const type = workout.type.charAt(0).toUpperCase() + workout.type.slice(1);
    this.currentMarker.setPopupContent(`${type} - ${workout.distance}kms`);
  },

  resetForm() {
    this.showForm = false;
    this.distance = this.duration = this.cadence = this.elevation = '';
  },

  // POI Custom form driver
  customSubmit() {
    // Add workout to workouts store
    const workout = this.buildWorkout();
    if (!workout) return;
    Alpine.store('workouts').add(workout);
    this.updateMarkerPopup(workout);
    this.resetForm();
  },

  // POI Lifecycle
  init() {
    // To avoid premature unload, warn the user if they have unsaved workouts
    const workoutObjs = Alpine.store('workouts').workoutObjs;
    window.addEventListener('beforeunload', (e) => {
      // Only warn if there are unsaved workouts
      if (!workoutObjs) return;
      if (workoutObjs.length > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    });

    // Geolocate and initialize leaflet
    navigator.geolocation.getCurrentPosition(
      (position) => {
        try {
          // Get coords from browser
          const { latitude, longitude } = position.coords;

          // Load map on current location
          this.map = startMap(latitude, longitude);

          // Add marker to leaflet map from click event, see leaflet docs
          this.map.on('click', (e) => {
            // Block clicks while form is open
            if (this.showForm) return;

            // Location from event and var assignment for persisting
            const { lat, lng } = e.latlng;
            this.clickedLat = lat;
            this.clickedLng = lng;

            // Popup config
            const popup = L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeOnClick: false,
              className: 'running-popup',
              content: this.popupMsg,
            });

            // Express marker
            this.currentMarker = L.marker([lat, lng]).addTo(this.map).bindPopup(popup).openPopup();

            // Open form
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

// POI Alpine initializer
document.addEventListener('alpine:init', () => {
  // Define Alpine store
  Alpine.store('workouts', {
    workoutObjs: [],
    add(workout) {
      this.workoutObjs.push(workout);
    },
    remove(workout) {
      workout.marker.remove();
      this.workoutObjs = this.workoutObjs.filter((w) => w.id !== workout.id);
    },
  });
  // Mapty component
  Alpine.data('mapty', mapty);
});
