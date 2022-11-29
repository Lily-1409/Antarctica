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

  // setTimeout(function () {
  //   function init() {
  //     const map = new window.ymaps.Map('map', {
  //       center: [59.93885879814745, 30.325438403329063],
  //       zoom: 14,
  //     });

  //     const placemark = new window.ymaps.Placemark([59.93885879814745, 30.325438403329063], {}, {
  //       iconLayout: 'default#image',
  //       iconImageHref: '../img/svg/marker-card.svg',
  //       iconImageSize: [20, 20],
  //       iconImageOffset: [0, 0],
  //     });
  //     map.geoObjects.add(placemark);
  //   }

  //   window.ymaps.ready(init);
  // }, 2000);


  let spinner = document.querySelector('.loader');
  let checkIfLoad = false;
  let myMapTemp;
  let myPlacemarkTemp;

  function init() {
    myMapTemp = new window.ymaps.Map('map', {
      center: [59.93885879814745, 30.325438403329063],
      zoom: 14,
      controls: ['zoomControl', 'fullscreenControl'],
    });
    myPlacemarkTemp = new window.ymaps.Placemark([55.730138, 37.594238], {}, {
      iconLayout: 'default#image',
      iconImageHref: '../img/svg/marker-card.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [0, 0],
    });
    myMapTemp.geoObjects.add(myPlacemarkTemp);
    let layer = myMapTemp.layers.get(0).get(0);

    waitForTilesLoad(layer).then(function () {
      spinner.removeClass('is-active');
    });
  }

  function waitForTilesLoad(layer) {
    return new window.ymaps.vow.Promise(function (resolve) {
      let tc = getTileContainer(layer);
      let readyAll = true;
      tc.tiles.each(function (tile) {
        if (!tile.isReady()) {
          readyAll = false;
        }
      });
      if (readyAll) {
        resolve();
      } else {
        tc.events.once('ready', function () {
          resolve();
        });
      }
    });
  }

  function getTileContainer(layer) {
    for (let k in layer) {
      if (layer.hasOwnProperty(k)) {
        if (
          layer[k] instanceof window.ymaps.layer.tileContainer.CanvasContainer
          || layer[k] instanceof window.ymaps.layer.tileContainer.DomContainer
        ) {
          return layer[k];
        }
      }
    }
    return null;
  }

  // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
  function loadScript(url, callback) {
    let script = document.createElement('script');

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState === 'loaded' ||
                script.readyState === 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }

    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  let ymap = function () {
    document.querySelector('.ymap-container').addEventListener('mouseenter', (function () {
      if (!checkIfLoad) {
        checkIfLoad = true;

        // Загружаем API Яндекс.Карт
        loadScript('https://api-maps.yandex.ru/2.1/?apikey=0758f9f2-8eef-41cf-9876-aa79719acf2f&load=package.map&lang=ru_RU', function () {
          // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
          window.ymaps.load(init);
        });
      }
    }
    ));
  };

  ymap();

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
