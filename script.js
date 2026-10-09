// Alternância de tema claro/escuro
const themeToggle = document.getElementById('themeToggle');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

const syncThemeUi = () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  themeToggle?.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  themeColorMeta?.setAttribute('content', isDark ? '#15100A' : '#FFF8E9');
};
syncThemeUi();

themeToggle?.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  syncThemeUi();
  try {
    localStorage.setItem('da-terra-theme', next);
  } catch (e) {
    // Armazenamento bloqueado: o tema vale só para esta visita
  }
});

// Navbar com sombra ao rolar
const navbar = document.getElementById('navbar');
const toggleNavbarScrolled = () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 10);
};
toggleNavbarScrolled();
window.addEventListener('scroll', toggleNavbarScrolled, { passive: true });

// Menu mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

const setMenuOpen = (open) => {
  navLinks?.classList.toggle('open', open);
  hamburger?.setAttribute('aria-expanded', open ? 'true' : 'false');
  hamburger?.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
};

hamburger?.addEventListener('click', () => {
  setMenuOpen(!navLinks.classList.contains('open'));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});

// Fecha o menu com Esc ou ao tocar fora dele
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks?.classList.contains('open')) {
    setMenuOpen(false);
    hamburger?.focus();
  }
});

document.addEventListener('click', (e) => {
  if (navLinks?.classList.contains('open') && !navbar.contains(e.target)) {
    setMenuOpen(false);
  }
});

// Revelar seções ao rolar
const revealTargets = document.querySelectorAll('.section, .hero-inner');

if ('IntersectionObserver' in window) {
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px -10% 0px' }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

// Cards de produto: clicar vira o card e mostra a foto do sabor
const productCards = document.querySelectorAll('.product-card');

productCards.forEach((card) => {
  const toggleFlip = () => {
    const flipped = card.classList.toggle('flipped');
    card.setAttribute('aria-pressed', flipped ? 'true' : 'false');
  };

  card.addEventListener('click', toggleFlip);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip();
    }
  });
});

// Foto de sabor que não carregar mostra "Foto em breve" no verso do card
document.querySelectorAll('.product-photo').forEach((img) => {
  const markMissing = () => img.parentElement.classList.add('photo-missing');
  if (img.complete && img.naturalWidth === 0) markMissing();
  img.addEventListener('error', markMissing);
});

// Formulário de contato: encaminha para o WhatsApp da Da Terra
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const WHATSAPP_NUMBER = '5582981177313';

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  // Honeypot: campo invisível que só bots preenchem
  const honeypot = document.getElementById('website');
  if (honeypot && honeypot.value.trim() !== '') {
    form.reset();
    return;
  }

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !email || !mensagem) {
    formNote.textContent = 'Preencha nome, e-mail e mensagem para continuar.';
    return;
  }

  const texto = `Olá! Meu nome é ${nome} (${email}).\n\n${mensagem}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;

  formNote.textContent = 'Abrindo o WhatsApp para você enviar sua mensagem...';
  window.open(url, '_blank', 'noopener');
  form.reset();
});

// Ano do rodapé
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mapa dos parceiros: tocar num parceiro mostra o local no mapa
const partnerMap = document.getElementById('partnerMap');
const mapOpen = document.getElementById('mapOpen');
const mapPlaces = document.querySelectorAll('.map-place');

if (partnerMap) {
  mapPlaces.forEach((place) => {
    place.addEventListener('click', (e) => {
      e.preventDefault();
      partnerMap.src = 'https://www.google.com/maps?q=' + encodeURIComponent(place.dataset.query) + '&output=embed';
      if (mapOpen) mapOpen.href = place.href;
      mapPlaces.forEach((p) => {
        if (p === place) p.setAttribute('aria-current', 'true');
        else p.removeAttribute('aria-current');
      });
    });
  });
}
