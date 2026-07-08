// Alternância de tema claro/escuro
const themeToggle = document.getElementById('themeToggle');
themeToggle?.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('da-terra-theme', next);
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

hamburger?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  hamburger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    hamburger?.setAttribute('aria-label', 'Abrir menu');
  });
});

// Revelar seções ao rolar
const revealTargets = document.querySelectorAll('.section, .hero-inner');
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
  { threshold: 0.12 }
);

revealTargets.forEach((el) => observer.observe(el));

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

// Formulário de contato: encaminha para o WhatsApp da Da Terra
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const WHATSAPP_NUMBER = '5582996177313';

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  const texto = `Olá! Meu nome é ${nome} (${email}).\n\n${mensagem}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;

  formNote.textContent = 'Abrindo o WhatsApp para você enviar sua mensagem...';
  window.open(url, '_blank', 'noopener');
  form.reset();
});

// Ano do rodapé
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
