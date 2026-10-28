(() => {
  const config = window.NAYRA_CONFIG || {};
  const formatMessage = (lines) => lines.join("\n");
  const openWhatsApp = (message) => {
    const number = String(config.whatsappNumber || "").replace(/\D/g, "");
    if (!number) {
      return false;
    }

    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    return true;
  };

  const ebookContact = document.querySelector("[data-ebook-whatsapp]");
  if (ebookContact && config.whatsappNumber) {
    const message = "Hola, Nayra. Me interesa tu ebook “Quédate conmigo” por $29.900 COP. ¿Me confirmas el método de pago y cómo recibo el PDF?";
    const number = String(config.whatsappNumber).replace(/\D/g, "");
    ebookContact.href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }

  const crystalRecommendations = {
    amor: {
      name: "Cuarzo rosa",
      message: "Su tono suave puede servirte como símbolo de amor propio y trato amable contigo.",
      productId: "producto-cuarzo-rosa"
    },
    calma: {
      name: "Amatista",
      message: "Puedes elegirla como recordatorio visual para hacer una pausa y reservar un momento de introspección.",
      productId: "producto-amatista"
    },
    limites: {
      name: "Obsidiana",
      message: "Su presencia puede representar una intención de cuidar tus límites y volver a lo que para ti es importante.",
      productId: "producto-obsidiana"
    },
    llevar: {
      name: "Colgante de amatista",
      message: "Un accesorio simbólico puede acompañarte como recordatorio personal de la intención que elijas.",
      productId: "producto-colgante-amatista"
    }
  };
  const crystalFinder = document.querySelector(".crystal-finder");

  if (crystalFinder) {
    const choices = crystalFinder.querySelectorAll("[data-crystal-intention]");
    const result = crystalFinder.querySelector("[data-crystal-recommendation]");
    const name = crystalFinder.querySelector("[data-crystal-name]");
    const message = crystalFinder.querySelector("[data-crystal-message]");
    const link = crystalFinder.querySelector("[data-crystal-link]");

    choices.forEach((choice) => {
      choice.addEventListener("click", () => {
        const recommendation = crystalRecommendations[choice.dataset.crystalIntention];
        if (!recommendation) {
          return;
        }

        choices.forEach((item) => item.setAttribute("aria-pressed", String(item === choice)));
        name.textContent = recommendation.name;
        message.textContent = recommendation.message;
        link.href = `#${recommendation.productId}`;
        result.hidden = false;
      });
    });
  }

  const dialog = document.querySelector("#request-dialog");
  if (dialog) {
    let selectedService = "Información general";
    const status = dialog.querySelector(".dialog-status");
    const nameInput = dialog.querySelector("#request-name");
    const questionInput = dialog.querySelector("#request-question");

    const requestMessage = () => formatMessage([
      "Hola, Nayra. Me gustaría recibir información sobre:",
      selectedService,
      nameInput.value.trim() ? `Mi nombre: ${nameInput.value.trim()}` : "",
      questionInput.value.trim() ? `Mi consulta: ${questionInput.value.trim()}` : "",
      selectedService.includes("carta astral")
        ? "Quisiera conocer el precio en COP, el método de pago, el plazo y el formato del video. Entiendo que compartiré mis datos de nacimiento por privado después de confirmar."
        : "Quisiera conocer disponibilidad, modalidad, duración y valor en COP."
    ].filter(Boolean));

    document.querySelectorAll("[data-service]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedService = button.dataset.service;
        status.textContent = "";
        dialog.showModal();
        nameInput.focus();
      });
    });

    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
    dialog.querySelector(".dialog-send").addEventListener("click", () => {
      if (!openWhatsApp(requestMessage())) {
        status.textContent = "WhatsApp aún no está configurado. Puedes copiar tu consulta y enviarla cuando el canal de Nayra esté disponible.";
      }
    });
    dialog.querySelector(".dialog-copy").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(requestMessage());
        status.textContent = "Tu consulta quedó copiada. Puedes pegarla en tu canal de contacto habitual.";
      } catch (error) {
        status.textContent = "No se pudo copiar automáticamente. Selecciona y copia los datos de tu consulta manualmente.";
      }
    });
  }

  const cartList = document.querySelector("#cart-list");
  if (cartList) {
    const cart = new Map();
    const count = document.querySelector("#cart-count");
    const sendOrder = document.querySelector("#send-order");
    const clearCart = document.querySelector("#clear-cart");
    const orderStatus = document.querySelector("#order-status");

    const renderCart = () => {
      count.textContent = String(cart.size);
      sendOrder.disabled = cart.size === 0;
      clearCart.hidden = cart.size === 0;
      orderStatus.textContent = "";
      cartList.replaceChildren();

      if (cart.size === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "cart-empty";
        emptyItem.textContent = "Aún no has añadido objetos.";
        cartList.append(emptyItem);
        return;
      }

      cart.forEach((quantity, product) => {
        const item = document.createElement("li");
        const productName = document.createElement("span");
        const controls = document.createElement("span");
        const decrease = document.createElement("button");
        const quantityText = document.createElement("span");
        const increase = document.createElement("button");
        const remove = document.createElement("button");

        productName.className = "cart-product-name";
        productName.textContent = product;
        controls.className = "cart-controls";
        decrease.type = "button";
        decrease.className = "cart-control";
        decrease.setAttribute("aria-label", `Quitar una unidad de ${product}`);
        decrease.textContent = "−";
        quantityText.textContent = String(quantity);
        increase.type = "button";
        increase.className = "cart-control";
        increase.setAttribute("aria-label", `Añadir una unidad de ${product}`);
        increase.textContent = "+";
        remove.type = "button";
        remove.className = "cart-remove";
        remove.setAttribute("aria-label", `Eliminar ${product} de la selección`);
        remove.textContent = "Quitar";

        decrease.addEventListener("click", () => {
          if (quantity <= 1) {
            cart.delete(product);
          } else {
            cart.set(product, quantity - 1);
          }
          renderCart();
        });
        increase.addEventListener("click", () => {
          cart.set(product, quantity + 1);
          renderCart();
        });
        remove.addEventListener("click", () => {
          cart.delete(product);
          renderCart();
        });

        controls.append(decrease, quantityText, increase, remove);
        item.append(productName, controls);
        cartList.append(item);
      });
    };

    document.querySelectorAll("[data-product]").forEach((button) => {
      button.addEventListener("click", () => {
        const product = button.dataset.product;
        cart.set(product, (cart.get(product) || 0) + 1);
        renderCart();
        orderStatus.textContent = `${product} se añadió a tu consulta.`;
      });
    });

    sendOrder.addEventListener("click", async () => {
      const items = [...cart].map(([product, quantity]) => `${quantity} × ${product}`);
      const message = formatMessage([
        "Hola, Nayra. Quisiera consultar disponibilidad y precio en COP de estos productos:",
        ...items,
        "También quisiera conocer las opciones de entrega y pago."
      ]);

      if (openWhatsApp(message)) {
        orderStatus.textContent = "Tu consulta se abrió en WhatsApp. La compra solo se confirma cuando Nayra confirme el total, entrega y pago.";
        return;
      }

      try {
        await navigator.clipboard.writeText(message);
        orderStatus.textContent = "Tu lista quedó copiada. WhatsApp aún no está configurado; podrás pegarla cuando el canal de Nayra esté disponible.";
      } catch (error) {
        orderStatus.textContent = "WhatsApp y la copia automática aún no están disponibles. Guarda tu selección para consultarla más tarde.";
      }
    });

    clearCart.addEventListener("click", () => {
      cart.clear();
      renderCart();
    });
  }

  const currentYear = document.querySelector("#current-year");
  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector("#site-nav");
  if (menuToggle && siteNav) {
    const closeMenu = () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      siteNav.classList.remove("is-open");
    };

    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isExpanded));
      menuToggle.setAttribute("aria-label", isExpanded ? "Abrir menú" : "Cerrar menú");
      siteNav.classList.toggle("is-open", !isExpanded);
    });
    siteNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }
})();
