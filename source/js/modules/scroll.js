// скролл до блоков
const triggers = [].slice.call(document.querySelectorAll('.wrapper a[href^="#"]'));

triggers.forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    try {
      document.querySelector(e.target.getAttribute('href'))
          .scrollIntoView({behavior: 'smooth', block: 'start'});
    } catch (error) {
      //
    }
  });
});
