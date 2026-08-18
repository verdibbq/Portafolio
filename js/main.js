const botonMenu = document.querySelector(".boton-menu");
const navegacion = document.querySelector(".navegacion-principal");
const enlacesMenu = document.querySelectorAll(".navegacion-principal a");

// Menú responsive

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

// Filtros de proyectos
const botonesFiltro = document.querySelectorAll(".filtro-proyecto");
const proyectos = document.querySelectorAll(".tarjeta-proyecto");
const resultadoFiltros = document.querySelector("#resultado-filtros");

botonesFiltro.forEach((boton) => {
  boton.addEventListener("click", () => {
    const filtroElegido = boton.dataset.filtro;
    let proyectosVisibles = 0;

    botonesFiltro.forEach((otroBoton) => {
      const estaActivo = otroBoton === boton;
      otroBoton.classList.toggle("activo", estaActivo);
      otroBoton.setAttribute("aria-pressed", estaActivo);
    });

    proyectos.forEach((proyecto) => {
      const mostrar =
        filtroElegido === "todos" || proyecto.dataset.categoria === filtroElegido;

      proyecto.hidden = !mostrar;

      if (mostrar) {
        proyectosVisibles += 1;
      }
    });

    const palabraProyecto = proyectosVisibles === 1 ? "proyecto" : "proyectos";
    resultadoFiltros.textContent = `${proyectosVisibles} ${palabraProyecto} visibles`;
  });
});

// Copiar el correo de contacto
const botonCopiarCorreo = document.querySelector("#boton-copiar-correo");
const mensajeCopia = document.querySelector("#mensaje-copia");

botonCopiarCorreo.addEventListener("click", async () => {
  const correo = botonCopiarCorreo.dataset.correo;

  try {
    await navigator.clipboard.writeText(correo);
    botonCopiarCorreo.textContent = "Correo copiado";
    mensajeCopia.textContent = "Listo, ya podés pegarlo donde quieras.";
  } catch {
    mensajeCopia.textContent = `No se pudo copiar automáticamente: ${correo}`;
  }

  setTimeout(() => {
    botonCopiarCorreo.textContent = "Copiar correo";
    mensajeCopia.textContent = correo;
  }, 2500);
});

// Formulario sin backend: prepara un correo con los datos ingresados
const formularioContacto = document.querySelector("#formulario-contacto");
const mensajeFormulario = document.querySelector("#mensaje-formulario");

formularioContacto.addEventListener("submit", (evento) => {
  evento.preventDefault();
  formularioContacto.classList.add("formulario-revisado");

  if (!formularioContacto.checkValidity()) {
    mensajeFormulario.textContent = "Revisá los campos antes de continuar.";
    formularioContacto.reportValidity();
    return;
  }

  const datos = new FormData(formularioContacto);
  const nombre = datos.get("nombre");
  const correo = datos.get("correo");
  const mensaje = datos.get("mensaje");
  const asunto = encodeURIComponent(`Consulta web de ${nombre}`);
  const cuerpo = encodeURIComponent(
    `Hola Agustín, soy ${nombre}.\n\n${mensaje}\n\nMi correo de contacto es: ${correo}`
  );

  mensajeFormulario.textContent = "Abriendo tu aplicación de correo...";
  window.location.href = `mailto:verdicodesoporte@gmail.com?subject=${asunto}&body=${cuerpo}`;
});
