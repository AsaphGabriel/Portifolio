/**
 * 
 */
async function loadFragment(selector, file) {
  try {
    const element = document.querySelector(selector);
    const response = await fetch(file);
    if (response.ok) {
      element.innerHTML = await response.text();

      // Inicializa o botão de dark mode após carregar o header
      if (selector === "header") {
        initializeDarkModeButton(); // Mova a lógica aqui
      }

    } else {
      console.error("Erro ao carregar ${file}: ${response.statusText}");
    }
  } catch (error) {
    console.error("Erro ao processar ${file}:", error);
  }
}

// Função para inicializar o botão de dark mode
function initializeDarkModeButton() {
  const toggleButton = document.getElementById("darkModeButton");

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }
}

// Carregar header, footer e conteúdo principal ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
  loadFragment("header", "header.html"); // Carrega o header
  loadFragment("footer", "footer.html"); // Carrega o footer
  loadFragment("#content", "projects.html"); // Conteúdo da página (ajuste conforme necessário)
});