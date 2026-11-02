# Nayra Elhara

Sitio web estático en español para Nayra Elhara: portada, guía interactiva, sesiones y catálogo de objetos simbólicos.

## Probar el sitio

Abre `index.html` en un navegador o sirve la carpeta con cualquier servidor estático. No hay un proceso de compilación ni dependencias de Node requeridas para el sitio público.

Para validar el motor de carta astral, ejecuta `npm test` (o directamente `node tests/natal-chart.test.cjs`). No hay un proceso de compilación configurado.

## Configuración comercial

Los enlaces públicos de contacto y agenda se centralizan en `business-config.js`:

```js
window.NAYRA_CONFIG = {
  whatsappNumber: "573001234567",
  bookingUrl: ""
};
```

- `whatsappNumber`: número comercial de WhatsApp con código de país, solo dígitos (Colombia: `57` + número). Habilita mensajes de consulta y pedidos con texto preparado. Confirma que sea el canal comercial correcto antes de publicar.
- `bookingUrl`: enlace público de agenda, si se utiliza. Se reserva para conectar un flujo de reserva futuro.

No añadas claves privadas ni credenciales al código del sitio.

## Antes de aceptar pagos

El catálogo permite armar una lista de consulta, pero no procesa pagos ni confirma compras. Los precios, inventario, entrega y métodos de pago aún deben confirmarse. Configura esos datos y conecta un proveedor de pagos con enlaces o checkout seguro antes de anunciar ventas en línea.

La selección del catálogo se conserva solo mientras la página está abierta. La guía ofrece reflexiones preescritas y no utiliza IA ni guarda preguntas personales.

## Música ambiental

El archivo `hadas-bosque.mp3` no se incluye en este repositorio porque su licencia de distribución aún debe confirmarse. Antes de publicar, confirma los derechos de uso o reemplázalo por una pista con licencia adecuada; el reproductor no tendrá audio hasta entonces.

## Imágenes y derechos de uso

Las fotos de cuarzos, obsidiana y colgante usadas en la tienda se descargaron de Pexels y se muestran con crédito visible. La licencia de Pexels permite uso en sitios web y comercios; consulta siempre sus condiciones vigentes antes de publicar:

