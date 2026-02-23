// src/scripts/navbar.js
export function initNavbar() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]'); // Selecciona todas las secciones con ID
  let isScrolling = false;
  let scrollTimeout;

  // loop de los nav links para agregar el evento de click
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // comprobar que estamos scrolleando manualmente
          isScrolling = true;
          clearTimeout(scrollTimeout);
          
          const offsetTop = targetElement.offsetTop - 80; // Altura del navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          
          // actualizar el estado activo inmediatamente sin esperar al scroll event
          updateActiveLink(targetId);
          
          // esperar a que termine el scroll suave antes de reactivar el scroll listener
          scrollTimeout = setTimeout(() => {
            isScrolling = false;
          }, 1000);
        }
      }
    });
  });

  // función para actualizar el link activo
  function updateActiveLink(targetId) {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === targetId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // update active navlink y calcular la sección actual al hacer scroll
  window.addEventListener('scroll', () => {
    // NO actualizar mientras estamos en un scroll manual
    if (isScrolling) return;

    let currentSection = '';
    const scrollPosition = window.scrollY + 150; 

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSection = section.getAttribute('id');
      }
    });

    updateActiveLink(`#${currentSection}`);
  });
}

// iniciar el navbar cuando el DOM esté listo
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
  } else {
    initNavbar();
  }
}