// Tecnoideas - Interactividad principal

document.addEventListener('DOMContentLoaded', () => {

  // MENU MOVIL
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      menuToggle.classList.toggle('active');
      siteNav.classList.toggle('active');
    });

    const navLinks = siteNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        siteNav.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.site-header')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        siteNav.classList.remove('active');
      }
    });
  }

  // ANNO ACTUAL EN FOOTER
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // CARRUSEL DE BANNERS
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    if (slides.length < 2) return;

    let currentIndex = 0;

    function showSlide(index) {
      currentIndex = ((index % slides.length) + slides.length) % slides.length;
      slides.forEach((s) => s.classList.remove('active'));
      dots.forEach((d) => d.classList.remove('active'));
      slides[currentIndex].classList.add('active');
      if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }

    showSlide(0);

    // Timer único y permanente — nunca se destruye ni recrea
    setInterval(() => showSlide(currentIndex + 1), 15000);

    // Clic en dot: solo cambia el slide, el timer sigue su ritmo
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showSlide(index));
    });
  }

  // SMOOTH SCROLL
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href === '#inicio') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = Math.max(0, target.offsetTop - headerHeight);
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ANIMACION DE CARDS
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
