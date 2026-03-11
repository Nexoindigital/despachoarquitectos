/* =============================================
   PORTAFOLIO.JS — Scripts de portafolio.html
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ================================================
  // 1. NAVBAR — siempre visible (página sin hero full)
  // ================================================
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  // En esta página el navbar ya empieza con clase .scrolled
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    }
  });

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    const spans = navToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(6px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

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
  // 2. CONTADORES HERO
  // ================================================
  const statNums = document.querySelectorAll('.pf-stat-n[data-target]');

  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const steps  = 50;
    const inc    = target / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      el.textContent = Math.min(Math.round(inc * step), target);
      if (step >= steps) clearInterval(timer);
    }, 1800 / steps);
  };

  const heroObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNums.forEach(animateCount);
        heroObs.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.pf-hero-stats');
  if (heroStats) heroObs.observe(heroStats);


  // ================================================
  // 3. FILTROS POR CATEGORÍA
  // ================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const allCards   = document.querySelectorAll('.pf-card');
  const pfCount    = document.getElementById('pfCount');
  const pfEmpty    = document.getElementById('pfEmpty');

  const updateCount = (visible) => {
    if (pfCount) {
      pfCount.innerHTML = `Mostrando <strong>${visible}</strong> proyecto${visible !== 1 ? 's' : ''}`;
    }
    if (pfEmpty) {
      pfEmpty.classList.toggle('show', visible === 0);
    }
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter  = btn.getAttribute('data-filter');
      let visible   = 0;

      allCards.forEach((card, i) => {
        const cat   = card.getAttribute('data-category');
        const match = filter === 'all' || cat === filter;

        if (match) {
          card.classList.remove('hidden');
          // Reset animation para re-entrada
          card.style.animation = 'none';
          void card.offsetHeight;
          card.style.animation = `cardIn 0.45s ease ${(visible * 0.05)}s forwards`;
          card.style.opacity   = '0';
          card.style.transform = 'translateY(14px)';
          visible++;
        } else {
          card.classList.add('hidden');
        }
      });

      updateCount(visible);
    });
  });

  // Count inicial
  updateCount(allCards.length);


  // ================================================
  // 4. TOGGLE VISTA (GRID / LISTA)
  // ================================================
  const pfGrid    = document.getElementById('pfGrid');
  const btnGrid   = document.getElementById('viewGrid');
  const btnList   = document.getElementById('viewList');

  if (btnGrid && btnList && pfGrid) {
    btnGrid.addEventListener('click', () => {
      pfGrid.classList.remove('list-view');
      btnGrid.classList.add('active');
      btnList.classList.remove('active');
    });

    btnList.addEventListener('click', () => {
      pfGrid.classList.add('list-view');
      btnList.classList.add('active');
      btnGrid.classList.remove('active');
    });
  }


  // ================================================
  // 5. MODAL DE DETALLE
  // ================================================
  const projectDetails = {
    r1: {
      title:    'Casa Pedregal Oaxaca',
      cat:      'Residencial',
      year:     '2022',
      location: 'Oaxaca, Oax.',
      area:     '680 m²',
      img:      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1000&q=85',
      reto:     'Terreno con desnivel de 6 metros y suelo volcánico de resistencia variable. El proyecto requería integrar un sótano de servicio sin comprometer la estabilidad de los muros de contención laterales.',
      solucion: 'Se diseñó una cimentación profunda con micropilotes de 10m de longitud. La estructura se escalona siguiendo la topografía natural, con muros de contención calculados para un factor de seguridad de 2.5 contra el volcamiento.',
      tags:     ['Cimentación', 'Diseño estructural', 'Micropilotes'],
    },
    r2: {
      title:    'Residencia San Felipe',
      cat:      'Residencial',
      year:     '2024',
      location: 'San Felipe del Agua, Oax.',
      area:     '1,200 m²',
      img:      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=85',
      reto:     'Integración de sótano triple (-8.5m) en zona de sismicidad media, con napa freática a -3.5m y colindancia inmediata con residencia habitada.',
      solucion: 'Sistema de aislamiento sísmico en base con 12 aisladores elastoméricos de alto amortiguamiento (HDR), combinado con disipadores de energía tipo fluido-viscoso en los dos primeros niveles. Tablestacas metálicas perimetrales con bombeo de agotamiento controlado.',
      tags:     ['Aislamiento sísmico', 'Sótano', '1,200 m²'],
    },
    r3: {
      title:    'Casa Huayapam',
      cat:      'Residencial',
      year:     '2021',
      location: 'Huayapam, Oax.',
      area:     '420 m²',
      img:      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=85',
      reto:     'Construcción en ladera con pendiente del 35%, acceso restringido a maquinaria mayor y riesgo de deslizamiento en estación de lluvias.',
      solucion: 'Estructura principal en concreto con voladizo de 4.5m anclado a núcleo de rigidez. Muros de contención escalonados en mampostería de piedra regional con drenaje perimetral hacia pozos de infiltración.',
      tags:     ['Ladera', 'Voladizo', 'Concreto armado'],
    },
    r4: {
      title:    'Conjunto Habitacional Reforma',
      cat:      'Residencial',
      year:     '2023',
      location: 'Colonia Reforma, Oax.',
      area:     '780 m²',
      img:      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1000&q=85',
      reto:     'Seis viviendas en predio de 22m de frente con colindancias activas en tres lados y servidumbre de paso al fondo.',
      solucion: 'Diseño de conjuntos con pozos de luz centrales para ventilación e iluminación natural. Estructura independiente de marcos de concreto adosados con juntas sísmicas cada dos viviendas. Sistema de cisterna compartida y medición individual.',
      tags:     ['Conjunto habitacional', '6 viviendas', 'Marcos concreto'],
    },
    r5: {
      title:    'Casa de Campo Sierra Juárez',
      cat:      'Residencial',
      year:     '2024',
      location: 'Sierra Juárez, Oax.',
      area:     '320 m²',
      img:      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=85',
      reto:     'Construcción en zona boscosa de la Sierra Juárez, a 2,400 msnm, sin acceso a hormigonera y con restricciones de tala de árboles dentro del predio.',
      solucion: 'Estructura principal de madera laminada encolada de pino de la región, con uniones metálicas precalibradas ensambladas en sitio. Cimentación de concreto ciclópeo vaciado manualmente, usando piedra del lugar. Captación de agua pluvial integrada.',
      tags:     ['Madera laminada', 'Bioclimático', 'Sierra Juárez'],
    },
    c1: {
      title:    'Edificio Corporativo Centro',
      cat:      'Comercial',
      year:     '2023',
      location: 'Centro Histórico, Oax.',
      area:     '3,200 m²',
      img:      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1000&q=85',
      reto:     'Construcción de 8 niveles en zona de valor patrimonial con dictamen del INAH. Restricciones de altura, color de fachada y prohibición de excavaciones profundas en zona de monumentos.',
      solucion: 'Fachada completa en cantera verde local respetando el ritmo y proporción de la traza histórica. Estructura interior de acero independiente que transfiere cargas sin transmitirlas a las colindancias históricas. Cimentación compensada a -4.5m.',
      tags:     ['Patrimonio INAH', '8 niveles', 'Cantera verde'],
    },
    c2: {
      title:    'Plaza Comercial Las Canteras',
      cat:      'Comercial',
      year:     '2022',
      location: 'Oaxaca, Oax.',
      area:     '2,100 m²',
      img:      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&q=85',
      reto:     'Renovación estructural completa de una plaza de los años 80 con 14 locatarios en operación continua. Prohibición de cierres los fines de semana y restricción de ruido de 8am a 2pm.',
      solucion: 'Plan de intervención por etapas semanales con apuntalamiento temporal calculado para cada fase. Trabajo nocturno de 10pm a 6am en zonas críticas. Sustitución de cubierta de losa por estructura metálica con techumbre de policarbonato translúcido.',
      tags:     ['Renovación activa', '14 locatarios', '2,100 m²'],
    },
    c3: {
      title:    'Hotel Boutique El Ángelus',
      cat:      'Comercial',
      year:     '2020',
      location: 'Oaxaca, Oax.',
      area:     '1,500 m²',
      img:      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=85',
      reto:     'Remodelación de casona colonial del siglo XIX para uso hotelero. La estructura original de muros de adobe y madera debía conservarse al 100% según dictamen de INAH.',
      solucion: 'Integración de instalaciones hidráulicas, sanitarias y eléctricas con técnica de restauración: zanjas mínimas, consolidación de muros con inyecciones de cal hidráulica y refuerzo de entrepiso con placa colaborante de mínimo espesor.',
      tags:     ['Restauración siglo XIX', 'Adobe', 'INAH'],
    },
    c4: {
      title:    'Restaurante Tierra Viva',
      cat:      'Comercial',
      year:     '2023',
      location: 'Jalatlaco, Oax.',
      area:     '280 m²',
      img:      'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1000&q=85',
      reto:     'Diseño de terraza cubierta de 280m² sin alterar la estructura centenaria de la casona ni excavar dentro del predio histórico.',
      solucion: 'Estructura metálica autoportante de acero HSS apoyada únicamente sobre cuatro puntos en terreno natural, fuera del área histórica. Cubierta de vidrio templado laminado 8+8mm con tratamiento de control solar. Desmontable sin dejar huella.',
      tags:     ['Terraza autoportante', 'Vidrio templado', 'Desmontable'],
    },
    i1: {
      title:    'Puente Vehicular Etla',
      cat:      'Infraestructura',
      year:     '2021',
      location: 'Etla, Oax.',
      area:     '32 m',
      img:      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=85',
      reto:     'Cruce de 32m sobre río Atoyac con crecidas estacionales de hasta 2.5m, suelo blando de depósito aluvial y carga de diseño para tráfico pesado T3-S2-R4.',
      solucion: 'Superestructura de concreto presforzado con vigas tipo AASHTO Tipo IV. Subestructura sobre pilotes de concreto f\'c=350 kg/cm² de 14m de longitud, colados en sitio con camisa perdida. Protección de taludes con gaviones.',
      tags:     ['Presforzado', 'Pilotes 14m', 'T3-S2-R4'],
    },
    i2: {
      title:    'Carretera Miahuatlán–Pochutla',
      cat:      'Infraestructura',
      year:     '2019',
      location: 'Sierra Sur, Oax.',
      area:     '18 km',
      img:      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1000&q=85',
      reto:     '18 km de trazo en Sierra Sur con taludes de roca fracturada inestable, precipitación media anual de 1,800mm y sin acceso previo de maquinaria pesada.',
      solucion: 'Trazo optimizado para minimizar cortes en roca. Obras de drenaje mayor (alcantarillas de cajón) y menor (cunetas de concreto) en toda la longitud. Muros de mampostería en zonas de derrame. Señalamiento vial y guardavías.',
      tags:     ['18 km', 'Sierra Sur', 'Drenaje pluvial'],
    },
    i3: {
      title:    'Marina y Muelle Turístico Huatulco',
      cat:      'Infraestructura',
      year:     '2022',
      location: 'Huatulco, Oax.',
      area:     '— m²',
      img:      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1000&q=85',
      reto:     'Plataforma costera con suelos granulares saturados y arena no cohesiva a profundidad de desplante. Normativa SEMARNAT de mínimo impacto al ecosistema marino y prohibición de dragado.',
      solucion: 'Pilotes de acero tubular hincados con vibrohammer sin dragado. Tablestacas perimetrales como contención lateral. Plataforma de concreto marino f\'c=350 con inhibidores de corrosión, relación a/c=0.38 y recubrimiento mínimo de 50mm.',
      tags:     ['Concreto marino', 'Pilotes hincados', 'SEMARNAT'],
    },
    i4: {
      title:    'Planta Potabilizadora SAPAO',
      cat:      'Infraestructura',
      year:     '2020',
      location: 'Oaxaca, Oax.',
      area:     '— m²',
      img:      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&q=85',
      reto:     'Diseño civil de cisternas de tratamiento, sedimentación y almacenamiento con capacidad de 5,000 m³ en zona sísmica, con exigencia de impermeabilidad total.',
      solucion: 'Cisternas de concreto armado f\'c=300 con juntas elastoméricas sísmicas cada 15m. Recubrimiento interior con mortero epóxico bicomponente aprobado para agua potable. Muros de 35cm con acero en dos capas.',
      tags:     ['5,000 m³', 'Concreto impermeable', 'SAPAO'],
    },
    ind1: {
      title:    'Nave Industrial Parque Oaxaca',
      cat:      'Industrial',
      year:     '2023',
      location: 'Parque Industrial, Oax.',
      area:     '4,200 m²',
      img:      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=85',
      reto:     'Claros libres de 30m para operación de puentes grúa de 10t y maquinaria de fundición con cargas dinámicas de alta frecuencia.',
      solucion: 'Marcos rígidos de acero A572 Gr50 con análisis de vibración dinámica en estados estacionario y transitorio. Losa industrial de 25cm con fibras de acero Dramix 65/35 y compactación dinámica de suelo base.',
      tags:     ['30m claro libre', 'Puente grúa 10t', '4,200 m²'],
    },
    ind2: {
      title:    'Bodega Agroindustrial Nochixtlán',
      cat:      'Industrial',
      year:     '2021',
      location: 'Nochixtlán, Oax.',
      area:     '1,800 m²',
      img:      'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1000&q=85',
      reto:     'Almacenamiento de granos a granel con carga de piso de 8 t/m² en zona de alta sismicidad (Zona D del Manual de Obras Civiles CFE).',
      solucion: 'Losa industrial de 30cm con fibras metálicas y electromalla de refuerzo. Muros de carga en block de concreto vibrado 20x40x20cm rellenos de concreto y acero vertical. Cimentación corrida con viga de amarre perimetral.',
      tags:     ['8 t/m²', 'Zona sísmica D', 'Block vibrado'],
    },
    ind3: {
      title:    'Planta de Envasado Salina Cruz',
      cat:      'Industrial',
      year:     '2024',
      location: 'Salina Cruz, Oax.',
      area:     '2,600 m²',
      img:      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&q=85',
      reto:     'Ambiente marino con concentración de cloruros de hasta 400 mg/l, temperatura de 38°C y requerimientos de inocuidad alimentaria (NOM-251-SSA1).',
      solucion: 'Estructura de acero galvanizado en caliente con recubrimiento epóxico de dos capas (primer + acabado). Piso de concreto con acabado epóxico sanitario antiderrapante. Sistema de drenaje integral con trampa de grasas y red de agua industrial.',
      tags:     ['Galvanizado caliente', 'NOM-251-SSA1', '2,600 m²'],
    },
    ind4: {
      title:    'Almacén Logístico Istmo',
      cat:      'Industrial',
      year:     '2022',
      location: 'Ixtepec, Oax.',
      area:     '3,400 m²',
      img:      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=85',
      reto:     'Alta sismicidad del Istmo de Tehuantepec (zona de mayor actividad sísmica registrada en México en 2017). Aceleración de diseño de 0.7g.',
      solucion: 'Estructura dual de marcos de acero perimetrales con contravientos concéntricos en X en dos direcciones. Análisis modal espectral dinámico con 15 modos de vibración. Conexiones sismoresistentes precalificadas tipo FR.',
      tags:     ['0.7g aceleración', 'Contravientos X', 'Análisis modal'],
    },
  };

  const modal      = document.getElementById('portfolioModal');
  const modalBody  = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.pf-btn-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.pf-card');
      const id   = card ? card.getAttribute('data-id') : null;
      const data = id ? projectDetails[id] : null;
      if (!data) return;

      modalBody.innerHTML = `
        <div style="height:340px;background-image:url('${data.img}');background-size:cover;background-position:center;border-radius:2px;margin-bottom:32px;"></div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
          <span style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(201,169,110,0.35);padding:3px 10px;border-radius:2px;">${data.cat}</span>
          <span style="font-size:0.7rem;color:var(--muted);">${data.year} · ${data.location} · ${data.area}</span>
        </div>
        <h2 style="font-size:2rem;color:var(--white);margin-bottom:24px;line-height:1.2;">${data.title}</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px;">
          <div>
            <p style="font-size:0.62rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;">Reto Técnico</p>
            <p style="font-size:0.88rem;color:var(--light-2);line-height:1.8;">${data.reto}</p>
          </div>
          <div>
            <p style="font-size:0.62rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;">Solución Aplicada</p>
            <p style="font-size:0.88rem;color:var(--light-2);line-height:1.8;">${data.solucion}</p>
          </div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;padding-top:16px;border-top:1px solid var(--dark-4);">
          ${data.tags.map(t => `<span style="font-size:0.6rem;letter-spacing:0.12em;text-transform:uppercase;padding:4px 10px;background:var(--dark-4);border:1px solid var(--mid);border-radius:2px;color:var(--muted);">${t}</span>`).join('')}
        </div>
        <div style="margin-top:28px;padding-top:20px;border-top:1px solid var(--dark-4);display:flex;justify-content:flex-end;">
          <a href="index.html#contacto" class="btn-primary" style="font-size:0.65rem;">Consultar sobre este tipo de proyecto</a>
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

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });


  // ================================================
  // 6. STICKY CONTROLS — sombra al hacer scroll
  // ================================================
  const pfControls = document.getElementById('pfControls');
  if (pfControls) {
    window.addEventListener('scroll', () => {
      pfControls.style.boxShadow = window.scrollY > 200
        ? '0 4px 24px rgba(0,0,0,0.4)'
        : 'none';
    });
  }

});
