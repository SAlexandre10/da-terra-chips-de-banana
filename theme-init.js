// Aplica o tema salvo (ou o do sistema) antes da página aparecer, evitando "piscar" o tema errado
(function () {
  var stored = null;
  try {
    stored = localStorage.getItem('da-terra-theme');
  } catch (e) {
    // Navegação privada ou armazenamento bloqueado: segue com o tema do sistema
  }
  var theme = stored === 'dark' || stored === 'light'
    ? stored
    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();
