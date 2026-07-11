'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

const geolocate = () => ({
  lat: null,
  lng: null,
  init() {
    // Set the context of 'this' to a variable to use inside the callback function, geolocation api "this" is window object, not the Alpine component
    const self = this;
    // Navigator geolocation API to get the current position of the user
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        self.lat = latitude;
        self.lng = longitude;
        console.log(self.lat, self.lng);
        console.log(
          `https://www.google.com/maps/@${self.lat},${self.lng},14z?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D`,
        );
      },
      (err) => {
        alert(`Position not found! (${err.message})`);
      },
    );
  },
});

document.addEventListener('alpine:init', () => {
  Alpine.data('mapty', geolocate);
});
