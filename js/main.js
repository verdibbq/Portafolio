const botonMenu = document.querySelector(".boton-menu");
const navegacion = document.querySelector(".navegacion-principal");
const enlacesMenu = document.querySelectorAll(".navegacion-principal a");

function cerrarMenu() {
  botonMenu.setAttribute("aria-expanded", "false");
  botonMenu.setAttribute("aria-label", "Abrir menú de navegación");
  navegacion.dataset.abierto = "false";
  document.body.classList.remove("menu-abierto");
}

function abrirMenu() {
  botonMenu.setAttribute("aria-expanded", "true");
  botonMenu.setAttribute("aria-label", "Cerrar menú de navegación");
  navegacion.dataset.abierto = "true";
  document.body.classList.add("menu-abierto");
}

botonMenu.addEventListener("click", () => {
  const menuEstaAbierto = botonMenu.getAttribute("aria-expanded") === "true";

  if (menuEstaAbierto) {
    cerrarMenu();
  } else {
    abrirMenu();
  }
});

enlacesMenu.forEach((enlace) => {
  enlace.addEventListener("click", cerrarMenu);
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") {
    cerrarMenu();
    botonMenu.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 950) {
    cerrarMenu();
  }
});
