/**
 * Função para carregar arquivos HTML de forma assíncrona dentro de um elemento específico.
 */
async function loadFragment(selector, file) {
  try {
    const element = document.querySelector(selector);
    const response = await fetch(file);
    if (response.ok) {
      element.innerHTML = await response.text();

      if (selector === "header") {
        initializeDarkModeButton();
        enableSmoothScrolling();
      }

    } else {
      console.error(`Erro ao carregar ${file}: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Erro ao processar ${file}:`, error);
  }
}

/**
 * Inicializa o botão de Dark Mode após o carregamento do header.
 */
function initializeDarkModeButton() {
  const toggleButton = document.getElementById("darkModeButton");

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }
}

/**
 * Adiciona rolagem suave ao clicar nos links do menu.
 */
function enableSmoothScrolling() {
  document.querySelectorAll('.nav-menu a[href^="#"], .home-link').forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = link.getAttribute("href");
      let targetElement;

      // Se for o botão "Home", rola para o topo
      if (link.classList.contains("home-link")) {
        targetElement = document.body;
      } else {
        targetElement = document.querySelector(targetId);
      }

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 50,
          behavior: "smooth"
        });
      }
    });
  });
}


// Carregar header, footer e seções ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
  loadFragment("header", "header.html");
  loadFragment("footer", "footer.html");
  loadFragment("#sobre", "about.html");
  loadFragment("#projetos", "projects.html");
  loadFragment("#contato", "contact.html");
});
