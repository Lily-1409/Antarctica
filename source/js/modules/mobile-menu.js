// открытие-закрытие мобильного меню
const menuButton = document.querySelector('.main-nav-toogle');
const nav = document.querySelector('.navigation-list');
const header = document.querySelector('.header');

menuButton.addEventListener('click', () => {

  if (menuButton.classList.contains('main-nav-toogle--open-menu')) {
    nav.classList.remove('navigation-list--active');
    header.classList.remove('header-open-menu-js');
    menuButton.classList.remove('main-nav-toogle--open-menu');
  } else {
    nav.classList.add('navigation-list--active');
    header.classList.add('header-open-menu-js');
    menuButton.classList.add('main-nav-toogle--open-menu');
  }
});
