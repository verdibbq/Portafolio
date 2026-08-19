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

// Calculadora de cotización
// Todos los valores se modifican desde este único objeto.
const configuracionPrecios = {
  moneda: "USD",
  configuracionMoneda: "es-AR",
  tiposPagina: {
    landing: { nombre: "Landing page", precioBase: 120 },
    portfolio: { nombre: "Portafolio personal", precioBase: 180 },
    presentacion: { nombre: "Web de presentación", precioBase: 220 },
    personalizada: { nombre: "Página personalizada", precioBase: 300 },
  },
  seccionesIncluidas: 3,
  precioSeccionAdicional: 20,
  tarifaHora: 10,
  funcionalidades: {
    htmlCss: { nombre: "HTML y CSS", precio: 90 },
    responsive: { nombre: "Diseño responsive", precio: 60 },
    javascript: { nombre: "JavaScript", precio: 75 },
    formulario: { nombre: "Formularios", precio: 45 },
    animaciones: { nombre: "Animaciones", precio: 55 },
    integraciones: { nombre: "Integraciones externas", precio: 70 },
    tresD: { nombre: "Elemento 3D", precio: 240 },
  },
  precioRevisionAdicional: 25,
  urgencias: {
    normal: { nombre: "Tiempo normal", multiplicador: 1 },
    prioridad: { nombre: "Entrega prioritaria", multiplicador: 1.2 },
    urgente: { nombre: "Entrega urgente", multiplicador: 1.45 },
  },
};

const formularioCotizacion = document.querySelector("#formulario-cotizacion");
const precioEstimado = document.querySelector("#precio-estimado");
const desgloseCotizacion = document.querySelector("#desglose-cotizacion");
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

function calcularCotizacion() {
  const datos = new FormData(formularioCotizacion);
  const tipoElegido = datos.get("tipoPagina");
  const pagina = configuracionPrecios.tiposPagina[tipoElegido];
  const secciones = Math.max(1, Number(datos.get("secciones")) || 1);
  const horas = Math.max(0, Number(datos.get("horas")) || 0);
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

  const precioHoras = horas * configuracionPrecios.tarifaHora;
  subtotal += precioHoras;
  agregarDetalleCotizacion(`${horas} horas estimadas`, precioHoras);

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

formularioCotizacion.addEventListener("input", calcularCotizacion);

formularioCotizacion.addEventListener("submit", (evento) => {
  evento.preventDefault();
  calcularCotizacion();
});

formularioCotizacion.addEventListener("reset", () => {
  setTimeout(calcularCotizacion, 0);
});

calcularCotizacion();

// Aparición suave de elementos al recorrer la página
const elementosAnimados = document.querySelectorAll(
  ".encabezado-seccion, .tarjeta, .tarjeta-proyecto, .lista-proceso li, " +
    ".formulario-cotizacion fieldset, .resultado-cotizacion, .formulario-contacto"
);
const reducirMovimiento = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

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
