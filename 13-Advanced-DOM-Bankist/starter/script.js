'use strict';

///////////////////////////////////////
// Global variables
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// Business logic
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

// Event handlers
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

// Drivers
// Main driver function
function init() {
  controlModal();
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
const tplCookieMessage = document
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
