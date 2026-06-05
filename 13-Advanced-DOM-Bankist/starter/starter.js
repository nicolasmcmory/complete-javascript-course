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
const leftArrow = document.querySelector('.slider__btn.slider__btn--left');
const rightArrow = document.querySelector('.slider__btn.slider__btn--right');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');

const maxSlide = slides.length; // Maximum slide index
let curSlide = 0; // Current slide index

// Slide movement function
const moveSlides = function (position) {
  console.log(curSlide);
  if (Math.abs(curSlide) === maxSlide) curSlide = 0;

  // Move slides to the left or right depending on the position argument
  slides.forEach((slide, i) => {
    switch (position) {
      case 'start':
        slide.style.transform = `translateX(${100 * i}%)`;
        break;
      case 'right':
        slide.style.transform = `translateX(${100 * (i - curSlide)}%)`;
        break;
      case 'left':
        slide.style.transform = `translateX(${100 * (i + curSlide)}%)`;
        break;
    }
  });
};

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
// Go right or left depending on the position argument and move slides accordingly
const slideRight = function () {
  curSlide++;
  moveSlides('right');
};

const slideLeft = function () {
  curSlide--;
  moveSlides('left');
};

// Initial states
moveSlides('start');
createDots();

// Event listening
// Click event listeners for arrows
leftArrow.addEventListener('click', slideLeft);
rightArrow.addEventListener('click', slideRight);
dotsContainer.addEventListener('click', )

// Key event listener for slide control
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') slideRight();
  if (e.key === 'ArrowLeft') slideLeft();
});

// Dots - Add/remove css classes
