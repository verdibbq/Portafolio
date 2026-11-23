document.documentElement.classList.add("js");

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
  const menuEstaAbierto = botonMenu.getAttribute("aria-expanded") === "true";

  if (evento.key === "Escape" && menuEstaAbierto) {
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

const URL_FORMULARIO = "https://formspree.io/f/TU_CODIGO";

formularioContacto.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  formularioContacto.classList.add("formulario-revisado");

  if (!formularioContacto.checkValidity()) {
    mensajeFormulario.textContent = "Revisá los campos antes de continuar.";
    formularioContacto.reportValidity();
    return;
  }

  const botonEnviar = formularioContacto.querySelector('button[type="submit"]');
  botonEnviar.disabled = true;
  mensajeFormulario.textContent = "Enviando...";

  try {
    const respuesta = await fetch(URL_FORMULARIO, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(formularioContacto),
    });

    if (!respuesta.ok) throw new Error("Error al enviar");

    mensajeFormulario.textContent = "¡Mensaje enviado! Te respondo pronto.";
    formularioContacto.reset();
    formularioContacto.classList.remove("formulario-revisado");
  } catch (error) {
    mensajeFormulario.textContent =
      "No se pudo enviar. Escribime a verdicodesoporte@gmail.com";
  } finally {
    botonEnviar.disabled = false;
  }
});

// Calculadora de cotización
// Todos los valores se modifican desde este único objeto.
const configuracionPrecios = {
  moneda: "USD",
  configuracionMoneda: "es-AR",
  tiposPagina: {
    landing: {
      nombre: "Landing page",
      precioBase: 60,
      funcionalidadesIncluidas: ["htmlCss", "responsive", "formulario"],
    },
    portfolio: {
      nombre: "Portafolio personal",
      precioBase: 250,
      funcionalidadesIncluidas: [
        "htmlCss",
        "responsive",
        "javascript",
        "formulario",
        "animaciones",
      ],
    },
    presentacion: {
      nombre: "Web de presentación",
      precioBase: 120,
      funcionalidadesIncluidas: [
        "htmlCss",
        "responsive",
        "javascript",
        "formulario",
      ],
    },
    personalizada: {
      nombre: "Página personalizada",
      precioBase: 300,
      funcionalidadesIncluidas: ["htmlCss", "responsive", "javascript"],
    },
  },
  seccionesIncluidas: 2,
  precioSeccionAdicional: 20,
  funcionalidades: {
    htmlCss: { nombre: "HTML y CSS", precio: 50 },
    responsive: { nombre: "Diseño responsive", precio: 20 },
    javascript: { nombre: "JavaScript", precio: 50 },
    formulario: { nombre: "Formularios", precio: 15 },
    animaciones: { nombre: "Animaciones", precio: 35 },
    integraciones: { nombre: "Integraciones externas", precio: 70 },
    tresD: { nombre: "Elemento 3D", precio: 70 },
  },
  precioRevisionAdicional: 25,
  urgencias: {
    normal: { nombre: "Tiempo flexible", multiplicador: 1 },
    prioridad: { nombre: "Entrega prioritaria", multiplicador: 1.2 },
    urgente: { nombre: "Entrega urgente", multiplicador: 1.85 },
  },
};

const formularioCotizacion = document.querySelector("#formulario-cotizacion");
const precioEstimado = document.querySelector("#precio-estimado");
const desgloseCotizacion = document.querySelector("#desglose-cotizacion");
const selectorTipoPagina = document.querySelector("#tipo-pagina");
const opcionesFuncionalidades = document.querySelectorAll(
  'input[name="funcionalidades"]'
);
const mensajeConfiguracion = document.querySelector("#mensaje-configuracion");
const formatoMoneda = new Intl.NumberFormat(
  configuracionPrecios.configuracionMoneda,
  {
    style: "currency",
    currency: configuracionPrecios.moneda,
    maximumFractionDigits: 0,
  }
);

function agregarDetalleCotizacion(nombre, precio) {
  const detalle = document.createElement("li");
  const texto = document.createElement("span");
  const valor = document.createElement("strong");

  texto.textContent = nombre;
  valor.textContent = formatoMoneda.format(precio);
  detalle.append(texto, valor);
  desgloseCotizacion.append(detalle);
}

function configurarFuncionalidadesPorTipo() {
  const pagina = configuracionPrecios.tiposPagina[selectorTipoPagina.value];
  const funcionalidadesIncluidas = pagina.funcionalidadesIncluidas;

  opcionesFuncionalidades.forEach((opcion) => {
    opcion.checked = funcionalidadesIncluidas.includes(opcion.value);
  });

  const nombresFuncionalidades = funcionalidadesIncluidas.map(
    (clave) => configuracionPrecios.funcionalidades[clave].nombre
  );

  mensajeConfiguracion.textContent =
    `${pagina.nombre} incluye automáticamente: ` +
    `${nombresFuncionalidades.join(", ")}. Podés modificar las opciones.`;

  calcularCotizacion();
}

