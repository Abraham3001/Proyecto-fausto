document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('header');
    updateNavbar();
  window.addEventListener('scroll', updateNavbar);
  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
      navbar.classList.remove('navbar-initial');
    } else {
      navbar.classList.add('navbar-initial');
      navbar.classList.remove('navbar-scrolled');
    }
  }

  updateNavbar();
  window.addEventListener('scroll', updateNavbar);
});
