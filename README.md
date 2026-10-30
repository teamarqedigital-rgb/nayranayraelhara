# Nayra Elhara

Sitio web estático en español para Nayra Elhara: portada, guía interactiva, sesiones y catálogo de objetos simbólicos.

## Probar el sitio

Abre `index.html` en un navegador o sirve la carpeta con cualquier servidor estático. No hay un proceso de compilación ni dependencias de Node requeridas para el sitio público.

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

- `index.html`: portada, guía interactiva por intención y acceso destacado al ebook “Quédate conmigo”.
- `mapa-astral.html`: formulario y resultado inicial del mapa astral. Calcula en el navegador las posiciones y signos de diez cuerpos para nacimientos en Colombia; no envía ni guarda los datos.
- `mapa-astral.js`: valida el formulario, convierte la hora de Colombia (`America/Bogota`) a UTC y presenta los resultados del motor.
- `astral/ephemeris-engine.js`: adaptador local que calcula las longitudes eclípticas geocéntricas de Sol, Luna y ocho planetas a partir de una fecha UTC y deriva su signo tropical, grados y minutos.
- `astral/vendor/astronomy.browser.min.js`: versión 2.1.19 de Astronomy Engine para cálculos deterministas en el navegador; su licencia MIT está en `astral/vendor/ASTRONOMY-ENGINE-LICENSE.txt`.
- `tests/astral-ephemeris.test.cjs`: comprobaciones automatizadas de determinismo, fecha de entrada, rangos de longitud y límites de signos/grados/minutos.
- `tests/mapa-astral-form.test.cjs`: verifica que el formulario convierta la hora local de Colombia, calcule y muestre las diez posiciones.

El cálculo visible inicial solo admite nacimientos en Colombia y utiliza la zona horaria IANA `America/Bogota`; todavía no incluye geolocalización ni nacimientos en otros países. El motor seleccionado no calcula casas astrológicas ni ascendente. Casas, aspectos e interpretaciones aún deben implementarse en sus fases correspondientes. El resultado actual incluye longitudes del zodiaco tropical en la eclíptica verdadera de la fecha y día juliano UT según Astronomy Engine; no representa todavía una carta natal completa. Los grados se redondean al minuto de arco más cercano.
- `Servicios.html`: sesiones, pasos de consulta y solicitud de información.
- `tienda.html`: tienda de cuarzos, amuletos y ebook; selector simbólico de cuarzo por intención, selección de productos y consulta por WhatsApp. La experiencia interactiva del libro permanece disponible. Precios, disponibilidad y entrega se confirman con Nayra.