function calcularCotizacion() {
  const datos = new FormData(formularioCotizacion);
  const tipoElegido = datos.get("tipoPagina");
  const pagina = configuracionPrecios.tiposPagina[tipoElegido];
  const secciones = Math.max(1, Number(datos.get("secciones")) || 1);
  const revisiones = Math.max(0, Number(datos.get("revisiones")) || 0);
  const urgenciaElegida = datos.get("urgencia");
  const urgencia = configuracionPrecios.urgencias[urgenciaElegida];

  desgloseCotizacion.innerHTML = "";

  let subtotal = pagina.precioBase;
  agregarDetalleCotizacion(`Base · ${pagina.nombre}`, pagina.precioBase);

  const seccionesAdicionales = Math.max(
    0,
    secciones - configuracionPrecios.seccionesIncluidas
  );
  const precioSecciones =
    seccionesAdicionales * configuracionPrecios.precioSeccionAdicional;

  if (seccionesAdicionales > 0) {
    subtotal += precioSecciones;
    agregarDetalleCotizacion(
      `${seccionesAdicionales} secciones adicionales`,
      precioSecciones
    );
  }

  const funcionalidadesElegidas = datos.getAll("funcionalidades");

  funcionalidadesElegidas.forEach((clave) => {
    const funcionalidad = configuracionPrecios.funcionalidades[clave];
    subtotal += funcionalidad.precio;
    agregarDetalleCotizacion(funcionalidad.nombre, funcionalidad.precio);
  });

  if (revisiones > 0) {
    const precioRevisiones =
      revisiones * configuracionPrecios.precioRevisionAdicional;
    subtotal += precioRevisiones;
    agregarDetalleCotizacion(
      `${revisiones} revisiones adicionales`,
      precioRevisiones
    );
  }

  const total = subtotal * urgencia.multiplicador;
  const adicionalUrgencia = total - subtotal;

  if (adicionalUrgencia > 0) {
    agregarDetalleCotizacion(urgencia.nombre, adicionalUrgencia);
  }

  precioEstimado.textContent = formatoMoneda.format(total);
  precioEstimado.classList.remove("precio-actualizado");
  void precioEstimado.offsetWidth;
  precioEstimado.classList.add("precio-actualizado");
}

formularioCotizacion.addEventListener("input", (evento) => {
  if (evento.target !== selectorTipoPagina) {
    calcularCotizacion();
  }
});

selectorTipoPagina.addEventListener("change", configurarFuncionalidadesPorTipo);

formularioCotizacion.addEventListener("submit", (evento) => {
  evento.preventDefault();
  calcularCotizacion();
});

formularioCotizacion.addEventListener("reset", () => {
  setTimeout(configurarFuncionalidadesPorTipo, 0);
});

configurarFuncionalidadesPorTipo();

// Aparición suave de elementos al recorrer la página
const elementosAnimados = document.querySelectorAll(
  ".encabezado-seccion, .tarjeta, .tarjeta-proyecto, .lista-proceso li, " +
    ".formulario-cotizacion fieldset, .resultado-cotizacion, .formulario-contacto"
);
const reducirMovimiento = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Personaje 3D: animación tranquila y un saludo al presionar el botón
const personajeVerdi = document.querySelector("#personaje-verdi");
const botonSaludarZorro = document.querySelector("#boton-saludar-zorro");
const ayudaPersonaje = document.querySelector("#ayuda-personaje");
const DURACION_SALUDO = 1800;
let saludoActivo = false;
let temporizadorSaludo;

function finalizarSaludoZorro() {
  if (!personajeVerdi || !saludoActivo) {
    return;
  }

  clearTimeout(temporizadorSaludo);
  saludoActivo = false;
  personajeVerdi.animationName = "Reposo";
  personajeVerdi.currentTime = 0;

  if (!reducirMovimiento) {
    personajeVerdi.play();
  }

  botonSaludarZorro.disabled = false;
  ayudaPersonaje.textContent = "Arrastralo para mirarlo o volvé a saludarlo.";
}

function reproducirSaludoZorro() {
  if (!personajeVerdi || !personajeVerdi.loaded || saludoActivo) {
    return;
  }

  saludoActivo = true;
  personajeVerdi.animationName = "Saludo";
  personajeVerdi.currentTime = 0;
  personajeVerdi.play({ repetitions: 1 });
  botonSaludarZorro.disabled = true;
  ayudaPersonaje.textContent = "El zorro te está saludando.";
  temporizadorSaludo = setTimeout(finalizarSaludoZorro, DURACION_SALUDO);
}

personajeVerdi?.addEventListener("load", () => {
  botonSaludarZorro.disabled = false;

  if (reducirMovimiento) {
    personajeVerdi.pause();
  }
});

personajeVerdi?.addEventListener("finished", () => {
  finalizarSaludoZorro();
});

personajeVerdi?.addEventListener("error", () => {
  botonSaludarZorro.hidden = true;
  ayudaPersonaje.textContent =
    "Se muestra la imagen alternativa.";
});

botonSaludarZorro?.addEventListener("click", reproducirSaludoZorro);

elementosAnimados.forEach((elemento, indice) => {
  elemento.classList.add("animar-entrada");
  elemento.style.setProperty("--demora", `${(indice % 4) * 70}ms`);
});

if (reducirMovimiento || !("IntersectionObserver" in window)) {
  elementosAnimados.forEach((elemento) => {
    elemento.classList.add("elemento-visible");
  });
} else {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("elemento-visible");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  elementosAnimados.forEach((elemento) => observador.observe(elemento));
}

// Barra que indica cuánto falta para llegar al final de la página
const barraProgreso = document.querySelector("#barra-progreso");
let actualizacionPendiente = false;

function actualizarProgresoPagina() {
  const alturaDisponible = document.documentElement.scrollHeight - window.innerHeight;
  const progreso = alturaDisponible > 0 ? window.scrollY / alturaDisponible : 0;
  const progresoLimitado = Math.min(1, Math.max(0, progreso));

  barraProgreso.style.transform = `scaleX(${progresoLimitado})`;
  actualizacionPendiente = false;
}

function solicitarActualizacionProgreso() {
  if (!actualizacionPendiente) {
    requestAnimationFrame(actualizarProgresoPagina);
    actualizacionPendiente = true;
  }
}

window.addEventListener("scroll", solicitarActualizacionProgreso, { passive: true });
window.addEventListener("resize", solicitarActualizacionProgreso);
actualizarProgresoPagina();
