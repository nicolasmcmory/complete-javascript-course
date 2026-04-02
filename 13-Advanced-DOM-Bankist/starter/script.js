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

const h1 = document.querySelector('h1');

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
  `rgb(${randInt(100, 255)},${randInt(0, 255)},${randInt(200, 255)})`;
