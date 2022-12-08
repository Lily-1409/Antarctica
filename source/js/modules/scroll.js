// скролл до блоков
const triggers = [].slice.call(document.querySelectorAll('.wrapper a[href^="#"]'));
const header = document.querySelector('.header');
const menuButton = document.querySelector('.main-nav-toogle');
triggers.forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    try {
      document.querySelector(e.target.getAttribute('href'))
          .scrollIntoView({behavior: 'smooth', block: 'start'});

      header.classList.remove('header-open-menu-js');
      menuButton.classList.remove('main-nav-toogle--open-menu');
    } catch (error) {
      //
    }
  });
});
