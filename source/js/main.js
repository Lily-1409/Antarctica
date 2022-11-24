import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // скролл до блоков
  document.querySelectorAll('.wrapper a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });
    });
  });

  // открытие-закрытие меню
  const menuButton = document.querySelector('.main-nav-toogle');
  const svg = menuButton.querySelectorAll('svg');
  const buttonOpen = menuButton.querySelector('.main-nav-toogle--opened');
  const buttonClose = menuButton.querySelector('.main-nav-toogle--close');
  const nav = document.querySelector('.navigation-list');
  const header = document.querySelector('.header');

  menuButton.addEventListener('click', () => {
    for (let i = 0; i < svg.length; i++) {
      const currentIcon = svg[i];

      currentIcon.classList.toggle('main-nav-toogle--hidden');

      if (buttonOpen.classList.contains('main-nav-toogle--hidden')) {
        buttonClose.style.display = 'block';
        nav.style.display = 'block';
        header.classList.add('header-open-menu-js');
      } else {
        buttonClose.style.display = 'none';
        nav.style.display = 'none';
        header.classList.remove('header-open-menu-js');
      }
    }
  });

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
