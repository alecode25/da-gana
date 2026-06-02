/* ═══════════════════════════════════════════════════════
   DA GANA – script.js
   Vanilla JS. Nessuna dipendenza esterna.
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ── DATI MENÙ ──────────────────────────────────────────
   Modifica questo array per aggiornare le card senza
   toccare l'HTML. Le card vengono iniettate da renderMenu().
   ─────────────────────────────────────────────────────── */
const piatti = [
  {
    titolo:    'Nidi di Rondine',
    tag:       'Primo',
    desc:      'Sfoglia all\'uovo tirata a mano, ripiena di prosciutto e besciamella, gratinata al forno con ragù romagnolo. Il piatto simbolo della tradizione.',
    prezzo:    '14',
    img:       'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=520&q=75',
    imgAlt:    'Nidi di rondine al forno con ragù romagnolo',
  },
  {
    titolo:    'Cappelletti in Brodo',
    tag:       'Primo',
    desc:      'Cappelletti ripieni di formaggio e carne in brodo di gallina tirato per tutta la mattina. Ricetta della nonna, invariata da sempre.',
    prezzo:    '13',
    img:       'https://images.unsplash.com/photo-1574484284002-952d92456975?w=520&q=75',
    imgAlt:    'Cappelletti in brodo di gallina tradizionali',
  },
  {
    titolo:    'Tagliatelle al Ragù',
    tag:       'Primo',
    desc:      'Sfoglia gialla tirata a mano, tagliata a 8 mm, con ragù di manzo e maiale cotto cinque ore. Semplicità che non mente.',
    prezzo:    '12',
    img:       'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=520&q=75',
    imgAlt:    'Tagliatelle al ragù di carne romagnolo',
  },
  {
    titolo:    'Garganelli al Tartufo Nero',
    tag:       'Primo',
    desc:      'Garganelli rigati artigianali con crema di pecorino e lamelle di tartufo nero dei colli. Stagionale.',
    prezzo:    '16',
    img:       'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=520&q=75',
    imgAlt:    'Garganelli con tartufo nero',
  },
  {
    titolo:    'Coniglio in Porchetta',
    tag:       'Secondo',
    desc:      'Coniglio arrotolato con finocchietto selvatico, aglio e rosmarino, cotto lentamente al forno. La domenica sulle colline.',
    prezzo:    '18',
    img:       'https://images.unsplash.com/photo-1598103442097-8b74394b95c7?w=520&q=75',
    imgAlt:    'Coniglio in porchetta con erbe aromatiche',
  },
  {
    titolo:    'Spiedo della Tradizione',
    tag:       'Secondo',
    desc:      'Misto di carni locali allo spiedo: pollo ruspante, maiale e coniglio, con patate al forno e verdure di stagione.',
    prezzo:    '20',
    img:       'https://images.unsplash.com/photo-1544025162-d76694265947?w=520&q=75',
    imgAlt:    'Spiedo misto di carni allo spiedo',
  },
  {
    titolo:    'Gnocco Fritto e Salumi',
    tag:       'Antipasto',
    desc:      'Gnocco fritto croccante con affettati misti romagnoli: squacquerone, prosciutto crudo, salame nostrano e lonza.',
    prezzo:    '10',
    img:       'https://images.unsplash.com/photo-1533622597524-a1215e26c0a2?w=520&q=75',
    imgAlt:    'Gnocco fritto con salumi e squacquerone romagnolo',
  },
  {
    titolo:    'Crema Fritta della Nonna',
    tag:       'Dolce',
    desc:      'Crema pasticcera alla vaniglia, raffreddata, fritta in pastella leggera e spolverata di zucchero a velo. Il dolce che non stanca mai.',
    prezzo:    '7',
    img:       'https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=520&q=75',
    imgAlt:    'Crema fritta romagnola spolverata di zucchero',
  },
];

/* ── UTILITY: escape HTML ────────────────────────────── */
// Usata prima di inserire dati in innerHTML per evitare XSS.
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── RENDER CARD MENÙ ────────────────────────────────── */
function renderMenu() {
  const griglia = document.getElementById('menu-griglia');
  if (!griglia) return;

  const fragment = document.createDocumentFragment();

  piatti.forEach((p) => {
    const card = document.createElement('article');
    card.className = 'menu-card reveal';
    card.setAttribute('aria-label', p.titolo);

    card.innerHTML = `
      <div class="menu-card-img">
        <img src="${esc(p.img)}" alt="${esc(p.imgAlt)}"
             loading="lazy" width="520" height="300" />
        <span class="menu-card-tag">${esc(p.tag)}</span>
      </div>
      <div class="menu-card-body">
        <h3 class="menu-card-titolo">${esc(p.titolo)}</h3>
        <p class="menu-card-desc">${esc(p.desc)}</p>
        <div class="menu-card-footer">
          <span class="menu-card-prezzo">€&nbsp;${esc(p.prezzo)}</span>
        </div>
      </div>
    `;

    fragment.appendChild(card);
  });

  griglia.appendChild(fragment);

  // Attiva il reveal anche sulle card appena iniettate
  observeReveal(griglia.querySelectorAll('.menu-card.reveal'));
}

/* ── INTERSECTION OBSERVER – scroll reveal ───────────── */
function observeReveal(elements) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -36px 0px' }
  );

  elements.forEach((el) => io.observe(el));
}