- Cuarzo rosa, foto de Karola G: [Pexels 4040600](https://www.pexels.com/photo/light-pink-crystal-of-rose-quart-against-gray-background-in-studio-4040600/).
- Cuarzo rosa, foto de Eva Bronzini: [Pexels 6468557](https://www.pexels.com/photo/close-up-shot-of-a-rose-quartz-6468557/).
- Amatista, foto de Mr. Pugo: [Pexels 37964719](https://www.pexels.com/photo/vibrant-amethyst-stones-on-white-background-37964719/).
- Obsidiana, foto de Alina Vilchenko: [Pexels 11266559](https://www.pexels.com/photo/close-up-of-holding-a-gemstone-11266559/).
- Colgante de amatista, foto de Valeria Boltneva: [Pexels 965984](https://www.pexels.com/photo/person-holding-black-necklace-with-purple-stone-pendant-965984/).
- [Licencia Pexels](https://www.pexels.com/license/).

Son fotografías de referencia, no necesariamente de las piezas que se venderán. Solicita una foto real del producto antes de pagar. La ilustración original de Nayra se conserva como imagen de marca.

Las fotografías de producto anteriores sin procedencia/licencia confirmada se conservan fuera de la carpeta publicada, en `Documentos/imagenes_nayra_por_verificar`. Revisa su autoría/licencia antes de volver a copiarlas al sitio.

## Páginas

- `index.html`: portada con una pausa interactiva de intención, guía por intención y acceso destacado al ebook “Quédate conmigo”.
- `script.js` y `style.css`: respuesta de la pausa inicial y la guía, carta del día, navegación y estilos globales.
- `herramientas.html`: índice editorial de experiencias interactivas disponibles; enlaza funciones reales sin crear resultados simulados.
- `herramientas.js` y `herramientas.css`: diario privado temporal, rueda de autoobservación con reinicio, afirmaciones, registro de hábitos, ejercicio y planificador; funcionan sin backend ni almacenamiento persistente.
- `tarot-interactivo.html`, `tarot-interactivo.js` y `tarot-interactivo.css`: reflexión simbólica mediante mensajes preescritos, con opción para recibir otra reflexión; no utiliza IA ni afirma predecir el futuro.
- `mi-libro.html`: ficha editorial de “Quédate conmigo”, con la información disponible, consulta por WhatsApp y opción de compartir.
- `mi-libro.js`: comparte el enlace mediante el menú nativo o el portapapeles; no almacena datos.
- La ficha del libro señala que la imagen es ilustrativa, no su portada original. La web no procesa pagos; el contacto para confirmar compra y entrega usa el canal configurado en `business-config.js`.
- Las vistas previas Open Graph básicas se definen en las páginas principales. Canonical, `og:image`, sitemap y medición de visitas requieren confirmar el dominio de producción y la portada autorizada; no se han inventado.
- `tu-alquimia.html`: experiencia editorial de transformación personal, con cinco dimensiones y un ritual interactivo que no guarda datos.
- `tu-alquimia.css` y `tu-alquimia.js`: estilos y contenido interactivo propios de “Tu alquimia”; utiliza el menú y las animaciones compartidos del sitio.
- `mapa-astral.html` y `mapa-astral.js`: formulario y experiencia completa de carta natal; procesa los datos localmente y no los envía ni los guarda.
- `mapa-astral.css`: presentación de la rueda y los resultados, integrada con la identidad visual existente.
- `astral/natal-chart-engine.js`: adaptador para diez cuerpos, signos y grados, Ascendente, Medio Cielo, doce casas Placidus, retrogradación y aspectos mayores.
- `astral/vendor/circular-natal-horoscope.browser.js`: bundle local fijado de `circular-natal-horoscope-js` 1.1.0, con licencia Unlicense en `astral/vendor/CIRCULAR-NATAL-HOROSCOPE-LICENSE.txt`. El motor utiliza cálculos deterministas basados en la efeméride Moshier/Meeus y no usa IA.
- `astral/colombia-places.js`: índice local de 1.141 localidades colombianas, derivado del conjunto de GeoNames y limitado a centros poblados de referencia.
- `astral/interpretations-es.js` y `astral/interpretation-engine.js`: bloques de lectura simbólica editables y reglas para Sol, Luna, Ascendente y aspectos mayores.
- `tests/natal-chart.test.cjs`: valida determinismo, zona horaria histórica, planetas, ángulos, casas, aspectos, ubicaciones e interpretaciones.

El cálculo admite localidades incluidas en el índice colombiano; no consulta servicios externos. La coordenada corresponde al centro poblado de referencia, no a la dirección exacta del nacimiento, por lo que los ángulos y las casas pueden variar ligeramente. El conjunto de localidades proviene de [GeoNames](https://www.geonames.org/) bajo [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); se distribuye una selección local filtrada para esta experiencia.

La carta muestra el zodiaco tropical, el sistema de casas Placidus, diez cuerpos celestes, Ascendente, Medio Cielo y aspectos mayores de acuerdo con los orbes de la biblioteca. Las interpretaciones son contenido simbólico y cultural, no diagnósticos ni predicciones garantizadas. La hora y la ubicación indicadas pueden afectar el resultado.

- `Servicios.html`: sesiones, pasos de consulta y solicitud de información.
- `tienda.html`: tienda de cuarzos, amuletos y ebook; selector simbólico de cuarzo por intención, selección de productos y consulta por WhatsApp. La experiencia interactiva del libro permanece disponible. Precios, disponibilidad y entrega se confirman con Nayra.
