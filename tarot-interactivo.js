(() => {
  "use strict";

  const reflections = [
    {
      title: "Escucha lo que necesitas.",
      message: "En un vínculo, tus necesidades también merecen un lugar. Puedes observarlas sin convertirlas en una exigencia para ti o para otra persona.",
      prompt: "¿Qué te ayudaría a expresar una necesidad con claridad y respeto?"
    },
    {
      title: "Tu voz forma parte del vínculo.",
      message: "Cuidar una relación no implica dejar de escucharte. Una conversación honesta puede empezar por nombrar lo que sientes, sin dar por hecho la respuesta de alguien más.",
      prompt: "¿Qué sabes de tu experiencia y qué necesitas preguntar en vez de suponer?"
    },
    {
      title: "Puedes ir a tu propio ritmo.",
      message: "No tienes que resolver hoy todas las preguntas sobre el amor. Una pausa puede ayudarte a distinguir lo que deseas de lo que sientes que se espera de ti.",
      prompt: "¿Qué decisión puedes permitirte revisar con más calma?"
    },
    {
      title: "Los límites también expresan cuidado.",
      message: "Un límite describe lo que necesitas para cuidar tu bienestar; no controla lo que otra persona debe sentir o hacer.",
      prompt: "¿Qué límite te gustaría formular de manera concreta y amable?"
    },
    {
      title: "Mereces relaciones con espacio para ti.",
      message: "Tu tiempo, tus amistades y tus proyectos también son parte de tu vida. Puedes notar si hay espacio para aquello que te importa.",
      prompt: "¿Qué actividad propia te gustaría volver a incluir en tu semana?"
    },
    {
      title: "Puedes observar antes de concluir.",
      message: "Una inquietud no siempre confirma lo que temes. Reunir información y hablar con alguien de confianza puede ayudarte a mirar la situación con más claridad.",
      prompt: "¿Qué hecho conoces y qué interpretación podrías comprobar?"
    }
  ];

  const form = document.querySelector("#tarot-form");
  const question = document.querySelector("#preguntaAmor");
  const result = document.querySelector("#respuestaAmor");
  const title = document.querySelector("#tarot-result-title");
  const message = document.querySelector("#tarot-result-message");
  const prompt = document.querySelector("#tarot-result-prompt");
  const repeat = document.querySelector("#tarot-repeat");

  if (!form || !question || !result || !title || !message || !prompt || !repeat) {
    console.error("No se pudo iniciar la reflexión de tarot: faltan elementos del formulario.");
    return;
  }

  let lastReflectionIndex = -1;

  const showReflection = () => {
    const availableIndexes = reflections
      .map((_, index) => index)
      .filter((index) => index !== lastReflectionIndex);
    const selectedIndex = availableIndexes[
      Math.floor(Math.random() * availableIndexes.length)
    ];
    const reflection = reflections[selectedIndex];

    lastReflectionIndex = selectedIndex;
    title.textContent = reflection.title;
    message.textContent = reflection.message;
    prompt.textContent = reflection.prompt;
    result.hidden = false;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!question.value.trim()) {
      question.setCustomValidity("Escribe una pregunta para continuar.");
      question.reportValidity();
      return;
    }

    question.setCustomValidity("");
    showReflection();
  });

  repeat.addEventListener("click", showReflection);

  question.addEventListener("input", () => {
    question.setCustomValidity("");
  });
})();
