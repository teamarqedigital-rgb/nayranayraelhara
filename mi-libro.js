(() => {
  "use strict";

  const shareButton = document.querySelector("#book-share");
  const shareStatus = document.querySelector("#book-share-status");

  if (!shareButton || !shareStatus) {
    console.error("No se pudo iniciar la opción para compartir el libro.");
    return;
  }

  shareButton.addEventListener("click", async () => {
    const shareData = {
      title: document.title,
      text: "Quédate conmigo — un ensayo íntimo y pausas prácticas de Nayra Elhara.",
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        shareStatus.textContent = "Gracias por compartir esta página.";
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          shareStatus.textContent = "No se compartió el enlace.";
          return;
        }

        console.error("No se pudo abrir la opción para compartir.", error);
        shareStatus.textContent = "No se pudo compartir automáticamente. Puedes copiar el enlace desde la barra del navegador.";
      }
      return;
    }

    if (!navigator.clipboard?.writeText) {
      shareStatus.textContent = "Tu navegador no permite compartir automáticamente. Puedes copiar el enlace desde la barra del navegador.";
      return;
    }

    try {
      await navigator.clipboard.writeText(shareData.url);
      shareStatus.textContent = "Enlace copiado. Ya puedes compartirlo.";
    } catch (error) {
      console.error("No se pudo copiar el enlace del libro.", error);
      shareStatus.textContent = "No se pudo copiar el enlace. Puedes copiarlo desde la barra del navegador.";
    }
  });
})();
