// Cambiá los precios solamente en este objeto.
const CONFIGURACION_PRECIOS = {
  moneda: "USD",
  configuracionFormato: {
    locale: "es-AR",
    maximoDecimales: 0,
  },
  tiposPagina: {
    landing: { nombre: "Landing page", precioBase: 180, seccionesIncluidas: 4 },
    institucional: { nombre: "Web de presentación", precioBase: 320, seccionesIncluidas: 5 },
    portafolio: { nombre: "Portafolio", precioBase: 250, seccionesIncluidas: 5 },
    tienda: { nombre: "Tienda básica", precioBase: 520, seccionesIncluidas: 6 },
  },
  costoSeccionAdicional: 35,
  tarifaPorHora: 12,
  funciones: {
    javascript: { nombre: "JavaScript", precio: 120 },
    formulario: { nombre: "Formulario", precio: 70 },
    animaciones: { nombre: "Animaciones", precio: 60 },
    integraciones: { nombre: "Integraciones", precio: 130 },
    tresD: { nombre: "Elemento 3D", precio: 260 },
  },
  revisionesIncluidas: 2,
  costoRevisionAdicional: 40,
  multiplicadoresUrgencia: {
    normal: 1,
    prioritaria: 1.25,
    urgente: 1.5,
  },
  margenRango: 0.1,
};

const formularioCotizacion = document.querySelector("#formulario-cotizacion");
const precioEstimado = document.querySelector("#precio-estimado");
const rangoEstimado = document.querySelector("#rango-estimado");
const desgloseCotizacion = document.querySelector("#desglose-cotizacion");
const botonReiniciar = document.querySelector("#reiniciar-cotizacion");

const formateadorMoneda = new Intl.NumberFormat(CONFIGURACION_PRECIOS.configuracionFormato.locale, {
  style: "currency",
  currency: CONFIGURACION_PRECIOS.moneda,
  maximumFractionDigits: CONFIGURACION_PRECIOS.configuracionFormato.maximoDecimales,
});

function limitarNumero(valor, minimo, maximo) {
  const numero = Number(valor);
  if (Number.isNaN(numero)) return minimo;
  return Math.min(Math.max(numero, minimo), maximo);
}

function calcularCotizacion(datosFormulario) {
  const tipoElegido = datosFormulario.get("tipoPagina");
  const datosTipo = CONFIGURACION_PRECIOS.tiposPagina[tipoElegido];
  const cantidadSecciones = limitarNumero(datosFormulario.get("secciones"), 1, 20);
  const horasEstimadas = limitarNumero(datosFormulario.get("horas"), 0, 300);
  const revisiones = limitarNumero(datosFormulario.get("revisiones"), 0, 10);
  const urgencia = datosFormulario.get("urgencia");

  const seccionesAdicionales = Math.max(cantidadSecciones - datosTipo.seccionesIncluidas, 0);
  const costoSecciones = seccionesAdicionales * CONFIGURACION_PRECIOS.costoSeccionAdicional;
  const costoHoras = horasEstimadas * CONFIGURACION_PRECIOS.tarifaPorHora;
  const revisionesAdicionales = Math.max(revisiones - CONFIGURACION_PRECIOS.revisionesIncluidas, 0);
  const costoRevisiones = revisionesAdicionales * CONFIGURACION_PRECIOS.costoRevisionAdicional;

  const funcionesElegidas = datosFormulario.getAll("funciones");
  const costoFunciones = funcionesElegidas.reduce((total, funcion) => {
    return total + CONFIGURACION_PRECIOS.funciones[funcion].precio;
  }, 0);

  const subtotal = datosTipo.precioBase + costoSecciones + costoHoras + costoFunciones + costoRevisiones;
  const multiplicador = CONFIGURACION_PRECIOS.multiplicadoresUrgencia[urgencia];
  const total = Math.round(subtotal * multiplicador);

  return {
    datosTipo,
    costoSecciones,
    costoFunciones,
    costoHoras,
    costoRevisiones,
    multiplicador,
    total,
  };
}

function mostrarCotizacion(resultado) {
  const minimo = Math.round(resultado.total * (1 - CONFIGURACION_PRECIOS.margenRango));
  const maximo = Math.round(resultado.total * (1 + CONFIGURACION_PRECIOS.margenRango));
  const valoresDesglose = [
    resultado.datosTipo.precioBase,
    resultado.costoSecciones,
    resultado.costoFunciones,
    resultado.costoHoras,
    resultado.costoRevisiones,
    `× ${resultado.multiplicador}`,
  ];

  precioEstimado.textContent = formateadorMoneda.format(resultado.total);
  rangoEstimado.textContent = `Rango aproximado: ${formateadorMoneda.format(minimo)} a ${formateadorMoneda.format(maximo)}`;

  desgloseCotizacion.querySelectorAll("dd").forEach((elemento, indice) => {
    elemento.textContent = typeof valoresDesglose[indice] === "number"
      ? formateadorMoneda.format(valoresDesglose[indice])
      : valoresDesglose[indice];
  });
}

function reiniciarResultado() {
  precioEstimado.textContent = formateadorMoneda.format(0);
  rangoEstimado.textContent = "Completá el formulario";
  desgloseCotizacion.querySelectorAll("dd").forEach((elemento) => {
    elemento.textContent = "—";
  });
}

formularioCotizacion.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (!formularioCotizacion.checkValidity()) {
    formularioCotizacion.reportValidity();
    return;
  }

  const resultado = calcularCotizacion(new FormData(formularioCotizacion));
  mostrarCotizacion(resultado);
});

botonReiniciar.addEventListener("click", () => {
  window.setTimeout(reiniciarResultado, 0);
});

reiniciarResultado();
