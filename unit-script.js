const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-links');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    if (nav) nav.classList.remove('open');
  });
});

const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.nav-links a')];

const setActiveLink = () => {
  let currentId = '';
  sections.forEach((section) => {
    const top = window.scrollY + 140;
    if (top >= section.offsetTop) currentId = section.id;
  });
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${currentId}`;
    link.classList.toggle('active', isActive);
  });
};

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);
