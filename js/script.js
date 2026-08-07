document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav a');
  const sections = document.querySelectorAll('section[id]');
  const header = document.querySelector('.header');

  const setActiveLink = () => {
    let current = '';

    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('header-shadow', window.scrollY > 20);
    }
    setActiveLink();
  });

  setActiveLink();

  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
