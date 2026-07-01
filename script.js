// Menu mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
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

// Formulário de contato (sem backend configurado ainda)
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = 'Mensagem pronta! Conecte este formulário a um serviço como Formspree para receber os envios por e-mail.';
  form.reset();
});

// Ano do rodapé
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
