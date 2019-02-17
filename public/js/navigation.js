'use strict';

const navigationMenu = document.querySelector('.nav__list');

const navigationToggle = document.querySelector('.nav__toggle');

if (navigationToggle != undefined){
    navigationToggle.addEventListener('click', () => {
        navigationMenu.classList.toggle('nav__list--active');
    });
}