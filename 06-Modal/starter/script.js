'use strict';
class Modal {
  // DOM object vars
  hidden = document.querySelector('.hidden');
  modal = document.querySelector('.modal');
  overlay = document.querySelector('.overlay');
  modalButtons = document.querySelectorAll('.show-modal');
  closeModalWindow = document.querySelector('.close-modal');

  constructor() {
    this.modalButtonHandler();
    this.modalWindowHandler();
  }

  modalWindowHandler() {
    // Arrow functions do not have their own this; they inherit it from the surrounding scope, so you can use this directly inside them.
    this.closeModalWindow.addEventListener('click', () => this.hideModal());
    document.addEventListener('', () => this.hideModal());
  }

  modalButtonHandler() {
    // To access the class instance inside this function, you must save a reference to it (commonly called self or that) outside the function:
    const self = this;
    this.modalButtons.forEach(button => {
      button.addEventListener('click', function () {
        self.showModal();
      });
    });
  }

  static print(text) {
    console.log(text);
  }

  showModal() {
    // One or the other
    // Overriding css display property altogether
    // document.querySelector('.overlay', '.hidden').style.display = 'block';
    // document.querySelector('.modal', '.hidden').style.display = 'block';

    // Removing hidden class
    this.modal.classList.remove('hidden');
    this.overlay.classList.remove('hidden');
  }

  hideModal() {
    // Add hidden class
    this.modal.classList.add('hidden');
    this.overlay.classList.add('hidden');
    document.addEventListener('keydown')
  }
}

const modal = new Modal();
