/* ============================================
   GFG ARQUITECTURA — SCRIPTS.JS COMPLETO
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     1. NAVBAR — scroll + mobile toggle
  ------------------------------------------ */
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
    const s = navToggle.querySelectorAll('span');
    if (open) {
      s[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      s[1].style.opacity   = '0';
      s[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      s.forEach(el => { el.style.transform=''; el.style.opacity=''; });
    }
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
      navToggle.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
    });
  });

  /* ------------------------------------------
     2. SCROLL REVEAL — IntersectionObserver
  ------------------------------------------ */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (!e.isIntersecting) return;
      const siblings = [...e.target.parentElement.children];
      const delay    = siblings.indexOf(e.target) * 80;
      setTimeout(() => e.target.classList.add('in-view'), delay);
      revealObs.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ------------------------------------------
     3. COUNTERS — hero stats
  ------------------------------------------ */
  const countUp = (el) => {
    const target = +el.dataset.target;
    const dur    = 1800;
    const steps  = 55;
    let s = 0;
    const t = setInterval(() => {
      s++;
      el.textContent = Math.min(Math.round(target / steps * s), target);
      if (s >= steps) clearInterval(t);
    }, dur / steps);
  };

  const statsObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.stat-number[data-target], .pf-stat-n[data-target]')
        .forEach(countUp);
      statsObs.disconnect();
    }
  }, { threshold: 0.5 });
  const statsEl = document.querySelector('.hero-stats, .pf-hero-stats');
  if (statsEl) statsObs.observe(statsEl);

  /* ------------------------------------------
     4. TIMELINE — animate dots on scroll
  ------------------------------------------ */
  const tlObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity   = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.tl-item').forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
    tlObs.observe(el);
  });

  /* ------------------------------------------
     5. ACTIVE NAV on scroll
  ------------------------------------------ */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const activeObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAnchors.forEach(a => a.style.color = '');
        const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (a) a.style.color = 'var(--gold)';
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => activeObs.observe(s));

  /* ------------------------------------------
     6. SMOOTH SCROLL (offset for navbar)
  ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });

  /* ------------------------------------------
     7. CONTACT FORM validation
  ------------------------------------------ */
  const form      = document.getElementById('contactForm');
  const success   = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');
  const loader    = document.getElementById('btnLoader');
  const btnText   = submitBtn?.querySelector('.btn-text');

  const validators = {
    nombre:      v => v.trim().length >= 3      ? '' : 'Ingresa tu nombre completo.',
    email:       v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Ingresa un correo válido.',
    telefono:    v => /^[\d\s+\-()]{8,}$/.test(v.trim()) ? '' : 'Ingresa un teléfono válido.',
    tipo:        v => v !== '' ? '' : 'Selecciona el tipo de proyecto.',
    presupuesto: v => v !== '' ? '' : 'Selecciona un rango de presupuesto.',
  };

  const showErr = (name, msg) => {
    const err   = document.getElementById(`error-${name}`);
    const group = document.getElementById(name)?.closest('.form-group');
    if (err) err.textContent = msg;
    if (group) group.classList.toggle('has-error', !!msg);
  };

  Object.keys(validators).forEach(name => {
    const f = document.getElementById(name);
    if (!f) return;
    f.addEventListener('blur',  () => showErr(name, validators[name](f.value)));
    f.addEventListener('input', () => {
      if (document.getElementById(`error-${name}`)?.textContent)
        showErr(name, validators[name](f.value));
    });
  });

  form?.addEventListener('submit', e => {
    e.preventDefault();
    let errors = false;
    Object.keys(validators).forEach(name => {
      const f   = document.getElementById(name);
      const err = f ? validators[name](f.value) : '';
      showErr(name, err);
      if (err) errors = true;
    });
    if (errors) return;

    submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Enviando...';
    loader?.classList.add('show');

    setTimeout(() => {
      submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Enviar Pre-calificación';
      loader?.classList.remove('show');
      form.reset();
      success?.classList.add('show');
      setTimeout(() => success?.classList.remove('show'), 6000);
    }, 2000);
  });

  /* ------------------------------------------
     8. PORTFOLIO card hover — touch support
  ------------------------------------------ */
  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('touchstart', () => card.classList.add('touched'), { passive: true });
    card.addEventListener('touchend',   () => setTimeout(() => card.classList.remove('touched'), 400));
  });

});
