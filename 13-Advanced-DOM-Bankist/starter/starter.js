'use strict';

///////////////////////////////////////
// Global variables
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const navButtons = document.querySelectorAll('.nav__link');
const navBar = document.querySelector('.nav__links');

// BUSINESS LOGIC
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Scroll navigation
const scrollTo = function (e) {
  const event = /**@type {Event} */ (e);
  const target = /**@type {HTMLAnchorElement} */ (event.target);

  event.preventDefault();

  const id = target.getAttribute('href');

  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
};

// EVENT HANDLERS
// Modal control
const controlModal = function () {
  btnsOpenModal.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal(e);
    }
  });
};

// Scroll control
function controlNavButtonsScrollTo() {
  navBar.addEventListener('click', function (e) {
    if (
      e.target instanceof Element &&
      e.target.classList.contains('nav__link')
    ) {
      scrollTo(e);
    }
  });
}

// Drivers
// Main driver function
function init() {
  controlModal();
  controlNavButtonsScrollTo();
}

init();

//////////////////////////////////
// Lectures

// Element builder function
/* const el = function (tag: string, { cls: string, text: string, children }) {
  const node = document.createElement(tag);
  if (cls) node.classList.add(cls);
  if (text) node.textContent = text;
  if (children) {
    children.forEach(child => node.append(child));
  }
  return node;
};

const element = el('div', {
  cls: 'cookie-message',
  text: 'Cookies are here.',
  children: [
    el('button', {
      cls: 'btn',
      text: 'Accept',
    }),
  ],
}); */

// document.querySelector('.header').append(element);
// Templates
/* const tplCookieMessage = document
  .querySelector('template#cookie-tpl')
  .content.cloneNode(true);

// DOM Objs
const header = document.querySelector('.header');
const cookieMessage = tplCookieMessage.querySelector('.cookie-message');
const acceptCookiesBtn = cookieMessage.querySelector('button');

// Text manipulation
cookieMessage.querySelector('p').textContent = 'help';
acceptCookiesBtn.textContent = 'press';

// Handlers
acceptCookiesBtn.addEventListener('click', e => {
  cookieMessage.remove();
});

header.append(tplCookieMessage);

console.log(
  typeof Number(document.querySelector('.nav__logo').dataset.yearOfConfection),
);

const section1 = document.querySelector('#section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');

btnScrollTo.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });
}); */

/* const h1 = document.querySelector('h1');

function popUp(message) {
  return function inner() {
    alert(message);
  };
}

const popupMessage = 'hello';
const popUpHandler = popUp(popupMessage);

h1.addEventListener('mouseenter', popUpHandler);

setTimeout(() => h1.removeEventListener('mouseenter', popUpHandler), 3000);

// rgb(255, 255, 255)
const randInt = (min, max) => Math.floor(Math.random() * (max - min) + 1 + min);
const randColor = () =>
  `rgb(${randInt(100, 255)},${randInt(0, 255)},${randInt(200, 255)})`; */

// Tabbed component
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

// JSDoc classes
const classActiveTab = 'operations__tab--active';
const classOperationsTab = 'operations__tab';
const classActiveContent = 'operations__content--active';
const classContentPre = 'operations__content--';

// Event delegation handle: added to parent element to avoid runtime latency drop with looping assignment via event delegation
tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest(`.${classOperationsTab}`);

  // Guard clause, if clicked event is not tab
  if (!clicked) return;

  // Reassignment for clarity
  const tab = clicked;

  // Remove active class from all tabs and tab contents
  tabs.forEach(tab => {
    tab.classList.remove(classActiveTab);
  });
  tabsContent.forEach(content => {
    content.classList.remove(classActiveContent);
  });

  // Add active class to tab and tab content
  tab.classList.add(classActiveTab);
  const tabNo = parseInt(tab.dataset.tab);
  document
    .querySelector(`.${classContentPre}${tabNo}`)
    .classList.add(classActiveContent);
});

