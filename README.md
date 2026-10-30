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
- `mapa-astral.html`: formulario inicial para preparar una experiencia de mapa astral. En esta fase solo valida que los datos estén completos; no calcula, envía ni guarda información.
- `Servicios.html`: sesiones, pasos de consulta y solicitud de información.
- `tienda.html`: tienda de cuarzos, amuletos y ebook; selector simbólico de cuarzo por intención, selección de productos y consulta por WhatsApp. La experiencia interactiva del libro permanece disponible. Precios, disponibilidad y entrega se confirman con Nayra.