/* ── STICKY HEADER ───────────────────────────────────── */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const aggiorna = () => header.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', aggiorna, { passive: true });
  aggiorna(); // stato iniziale
}

/* ── MENU HAMBURGER (mobile) ─────────────────────────── */
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  const apri = () => {
    toggle.classList.add('is-open');
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Chiudi menu');
    document.body.style.overflow = 'hidden';
  };

  const chiudi = () => {
    toggle.classList.remove('is-open');
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Apri menu');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () =>
    menu.classList.contains('is-open') ? chiudi() : apri()
  );

  // Chiudi al clic su un link del menu
  menu.querySelectorAll('.nav-link').forEach((link) =>
    link.addEventListener('click', chiudi)
  );

  // Chiudi con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      chiudi();
      toggle.focus();
    }
  });
}

/* ── PARALLAX LEGGERO ────────────────────────────────── */
function initParallax() {
  // Rispetta la preferenza di riduzione movimento
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const containers = document.querySelectorAll('.parallax-container');
  if (!containers.length) return;

  const onScroll = () => {
    containers.forEach((el) => {
      const img  = el.querySelector('.parallax-img');
      if (!img) return;
      const rect = el.getBoundingClientRect();
      // Salta se fuori viewport
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const offset   = (progress - 0.5) * 90; // range ±45px
      img.style.transform = `translateY(${offset}px)`;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── SMOOTH SCROLL (polyfill per browser vecchi) ─────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offsetHeader = document.getElementById('site-header')?.offsetHeight ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offsetHeader;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ── FORM PRENOTAZIONE ───────────────────────────────── */

/**
 * submitReservation(data)
 *
 * Compone il messaggio e apre WhatsApp con il testo precompilato.
 * Usa mailto come fallback se la finestra WhatsApp viene bloccata.
 *
 * TODO: sostituire il corpo di questa funzione con una chiamata API
 *       reale (es. Plateform, Zucchetti, webhook) senza modificare
 *       la UI o la firma della funzione. Il parametro `data` conterrà
 *       sempre: { nome, telefono, data, ora, coperti, note }.
 *
 * @param {{ nome: string, telefono: string, data: string,
 *            ora: string, coperti: string, note: string }} data
 */
function submitReservation(data) {
  // Formatta la data in italiano (es. "sabato 15 giugno 2024")
  const dataLeggibile = data.data
    ? new Date(data.data + 'T12:00:00').toLocaleDateString('it-IT', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      })
    : data.data;

  const righe = [
    '🍽️ *Richiesta prenotazione – Da Gana*',
    '',
    `👤 Nome: ${data.nome}`,
    `📞 Telefono: ${data.telefono}`,
    `📅 Data: ${dataLeggibile}`,
    `🕐 Orario: ${data.ora}`,
    `👥 Coperti: ${data.coperti}`,
  ];
  if (data.note.trim()) righe.push(`📝 Note: ${data.note.trim()}`);

  const testo = encodeURIComponent(righe.join('\n'));
  const waUrl = `https://wa.me/393926746706?text=${testo}`;

  // Fallback mailto
  const oggettoMail = encodeURIComponent(`Prenotazione Da Gana – ${data.nome}`);
  const mailtoUrl   = `mailto:info@dagana.it?subject=${oggettoMail}&body=${testo}`;

  const waWin = window.open(waUrl, '_blank', 'noopener,noreferrer');

  // Se il popup è stato bloccato, prova con mailto
  if (!waWin || waWin.closed || typeof waWin.closed === 'undefined') {
    window.location.href = mailtoUrl;
  }
}

function initForm() {
  const form = document.getElementById('prenota-form');
  if (!form) return;

  // Imposta la data minima = oggi
  const campoData = form.querySelector('#data');
  if (campoData) {
    campoData.min = new Date().toISOString().split('T')[0];
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Usa la validazione nativa HTML5; mostra i messaggi del browser
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const dati = {
      nome:     form.elements['nome'].value.trim(),
      telefono: form.elements['telefono'].value.trim(),
      data:     form.elements['data'].value,
      ora:      form.elements['ora'].value,
      coperti:  form.elements['coperti'].value,
      note:     form.elements['note'].value,
    };

    submitReservation(dati);
    savePrenotazioneLocale(dati);
  });
}

/* ── SALVA IN LOCALE (per il gestionale) ─────────────── */
function savePrenotazioneLocale(dati) {
  const KEY = 'dagana_prenotazioni';
  let lista = [];
  try { lista = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e) {}
  lista.push({
    id:         Math.random().toString(36).slice(2, 9),
    nome:       dati.nome,
    telefono:   dati.telefono,
    data:       dati.data,
    ora:        dati.ora,
    coperti:    dati.coperti,
    note:       dati.note,
    stato:      'in_attesa',
    creata_il:  new Date().toISOString(),
  });
  localStorage.setItem(KEY, JSON.stringify(lista));
}

/* ── INIT ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderMenu();           // Inietta le card nel DOM prima di osservare
  initStickyHeader();
  initMobileMenu();
  initParallax();
  initSmoothScroll();
  initForm();

  // Attiva il reveal su tutti gli elementi .reveal già presenti nell'HTML
  observeReveal(document.querySelectorAll('.reveal'));
});