// Intersection Observer API for auto-revealing sections on scroll
const allSections = document.querySelectorAll('.section');
const hiddenClass = 'section--hidden';

/* const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove(hiddenClass);
    observer.unobserve(entry.target);
  });
};

const observer = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

// Adding event listeners to all sections and hiding them on page load
allSections.forEach(section => {
  observer.observe(section);
  section.classList.add(hiddenClass);
});

// Lazy loading images with Intersection Observer API
const imgTargets = document.querySelectorAll('img[data-src]');

// Callback fn
const revealImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src img with new img
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', entry => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

// Load intersection observer
const imgObserver = new IntersectionObserver(revealImg, {
  root: null,
  rootMargin: '200px',
  threshold: 0,
});

imgTargets.forEach(imgTarget => imgObserver.observe(imgTarget)); */

// Slider component
// Arrows - Add/remove css classes
// Get elements from DOM
function slider() {
  const leftArrow = document.querySelector('.slider__btn.slider__btn--left');
  const rightArrow = document.querySelector('.slider__btn.slider__btn--right');
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.dots');
  const activeDotClass = 'dots__dot--active';

  // Global variables for slider component
  const maxSlideIndex = slides.length - 1; // Maximum slide index
  let curSlideIndex = 0; // Current slide index

  // Create dots for each slide
  const createDots = function () {
    slides.forEach((_, i) =>
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`,
      ),
    );
  };

  // Slide control functions
  // Activate dot corresponding to current slide and deactivate all other dots
  const activateDot = function () {
    const dots = dotsContainer.querySelectorAll('.dots__dot');
    if (!dots) return;

    // Deactivate all dots
    dots.forEach(dot => dot.classList.remove(activeDotClass));

    // Activate dot corresponding to current slide index, current slide
    const activeDot = dotsContainer.querySelector(
      `.dots__dot[data-slide="${curSlideIndex}"]`,
    );
    if (activeDot) activeDot.classList.add(activeDotClass);
  };

  // Slide control function - translate each slide by 100% of its width multiplied by the difference between its index and the current slide index
  const goToSlide = function () {
    console.log(curSlideIndex);
    slides.forEach(
      (slide, i) =>
        (slide.style.transform = `translateX(${100 * (i - curSlideIndex)}%)`),
    );

    // Activate dot corresponding to current slide and deactivate all other dots
    activateDot();
  };

  // Slide control functions for arrows - increment/decrement current slide index and call goToSlide function, with wrap-around logic
  const slideRight = function () {
    if (curSlideIndex === maxSlideIndex) curSlideIndex = 0;
    else curSlideIndex++;
    goToSlide();
  };

  // Slide control function for left arrow - decrement current slide index and call goToSlide function, with wrap-around logic
  const slideLeft = function () {
    if (curSlideIndex === 0) curSlideIndex = maxSlideIndex;
    else curSlideIndex--;
    goToSlide();
  };

  // Element builders
  // Dots - Add/remove css classes
  const handleDotClick = function (e) {
    // Guard clause - if clicked element is not a dot, return
    const dot = e.target.closest('.dots__dot');
    if (!dot) return;

    // Reassign current slide index to match clicked dot index and call goToSlide function
    curSlideIndex = Number(dot.dataset.slide);
    goToSlide();
  };

  // Event handlers
  // Click event listeners for arrows
  leftArrow.addEventListener('click', slideLeft);
  rightArrow.addEventListener('click', slideRight);

  // Click event listener for dots
  dotsContainer.addEventListener('click', e => handleDotClick(e));

  // Key event listener for slide control
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') slideRight();
    if (e.key === 'ArrowLeft') slideLeft();
  });

  // Initialization function to set up slider component
  function initSlider() {
    createDots(); // Create dots for each slide
    goToSlide(); // Set initial slide position
  }

  initSlider();
}

slider();
