# Verdi.Code — Día 7

Séptima versión del portafolio personal de Agustín.

## Qué se agregó en esta versión

- Aparición suave de títulos, tarjetas, pasos y formularios al hacer scroll.
- Retrasos pequeños entre elementos para evitar que todo aparezca al mismo tiempo.
- Movimiento tranquilo en el bloque visual del hero.
- Luz violeta con una animación lenta en el fondo principal.
- Cambio de color suave en los detalles decorativos del hero.
- Línea animada debajo de los enlaces de navegación.
- Microinteracciones en botones, tarjetas, imágenes y logo.
- Respuesta visual cuando cambia el precio de la calculadora.
- Barra superior que muestra el progreso de lectura de la página.
- Compatibilidad con `prefers-reduced-motion`.

## Qué todavía no incluye

- Personaje 3D.
- Pagos o envío de presupuestos a un servidor.
- Optimización final, SEO completo y publicación.

## Paleta principal

- Violeta: `#8b5cf6`
- Violeta claro: `#b9a0ff`
- Naranja zorro: `#f0823f`
- Fondo: `#100d17`
- Superficie: `#211a2b`
- Texto: `#f7f3fb`

Los colores están centralizados dentro de `:root` al principio de `css/styles.css`.

## Archivos modificados

- `index.html`
- `css/styles.css`
- `js/main.js`
- `README.md`

## Cómo funcionan las animaciones

JavaScript agrega la clase `animar-entrada` y utiliza `IntersectionObserver` para
detectar cuándo un elemento entra en pantalla. En ese momento se agrega la clase
`elemento-visible` y CSS realiza la transición.

Si JavaScript no carga, el contenido sigue siendo visible. Si el dispositivo tiene
activada la reducción de movimiento, las animaciones se desactivan automáticamente.

## Qué personalizar

- La duración de entrada dentro de `.js .animar-entrada`.
- La distancia inicial definida con la propiedad `translate`.
- Los tiempos de `flotar-detalle`, `respirar-luz` y `pulso-borde`.
- La lista de elementos animados dentro de `js/main.js`.

## Qué probar

- Abrí `index.html` con Live Server.
- Recorré toda la página lentamente y observá las entradas de cada sección.
- Confirmá que los efectos se ejecuten una sola vez.
- Probá los estados hover del logo, botones, tarjetas e imágenes.
- Cambiá valores en la calculadora y revisá la respuesta visual del precio.
- Comprobá que la barra superior avance con el scroll.
- Activá `prefers-reduced-motion` desde el sistema o las herramientas del navegador.
- Revisá la página en celular, tablet y escritorio.


