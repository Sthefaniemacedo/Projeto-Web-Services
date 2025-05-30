const conteudo = document.getElementById("conteudo");

document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll(".nav-link");

  menuLinks.forEach(link => {
    link.addEventListener("click", function(event) {
      const pagina = this.getAttribute("data-pagina");

      if(pagina){ // Só previne e carrega conteúdo se tiver data-pagina definido
        event.preventDefault();

        menuLinks.forEach(l => l.classList.remove("selected"));
        this.classList.add("selected");

        fetch(pagina)
          .then(response => {
            if(!response.ok) throw new Error("Erro ao carregar a página");
            return response.text();
          })
          .then(html => {
            conteudo.innerHTML = html;
          })
          .catch(error => {
            conteudo.innerHTML = "<p>Erro ao carregar o conteúdo.</p>";
          });
      }
      // Se não tiver data-pagina, deixa o link funcionar normalmente
    });
  });

  // Carrega pedidos.html por padrão
  fetch("pedidos.html")
    .then(response => {
      if(!response.ok) throw new Error("Erro ao carregar a página");
      return response.text();
    })
    .then(html => {
      conteudo.innerHTML = html;
      menuLinks.forEach(l => l.classList.remove("selected"));
      const linkPedidos = Array.from(menuLinks).find(link => link.getAttribute("data-pagina") === "pedidos.html");
      if(linkPedidos) linkPedidos.classList.add("selected");
    })
    .catch(error => {
      conteudo.innerHTML = "<p>Erro ao carregar o conteúdo.</p>";
    });
});