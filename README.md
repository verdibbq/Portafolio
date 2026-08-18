<<<<<<< HEAD
# Verdi.Code — Día 4

cuarta versión del portafolio personal de Agustín.

## Qué se agregó en esta versión

- Menú hamburguesa para celular y tablet.
- JavaScript básico para abrir y cerrar la navegación.
- Cierre del menú al elegir una sección, presionar Escape o volver a escritorio.
- Adaptación completa de columnas, tarjetas, botones y tipografías.
- Ajustes específicos para tablet y celulares pequeños.
- Correcciones de desbordamiento en enlaces y textos largos.
- Mejoras de foco, tamaños táctiles y reducción de movimiento.
- Pequeños estados visuales en tarjetas y botones.
=======
# Verdi.Code — Día 5

Quinta versión del portafolio personal de Agustín.

## Qué se agregó en esta versión

- Filtros para mostrar todos los proyectos, el proyecto real o las maquetas.
- Contador accesible que informa cuántos proyectos están visibles.
- Botón para copiar el correo de contacto al portapapeles.
- Mensaje de confirmación después de copiar el correo.
- Formulario con nombre, correo y descripción del proyecto.
- Validación de campos obligatorios antes de preparar la consulta.
- Generación de un correo con los datos del formulario, sin usar backend.
- Estilos responsive para los filtros y el formulario.
>>>>>>> 0fc7740 (agregar filtros y formulario de contacto interactivo)

## Qué todavía no incluye

- Calculadora funcional.
<<<<<<< HEAD
- Capturas de los proyectos.
=======
>>>>>>> 0fc7740 (agregar filtros y formulario de contacto interactivo)
- Animaciones avanzadas.
- Personaje 3D.

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
<<<<<<< HEAD
- `README.md`

## Archivo agregado en esta versión

- `js/main.js`

## Qué personalizar

- Podés cambiar los colores editando las variables de `:root`.
- El bloque `.detalle-inicio` sigue siendo temporal y más adelante podrá reemplazarse por el personaje relacionado con el zorro.
- Revisá los textos y enlaces antes de publicar.
=======
- `js/main.js`
- `README.md`

## Cómo funciona el formulario

El formulario no envía ni guarda información en un servidor. JavaScript toma los
datos ingresados y abre la aplicación de correo del visitante con el asunto y el
mensaje ya preparados.

## Qué personalizar

- El texto de confirmación que aparece al copiar el correo.
- El asunto y el cuerpo del correo se editan al final de `js/main.js`.
- Los nombres de los filtros y las categorías de cada proyecto.
- El correo de destino si en el futuro creás una dirección nueva.
>>>>>>> 0fc7740 (agregar filtros y formulario de contacto interactivo)

## Qué probar

- Abrí `index.html` con Live Server.
<<<<<<< HEAD
- Probá el menú entre 320 px y 950 px de ancho.
- Confirmá que se cierre al tocar un enlace y al presionar Escape.
- Revisá la página en celular, tablet y escritorio.
- Comprobá que ningún texto, tarjeta o botón se salga de la pantalla.

=======
- Probá los tres filtros y comprobá el contador de proyectos.
- Copiá el correo usando Live Server o la versión publicada con HTTPS.
- Intentá enviar el formulario vacío para revisar la validación.
- Completá los tres campos y confirmá que se abra tu aplicación de correo.
- Probá el formulario y los filtros en celular, tablet y escritorio.
- Navegá por los controles usando la tecla Tab.

## Commit sugerido

`feat: agregar filtros y formulario de contacto interactivo`
>>>>>>> 0fc7740 (agregar filtros y formulario de contacto interactivo)
