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

  setTimeout(function () {
    function init() {
      const map = new window.ymaps.Map('map', {
        center: [59.93885879814745, 30.325438403329063],
        zoom: 14,
      });

      const placemark = new window.ymaps.Placemark([59.93885879814745, 30.325438403329063], {}, {
        iconLayout: 'default#image',
        iconImageHref: '../img/svg/marker-card.svg',
        iconImageSize: [20, 20],
        iconImageOffset: [0, 0],
      });
      map.geoObjects.add(placemark);
    }

    window.ymaps.ready(init);
  }, 2000);

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
