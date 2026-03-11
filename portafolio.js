/* ============================================
   PORTAFOLIO.JS — Versión optimizada y fluida
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ------ Navbar siempre scrolled ------ */
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.classList.add('scrolled');
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.add('scrolled');
  }, { passive: true });

  /* ------ Mobile toggle ------ */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  navToggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
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
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
      navToggle?.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
    });
  });

  /* ------ Hero counter ------ */
  const countUp = (el) => {
    const target = +el.dataset.target, dur = 1600, steps = 50;
    let s = 0;
    const t = setInterval(() => {
      s++;
      el.textContent = Math.min(Math.round(target / steps * s), target);
      if (s >= steps) clearInterval(t);
    }, dur / steps);
  };
  const statsEl = document.querySelector('.pf-hero-stats');
  if (statsEl) {
    const so = new IntersectionObserver(en => {
      if (en[0].isIntersecting) {
        statsEl.querySelectorAll('[data-target]').forEach(countUp);
        so.disconnect();
      }
    }, { threshold: 0.5 });
    so.observe(statsEl);
  }

  /* ------ Datos de proyectos ------ */
  const projects = {
    'Casa Pedregal Oaxaca': {
      cat: 'Residencial · 2024', year: '2024',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85',
      reto: 'Integrar un programa de 480 m² construidos en un predio con desnivel de 6 metros, manteniendo vistas a la Sierra Norte y cumpliendo la normativa de uso de suelo en la Colonia Loma Bonita.',
      solucion: 'Diseño en tres plataformas escalonadas que aprovechan el desnivel como elemento compositivo. Muros de gavión con piedra local como elementos de contención y estética. Estructura de concreto visto con acabados de madera de encino.',
      tags: ['Residencial Premium', 'Concreto Visto', 'Piedra Local', 'Diseño en Pendiente'],
      area: '480 m²', plazo: '14 meses'
    },
    'Residencia San Felipe': {
      cat: 'Residencial · 2023', year: '2023',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=85',
      reto: 'Casa de retiro para familia con requerimientos de accesibilidad universal completa, en terreno de 800 m² con suelo expansivo en colonia San Felipe del Agua.',
      solucion: 'Losa de cimentación reforzada con tratamiento de suelo expansivo. Planta baja sin escalones, rampas integradas al diseño paisajístico. Ventanas de piso a techo con vidrio templado laminado de seguridad.',
      tags: ['Accesibilidad Universal', 'Suelo Expansivo', 'Vivienda Premium', 'Paisajismo'],
      area: '320 m²', plazo: '11 meses'
    },
    'Casa Huayapam': {
      cat: 'Residencial · 2022', year: '2022',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85',
      reto: 'Construir una residencia de ecoturismo en Santa María del Tule con restricciones estrictas de impacto visual sobre el árbol patrimonial de El Tule.',
      solucion: 'Arquitectura de bajo perfil con techos verdes. Materiales de adobe y tezontle regional para integración paisajística. Sistema de captación pluvial y fosa séptica de humedal construido para cero descarga.',
      tags: ['Ecoarquitectura', 'Adobe', 'Captación Pluvial', 'Techos Verdes'],
      area: '280 m²', plazo: '16 meses'
    },
    'Conjunto Habitacional Reforma': {
      cat: 'Residencial · 2021', year: '2021',
      img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=85',
      reto: 'Desarrollar 12 departamentos de interés medio en la Colonia Reforma sin exceder el índice de edificación permitido y resolviendo el estacionamiento en sótano sobre nivel freático alto.',
      solucion: 'Sótano con losa impermeabilizada tipo tina. Estructura de muros de concreto para máxima eficiencia de planta. 12 departamentos de 85–120 m² con terrazas orientadas al norte para ventilación cruzada.',
      tags: ['Multifamiliar', 'Sótano Impermeable', 'Nivel Freático', 'Eficiencia Estructural'],
      area: '1,380 m² construidos', plazo: '22 meses'
    },
    'Casa de Campo Sierra Juárez': {
      cat: 'Residencial · 2024 ★', year: '2024',
      img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=900&q=85',
      reto: 'Construcción en ladera boscosa a 2,400 msnm en la Sierra Juárez sin acceso para maquinaria mayor. Terreno con pendiente del 45% y suelo rocoso con bolsones de material orgánico.',
      solucion: 'Cimentación ciclópea con piedra del lugar. Estructura de madera laminada encolada transportada en piezas y ensamblada en sitio. Techos de lámina galvanizada con acabado de barro cocido. Impacto cero sobre los árboles del predio.',
      tags: ['Construcción en Ladera', 'Madera Laminada', 'Sierra Juárez', 'Bajo Impacto'],
      area: '210 m²', plazo: '18 meses'
    },
    'Edificio Corporativo Centro': {
      cat: 'Comercial · 2023', year: '2023',
      img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85',
      reto: '8 niveles de oficinas en zona patrimonial del Centro Histórico con restricciones INAH sobre altura, materiales y fachada.',
      solucion: 'Estructura interior independiente de marcos de concreto. Fachada de cantera verde con modulación que dialoga con el contexto histórico. Los primeros 2 niveles respetan la imagen colonial; los superiores son contemporáneos y "neutros" conforme a criterios INAH.',
      tags: ['Centro Histórico', 'INAH', 'Cantera Verde', 'Oficinas Premium'],
      area: '3,200 m²', plazo: '28 meses'
    },
    'Plaza Las Canteras': {
      cat: 'Comercial · 2022', year: '2022',
      img: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=900&q=85',
      reto: 'Centro comercial de vecindad de 18 locales en la Col. Reforma con restricción de altura de 2 plantas y requerimiento de 40 cajones de estacionamiento en superficie.',
      solucion: 'Diseño en "L" que libera el centro del predio para estacionamiento. Estructura metálica prefabricada para velocidad de construcción. Acabados de cantera y herrería artesanal oaxaqueña como identidad comercial.',
      tags: ['Plaza Comercial', 'Estructura Metálica', 'Artesanía Regional', 'Estacionamiento'],
      area: '1,850 m²', plazo: '14 meses'
    },
    'Hotel Boutique El Ángelus': {
      cat: 'Comercial · 2021', year: '2021',
      img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=85',
      reto: 'Rehabilitación de casona colonial del siglo XIX en el Centro Histórico para hotel boutique de 16 habitaciones, manteniendo los elementos arquitectónicos originales.',
      solucion: 'Intervención mínima sobre estructura existente de muros de adobe y tapiales. Consolidación estructural con inyecciones de lechada de cal. Instalaciones nuevas corridas por ductos ocultos en muros. Conservación de pisos de pasta y techos de vigas de madera originales.',
      tags: ['Rehabilitación', 'Adobe', 'Hotel Boutique', 'Patrimonio'],
      area: '820 m² rehabilitados', plazo: '20 meses'
    },
    'Restaurante Tierra Viva': {
      cat: 'Comercial · 2024 ★', year: '2024',
      img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85',
      reto: 'Restaurante con cocina vista y garden para 120 comensales en azotea de edificio existente en la Colonia Jalatlaco. Carga estructural adicional de hasta 600 kg/m².',
      solucion: 'Refuerzo estructural de la losa existente con vigas de acero soldadas in situ. Sistema de jardines en contenedores de fibra de vidrio para minimizar peso. Cubierta retráctil con estructura de aluminio marino para uso todo el año.',
      tags: ['Azotea', 'Restaurante', 'Refuerzo Estructural', 'Garden'],
      area: '380 m² en azotea', plazo: '8 meses'
    },
    'Puente Vehicular Etla': {
      cat: 'Infraestructura · 2022', year: '2022',
      img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=85',
      reto: 'Puente vehicular de 2 carriles sobre el Río Atoyac en el Valle de Etla. Creciente máxima de 420 m³/s, suelo aluvial con baja capacidad de carga y lecho variable.',
      solucion: 'Pilotes de concreto hincados de 60 cm de diámetro a 14 m de profundidad. Superestructura de vigas prefabricadas de concreto pretensado. Losa de rodamiento de concreto reforzado con carpeta asfáltica. Vida útil de diseño: 75 años.',
      tags: ['Puente Vehicular', 'Pilotes', 'Concreto Pretensado', 'Obra Pública'],
      area: 'Luz total: 38 m', plazo: '16 meses'
    },
    'Carretera Miahuatlán–Pochutla': {
      cat: 'Infraestructura · 2020', year: '2020',
      img: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=85',
      reto: 'Tramo de 4.2 km de carretera de montaña entre Miahuatlán y la Costa, con 12 curvas pronunciadas y 3 pasos hidráulicos en zona de alta precipitación (>1,200 mm anuales).',
      solucion: 'Diseño geométrico con radios mínimos ampliados. Muros de contención de mampostería en secciones críticas. 3 alcantarillas de concreto armado dimensionadas para tormenta de periodo de retorno 50 años. Señalización completa conforme a normativa SCT.',
      tags: ['Carretera de Montaña', 'Obras Hidráulicas', 'Sierra Sur', 'SCT'],
      area: '4.2 km de carretera', plazo: '24 meses'
    },
    'Marina Huatulco': {
      cat: 'Infraestructura · 2022 ★', year: '2022',
      img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=85',
      reto: 'Muelle turístico de 60 m de longitud en Bahía de Chahué, Huatulco. Suelos saturados de arena limosa, agua marina, normativa SEMARNAT para zona costera protegida.',
      solucion: 'Pilotes de acero hincados de 40 cm de diámetro con protección catódica. Plataforma de concreto marino f\'c=350 kg/cm² con relación agua/cemento controlada. Acabados de madera de teca tratada para resistencia al agua salada. Cumplimiento integral NOM-059-SEMARNAT.',
      tags: ['Obra Marítima', 'Pilotes de Acero', 'Concreto Marino', 'SEMARNAT'],
      area: 'Muelle 60 m + palapa 280 m²', plazo: '18 meses'
    },
    'Planta Potabilizadora SAPAO': {
      cat: 'Infraestructura · 2019', year: '2019',
      img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&q=85',
      reto: 'Planta de potabilización de agua para 8,000 habitantes en la Región Cañada de Oaxaca. Suministro por gravedad desde manantial a 800 m de distancia con 120 m de desnivel.',
      solucion: 'Sistema por gravedad con coagulación-floculación-sedimentación-filtración-desinfección. Tanques de concreto reforzado enterrados con impermeabilización epoxi interior. Línea de conducción de HDPE de 6". Automatización básica con sensores de nivel y cloro residual.',
      tags: ['Agua Potable', 'Infraestructura Pública', 'Región Cañada', 'SAPAO'],
      area: 'Capacidad: 12 L/s', plazo: '20 meses'
    },
    'Nave Industrial Parque Oaxaca': {
      cat: 'Industrial · 2023', year: '2023',
      img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85',
      reto: 'Nave industrial de 2,400 m² en el Parque Industrial Oaxaca para empresa de manufactura textil. Claros libres de 24 m, puente grúa de 5 toneladas y piso industrial de alta resistencia.',
      solucion: 'Estructura metálica de marcos rígidos con largueros de cubierta. Piso de concreto de 20 cm con fibra de acero y endurecedor de cuarzo. Iluminación cenital con paneles translúcidos. Subestación eléctrica 150 kVA y sistema contra incendio.',
      tags: ['Nave Industrial', 'Estructura Metálica', 'Piso Industrial', 'Manufactura'],
      area: '2,400 m²', plazo: '10 meses'
    },
    'Bodega Agroindustrial Nochixtlán': {
      cat: 'Industrial · 2021', year: '2021',
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=85',
      reto: 'Bodega de almacenamiento de granos para empresa cooperativa en la Mixteca Alta. Capacidad para 800 toneladas, zona sísmica D con suelo volcánico de alta variabilidad.',
      solucion: 'Estructura de concreto reforzado con zapatas sobre suelo compactado y mejorado. Muros de mampostería de block de concreto con castillos de 30×30. Piso de concreto con barrera de vapor. Sistema de ventilación natural para control de temperatura y humedad.',
      tags: ['Bodega Agroindustrial', 'Mixteca Alta', 'Granos', 'Ventilación Natural'],
      area: '1,200 m²', plazo: '9 meses'
    },
    'Planta Envasado Salina Cruz': {
      cat: 'Industrial · 2022 ★', year: '2022',
      img: 'https://images.unsplash.com/photo-1565793979648-ac1d7bfe4453?w=900&q=85',
      reto: 'Planta de envasado de aceite de coco en Salina Cruz, Istmo de Tehuantepec. Ambiente marino corrosivo, vientos del Tehuantepec de hasta 200 km/h y proceso industrial húmedo.',
      solucion: 'Estructura metálica con pintura epóxica marino-resistente. Cubierta de lámina aluzinc con fijación reforzada para carga de viento de diseño 220 km/h. Drenajes industriales con trampa de grasas y pre-tratamiento previo a descarga municipal.',
      tags: ['Ambiente Marino', 'Viento Tehuantepec', 'Proceso Húmedo', 'Istmo'],
      area: '1,600 m²', plazo: '12 meses'
    },
    'Almacén Logístico Istmo': {
      cat: 'Industrial · 2024', year: '2024',
      img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&q=85',
      reto: 'Centro de distribución regional de 3,600 m² en la zona industrial de Juchitán. Andenes de maniobras para 6 tráileres simultáneos y estiba de carga paletizada hasta 6 metros de altura.',
      solucion: 'Nave de estructura metálica con altura libre de 9 m. Piso de concreto armado de 25 cm para tráfico de montacargas de 5 toneladas. 6 andenes niveladores hidráulicos con marquesina. Oficinas de 220 m² integradas a la estructura principal.',
      tags: ['Centro de Distribución', 'Logística', 'Juchitán', 'Andenes'],
      area: '3,600 m²', plazo: '13 meses'
    }
  };

  /* ------ Filtros y grid ------ */
  const grid      = document.getElementById('pfGrid');
  const cards     = grid ? [...grid.querySelectorAll('.pf-card')] : [];
  const filterBtns = document.querySelectorAll('.filter-btn');
  const countEl   = document.getElementById('pfCount');
  let   activeFilter = 'all';

  const updateCount = (n) => {
    if (countEl) countEl.textContent = `${n} proyecto${n !== 1 ? 's' : ''}`;
  };

  // Entrada inicial de tarjetas con stagger
  const animateCards = (visibleCards) => {
    visibleCards.forEach((card, i) => {
      card.style.opacity    = '0';
      card.style.transform  = 'translateY(14px)';
      card.style.transition = `opacity 0.28s ease ${i * 40}ms, transform 0.28s ease ${i * 40}ms`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.style.opacity   = '1';
          card.style.transform = 'translateY(0)';
        });
      });
    });
  };

  const applyFilter = (cat) => {
    activeFilter = cat;
    filterBtns.forEach(b => b.classList.toggle('active', b.dataset.cat === cat));

    const visible = [];
    cards.forEach(card => {
      const match = cat === 'all' || card.dataset.cat === cat;
      card.style.display = match ? '' : 'none';
      if (match) visible.push(card);
    });

    updateCount(visible.length);
    animateCards(visible);
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.cat));
  });

  // Inicializar
  updateCount(cards.length);
  animateCards(cards);

  /* ------ Vista lista/cuadrícula ------ */
  const viewBtns = document.querySelectorAll('.view-btn');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      grid?.classList.toggle('list-view', btn.dataset.view === 'list');
    });
  });

  /* ------ Modal ------ */
  const modal     = document.getElementById('pfModal');
  const modalBody = document.getElementById('pfModalBody');
  const modalClose = document.getElementById('pfModalClose');

  const openModal = (name) => {
    const p = projects[name];
    if (!p || !modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="pm-img" style="background-image:url('${p.img}')"></div>
      <div class="pm-body">
        <span class="pm-cat">${p.cat}</span>
        <h2 class="pm-title">${name}</h2>
        <div class="pm-grid">
          <div>
            <h4 class="pm-label">Reto Técnico</h4>
            <p class="pm-text">${p.reto}</p>
          </div>
          <div>
            <h4 class="pm-label">Solución Aplicada</h4>
            <p class="pm-text">${p.solucion}</p>
          </div>
        </div>
        <div class="pm-meta">
          ${p.area  ? `<span class="pm-meta-item"><strong>Área:</strong> ${p.area}</span>` : ''}
          ${p.plazo ? `<span class="pm-meta-item"><strong>Plazo:</strong> ${p.plazo}</span>` : ''}
        </div>
        <div class="pm-tags">${p.tags.map(t => `<span class="pm-tag">${t}</span>`).join('')}</div>
        <a href="index.html#contacto" class="btn-primary" style="margin-top:24px;display:inline-flex">Solicitar proyecto similar</a>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal?.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Delegación de eventos en tarjetas
  grid?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-project]');
    if (btn) openModal(btn.dataset.project);
  });

  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  /* ------ Sticky controls shadow ------ */
  const controls = document.querySelector('.pf-controls');
  window.addEventListener('scroll', () => {
    if (!controls) return;
    controls.style.boxShadow = window.scrollY > 80 ? '0 4px 24px rgba(0,0,0,0.5)' : '';
  }, { passive: true });

  /* ------ Scroll reveal ------ */
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

});
