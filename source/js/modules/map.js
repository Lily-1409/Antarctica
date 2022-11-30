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
  myPlacemarkTemp = new window.ymaps.Placemark([59.93885879814745, 30.325438403329063], {}, {
    iconLayout: 'default#image',
    iconImageHref: '../img/svg/marker-card.svg',
    iconImageSize: [18, 22],
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
