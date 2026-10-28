(() => {
  const reflections = {
    limites: {
      title: "Tu espacio también importa.",
      message: "Amar no te pide desaparecer. Puedes cuidar el vínculo y, al mismo tiempo, reconocer lo que necesitas.",
      practice: "Completa en voz baja: «Hoy necesito ___ y puedo expresarlo con ___»."
    },
    volver: {
      title: "También mereces recibir cuidado.",
      message: "Hacer una pausa para ti no le quita amor a nadie. Es una forma de volver a estar presente sin dejarte al final.",
      practice: "Regálate cinco minutos hoy para una cosa pequeña que te haga bien."
    },
    escucharme: {
      title: "Empieza por una pregunta honesta.",
      message: "No tienes que resolverlo todo ahora. Escucharte puede comenzar con reconocer lo que sientes, sin corregirlo.",
      practice: "Pregúntate: «¿Qué decisión pequeña se sentiría más fiel a mí hoy?»"
    }
  };

  const result = document.querySelector("[data-pause-result]");
  if (!result) {
    return;
  }

  const title = result.querySelector("[data-pause-title]");
  const message = result.querySelector("[data-pause-message]");
  const practice = result.querySelector("[data-pause-practice]");
  const choices = document.querySelectorAll("[data-pause-choice]");

  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      const reflection = reflections[choice.dataset.pauseChoice];
      if (!reflection) {
        return;
      }

      choices.forEach((option) => {
        option.setAttribute("aria-pressed", String(option === choice));
      });
      title.textContent = reflection.title;
      message.textContent = reflection.message;
      practice.textContent = reflection.practice;
      result.hidden = false;
    });
  });
})();
