// открытие-закрытие мобильного меню
const menuButton = document.querySelector('.main-nav-toogle');
const svg = menuButton.querySelectorAll('svg');
const iconOpen = menuButton.querySelector('.main-nav-toogle__iconOpen');
const iconClose = menuButton.querySelector('.main-nav-toogle__iconClose');
const nav = document.querySelector('.navigation-list');
const header = document.querySelector('.header');

menuButton.addEventListener('click', () => {
  for (let i = 0; i < svg.length; i++) {
    const currentIcon = svg[i];

    currentIcon.classList.toggle('main-nav-toogle--hidden');

    if (iconOpen.classList.contains('main-nav-toogle--hidden')) {
      iconClose.style.display = 'block';
      nav.classList.add('navigation-list--active');
      header.classList.add('header-open-menu-js');
    } else {
      iconClose.style.display = 'none';
      header.classList.remove('header-open-menu-js');
    }
  }
});
