/* =============================================
   MAROUAN MABROUK — PORTFOLIO JS
   ============================================= */

'use strict';

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 2000);
});

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
const handleNavScroll = () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};
window.addEventListener('scroll', handleNavScroll, { passive: true });

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger?.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── PROJECT FILTERS ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const cat = card.dataset.category;
      if (filter === 'all' || cat === filter) {
        card.style.opacity = '1';
        card.style.transform = '';
        card.style.display = '';
      } else {
        card.style.opacity = '0.25';
        card.style.transform = 'scale(0.97)';
      }
    });
  });
});

/* ── MODAL DATA ── */
const modalData = {
  project1: {
    title: 'Restaurant Brand System',
    category: 'Branding',
    description: 'A comprehensive brand identity developed for a local dining concept. The project encompassed logo design, color palette definition, typography selection, and all primary touchpoints including menu design, packaging, and digital presence.',
    tags: ['Logo Design', 'Color System', 'Typography', 'Menu Design', 'Brand Guidelines']
  },
  project2: {
    title: 'Personal Logo System',
    category: 'Visual Identity',
    description: 'Development of a personal brand mark from concept to final execution. The process included competitor analysis, concept sketching, digital refinement, and production of a comprehensive brand guidelines document ensuring consistent application.',
    tags: ['Brand Mark', 'Identity System', 'Guidelines', 'Vector Design']
  },
  project3: {
    title: 'Social Media Strategy',
    category: 'Content Strategy',
    description: 'A structured editorial calendar and visual content system designed to build consistent brand presence across social platforms. Includes messaging pillars, visual templates, and posting cadence aligned with business objectives.',
    tags: ['Editorial Calendar', 'Content Pillars', 'Visual Templates', 'Strategy']
  },
  project4: {
    title: 'Café Visual Identity',
    category: 'Restaurant Branding',
    description: 'End-to-end visual identity for a café concept — from brand positioning to final collateral. Included menu design, storefront signage concepts, loyalty card design, and social media visual language development.',
    tags: ['Menu Design', 'Signage', 'Brand Collateral', 'Social Visuals']
  },
  project5: {
    title: 'Business Stationery',
    category: 'Branding',
    description: 'A professional stationery suite designed to reinforce brand credibility in B2B communications. Includes business cards, letterhead, envelope design, and presentation templates maintaining strict visual consistency.',
    tags: ['Business Cards', 'Letterhead', 'Brand Consistency', 'Print Design']
  },
  project6: {
    title: 'Typography & Color System',
    category: 'Visual Identity',
    description: 'A comprehensive brand language documentation project defining typography scale, color system, spacing rules, and usage guidelines for a multi-platform brand. Built to ensure consistency across all touchpoints.',
    tags: ['Typography', 'Color Palette', 'Design System', 'Brand Guidelines']
  }
};

/* ── MODAL OPEN / CLOSE ── */
function openModal(id) {
  const data = modalData[id];
  if (!data) return;
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <span class="modal-cat">${data.category}</span>
    <h2>${data.title}</h2>
    <p>${data.description}</p>
    <div class="modal-tags">${data.tags.map(t => `<span>${t}</span>`).join('')}</div>
  `;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Expose globally
window.openModal = openModal;
window.closeModal = closeModal;

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ── SMOOTH ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── CURSOR GLOW (desktop only) ── */
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%);
    pointer-events: none; z-index: 1; transform: translate(-50%, -50%);
    transition: opacity 0.3s;
  `;
  document.body.appendChild(glow);

  let cx = 0, cy = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });

  const animGlow = () => {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    glow.style.left = cx + 'px';
    glow.style.top = cy + 'px';
    requestAnimationFrame(animGlow);
  };
  animGlow();
}

/* ── PARALLAX HERO ── */
const hero = document.getElementById('hero');
if (hero && window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const content = hero.querySelector('.hero-content');
    const portrait = hero.querySelector('.hero-portrait');
    if (content) content.style.transform = `translateY(${scrolled * 0.12}px)`;
    if (portrait) portrait.style.transform = `translateY(calc(-50% + ${scrolled * 0.06}px))`;
  }, { passive: true });
}