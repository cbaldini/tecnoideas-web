// Tecnoideas - Interactividad principal

document.addEventListener('DOMContentLoaded', () => {
  // ========================================
  // MENÚ MÓVIL - HAMBURGUESA
  // ========================================
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      menuToggle.classList.toggle('active');
      siteNav.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = siteNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        siteNav.classList.remove('active');
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.site-header')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        siteNav.classList.remove('active');
      }
    });
  }

  // ========================================
  // ANIMACIONES DEL LOGO
  // ========================================
  // El movimiento del logo y su reflejo se resuelve completamente en CSS

  // ========================================
  // AÑO ACTUAL EN FOOTER
  // ========================================
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ========================================
  // SMOOTH SCROLL PARA ANCLAS
  // ========================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href === '#inicio') {
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // LOGO FLOTANTE (sin parallax)
  // ========================================
  // El logo ahora es sticky y solo hace el movimiento flotante en CSS

  // ========================================
  // OBSERVADOR DE INTERSECCIÓN PARA CARDS
  // ========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.info-card, .product-card, .experience-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});

// ========================================
// ANIMACIONES CSS INYECTADAS
// ========================================

if (!document.querySelector('style[data-app-animations]')) {
  const style = document.createElement('style');
  style.setAttribute('data-app-animations', 'true');
  style.textContent = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes glow {
      0%, 100% {
        box-shadow: 0 0 40px rgba(0, 102, 255, 0.1);
      }
      50% {
        box-shadow: 0 0 60px rgba(0, 102, 255, 0.2);
      }
    }

    .hero-media {
      animation: slideIn 0.8s ease-out;
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        animation: none !important;
        transition: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}
