/* =============================================
   GFG ARQUITECTURA & INGENIERÍA — SCRIPTS.JS
   All interactive functionality
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ================================================
  // 1. NAVBAR — scroll effect & mobile toggle
  // ================================================
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    // Animate hamburger to X
    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(6px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    });
  });


  // ================================================
  // 2. HERO STAT COUNTERS — count-up animation
  // ================================================
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const animateCounter = (el) => {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const steps    = 60;
    const increment = target / steps;
    let current = 0;
    let step    = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      el.textContent = current;
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
  };

  // Trigger counters when hero is visible
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(el => animateCounter(el));
        heroObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) heroObserver.observe(heroStats);


  // ================================================
  // 3. PORTFOLIO FILTERS
  // ================================================
  const filterBtns    = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          // Staggered entrance
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Inject fadeInCard keyframe dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInCard {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);


  // ================================================
  // 4. PORTFOLIO MODAL
  // ================================================
  const projectData = {
    1: {
      title:    'Casa Lomas del Pedregal',
      category: 'Residencial',
      image:    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=85',
      reto:     'Terreno con desnivel de 6 metros y suelo volcánico de resistencia variable. El proyecto requería integrar un sótano de servicio sin comprometer la estabilidad de los muros de contención.',
      solucion: 'Se diseñó una cimentación profunda con micropilotes de 12m de longitud, combinada con un sistema estructural escalonado que adapta cada nivel a la topografía natural del terreno. Los muros de contención se calcularon para resistir empujes laterales con factor de seguridad de 2.5.',
      datos:    'Superficie construida: 680 m² | Duración: 14 meses | Entregado: 2022',
    },
    2: {
      title:    'Torre Corporativa Polanco',
      category: 'Comercial',
      image:    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85',
      reto:     'Construcción de 12 niveles en una de las zonas de mayor valor del país, con predios colindantes habitados y calles con alta densidad de redes subterráneas.',
      solucion: 'Implementación de Muro Milán perimetral de 18m de profundidad antes de cualquier excavación. Se estableció un programa de monitoreo estructural con 48 sensores en predios vecinos, con protocolos de paro automático ante deformaciones anómalas.',
      datos:    'Superficie construida: 8,400 m² | Duración: 26 meses | Entregado: 2023',
    },
    3: {
      title:    'Puente Peatonal Xochimilco',
      category: 'Infraestructura',
      image:    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
      reto:     'Cruce de 28m de longitud sobre un canal de patrimonio histórico con restricciones ambientales estrictas: prohibición de trabajo nocturno, sin maquinaria pesada sobre el canal y mínimo impacto al ecosistema.',
      solucion: 'Estructura prefabricada de acero autoportante, ensamblada en taller y transportada en dos segmentos. El montaje final se realizó en 72 horas mediante grúa posicionada en la orilla, sin ninguna intervención dentro del cuerpo de agua.',
      datos:    'Longitud: 28 m | Duración: 4 meses | Entregado: 2021',
    },
    4: {
      title:    'Nave Industrial Vallejo',
      category: 'Industrial',
      image:    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85',
      reto:     'Claros libres de 30 metros para operación de maquinaria de fundición con cargas dinámicas de hasta 8 toneladas por puente grúa. El suelo de la zona requería tratamiento previo.',
      solucion: 'Sistema de marcos rígidos de acero A572 Gr50 con análisis de vibración dinámica en estado estacionario y transitorio. Se diseñó una losa industrial de 25cm con fibras de acero y tratamiento de suelo por compactación dinámica.',
      datos:    'Superficie: 4,200 m² | Duración: 8 meses | Entregado: 2023',
    },
    5: {
      title:    'Residencia Santa Fe',
      category: 'Residencial',
      image:    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85',
      reto:     'Integración de sótano triple (-9.5m) en zona clasificada como zona III de alta sismicidad, con napa freática a -4m y colindancia con edificio de oficinas en operación.',
      solucion: 'Sistema de aislamiento sísmico en base con 14 aisladores elastoméricos de alto amortiguamiento (HDR), combinado con disipadores de energía tipo Taylor en los primeros dos niveles. La cimentación se ejecutó con tablestacas metálicas y sistema de bombeo de agotamiento.',
      datos:    'Superficie: 1,200 m² | Duración: 22 meses | Entregado: 2024',
    },
    6: {
      title:    'Centro Comercial Insurgentes',
      category: 'Comercial',
      image:    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=85',
      reto:     'Renovación estructural completa de un local comercial de los años 70 con operación continua de 18 locatarios. Prohibición total de interrupciones comerciales los fines de semana.',
      solucion: 'Plan de refuerzo por etapas con apuntalamiento temporal calculado, trabajo exclusivamente en horario nocturno (10pm–6am) y encapsulamiento acústico de cada zona de intervención. Se lograron las 12 etapas sin ningún cierre comercial.',
      datos:    'Superficie intervenida: 2,100 m² | Duración: 18 meses | Entregado: 2022',
    },
  };

  const modal     = document.getElementById('portfolioModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.card-expand').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id   = btn.getAttribute('data-id');
      const data = projectData[id];
      if (!data) return;

      modalBody.innerHTML = `
        <div class="modal-image" style="background-image: url('${data.image}')"></div>
        <p style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-bottom:8px;">${data.category}</p>
        <h2>${data.title}</h2>
        <p style="font-size:0.75rem;color:var(--muted);margin-bottom:20px;">${data.datos}</p>
        <div style="margin-bottom:16px;">
          <p style="font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold);margin-bottom:8px;">Reto Técnico</p>
          <p>${data.reto}</p>
        </div>
        <div>
          <p style="font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--gold);margin-bottom:8px;">Solución Aplicada</p>
          <p>${data.solucion}</p>
        </div>
      `;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });


  // ================================================
  // 5. SCROLL ANIMATIONS — Intersection Observer
  // ================================================
  const animatedEls = document.querySelectorAll('.step-item, .blog-card, .socio-card, .portfolio-card');

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation based on sibling index
        const siblings = Array.from(entry.target.parentElement.children);
        const delay    = siblings.indexOf(entry.target) * 100;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  animatedEls.forEach(el => {
    // Set initial state for non-step items
    if (!el.classList.contains('step-item')) {
      el.style.opacity  = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    scrollObserver.observe(el);

    // When visible class is added, apply final state for non-step items
    const visibilityObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.target.classList.contains('visible') &&
            !mutation.target.classList.contains('step-item')) {
          mutation.target.style.opacity   = '1';
          mutation.target.style.transform = 'translateY(0)';
        }
      });
    });
    visibilityObserver.observe(el, { attributes: true, attributeFilter: ['class'] });
  });


  // ================================================
  // 6. CONTACT FORM — validation & submission
  // ================================================
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn   = document.getElementById('submitBtn');
  const btnLoader   = document.getElementById('btnLoader');
  const btnText     = submitBtn.querySelector('.btn-text');

  const validators = {
    nombre:      (v) => v.trim().length >= 3     ? '' : 'Ingresa tu nombre completo.',
    email:       (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Ingresa un correo válido.',
    telefono:    (v) => /^[\d\s\+\-\(\)]{8,}$/.test(v.trim()) ? '' : 'Ingresa un teléfono válido.',
    tipo:        (v) => v !== ''                ? '' : 'Selecciona el tipo de proyecto.',
    presupuesto: (v) => v !== ''                ? '' : 'Selecciona un rango de presupuesto.',
  };

  const validateField = (name, value) => {
    if (!validators[name]) return '';
    return validators[name](value);
  };

  const showFieldError = (name, message) => {
    const errorEl = document.getElementById(`error-${name}`);
    const group   = document.getElementById(name)?.closest('.form-group');
    if (errorEl) errorEl.textContent = message;
    if (group)   group.classList.toggle('has-error', !!message);
  };

  // Real-time validation
  Object.keys(validators).forEach(name => {
    const field = document.getElementById(name);
    if (!field) return;
    field.addEventListener('blur', () => {
      const error = validateField(name, field.value);
      showFieldError(name, error);
    });
    field.addEventListener('input', () => {
      if (document.getElementById(`error-${name}`)?.textContent) {
        showFieldError(name, validateField(name, field.value));
      }
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all required fields
    let hasErrors = false;
    Object.keys(validators).forEach(name => {
      const field = document.getElementById(name);
      if (!field) return;
      const error = validateField(name, field.value);
      showFieldError(name, error);
      if (error) hasErrors = true;
    });

    if (hasErrors) return;

    // Simulate form submission
    submitBtn.disabled = true;
    btnText.textContent = 'Enviando...';
    btnLoader.classList.add('show');

    setTimeout(() => {
      submitBtn.disabled = false;
      btnText.textContent = 'Enviar Pre-calificación';
      btnLoader.classList.remove('show');
      contactForm.reset();
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 6000);
    }, 2200);
  });


  // ================================================
  // 7. SMOOTH SCROLL for anchor links
  // ================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80; // navbar height
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  // ================================================
  // 8. ACTIVE NAV LINK — highlight on scroll
  // ================================================
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const activeNavObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active-nav'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active-nav');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => activeNavObserver.observe(s));

  // Add active-nav style
  const navStyle = document.createElement('style');
  navStyle.textContent = `.active-nav { color: var(--gold) !important; }`;
  document.head.appendChild(navStyle);

});
