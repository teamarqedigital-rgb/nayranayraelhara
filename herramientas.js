(() => {
  "use strict";

  const journalForm = document.querySelector("#journal-form");
  const journalEntry = document.querySelector("#journal-entry");
  const journalCopy = document.querySelector("#journal-copy");
  const journalCount = document.querySelector("#journal-count");
  const journalStatus = document.querySelector("#journal-status");

  if (journalForm && journalEntry && journalCopy && journalCount && journalStatus) {
    journalEntry.addEventListener("input", () => {
      journalCount.textContent = String(journalEntry.value.length);
      journalCopy.disabled = journalEntry.value.trim().length === 0;
      journalStatus.textContent = "";
    });

    journalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      journalStatus.textContent =
        "Tu nota está lista. Permanece solo en esta página y se borrará cuando la cierres o recargues.";
    });

    journalCopy.addEventListener("click", async () => {
      if (!journalEntry.value.trim()) {
        journalStatus.textContent = "Escribe una nota antes de copiarla.";
        return;
      }

      if (!navigator.clipboard?.writeText) {
        journalStatus.textContent =
          "El navegador no permite copiar automáticamente. Selecciona tu texto para copiarlo manualmente.";
        return;
      }

      try {
        await navigator.clipboard.writeText(journalEntry.value);
        journalStatus.textContent = "Nota copiada al portapapeles por solicitud tuya.";
      } catch (error) {
        console.error("No se pudo copiar la nota del diario.", error);
        journalStatus.textContent =
          "No se pudo copiar automáticamente. Selecciona tu texto para copiarlo manualmente.";
      }
    });
  } else {
    console.error("No se pudo iniciar el diario de transformación: faltan elementos.");
  }

  const wheelInputs = [...document.querySelectorAll("[data-wheel-area]")];
  const wheelPolygon = document.querySelector("#life-wheel-area");
  const wheelDescription = document.querySelector("#life-wheel-description");
  const wheelStatus = document.querySelector("#wheel-status");
  const wheelReset = document.querySelector("#wheel-reset");
  const wheelCenter = 110;
  const wheelRadius = 80;

  if (wheelInputs.length === 8 && wheelPolygon && wheelDescription && wheelStatus && wheelReset) {
    const updateWheel = () => {
      const points = wheelInputs.map((input, index) => {
        const value = Number(input.value);
        const angle = -Math.PI / 2 + (index * 2 * Math.PI) / wheelInputs.length;
        const radius = (value / 10) * wheelRadius;
        const x = wheelCenter + radius * Math.cos(angle);
        const y = wheelCenter + radius * Math.sin(angle);
        const output = input.parentElement.querySelector("output");

        if (output) {
          output.value = String(value);
          output.textContent = String(value);
        }

        return `${x.toFixed(1)},${y.toFixed(1)}`;
      });

      wheelPolygon.setAttribute("points", points.join(" "));
      wheelDescription.textContent =
        `Autoobservación de ocho áreas, en escala de 1 a 10: ${wheelInputs
          .map((input) => `${input.parentElement.childNodes[0].textContent.trim()} ${input.value}`)
          .join(", ")}. No es una evaluación ni un diagnóstico.`;
      wheelStatus.textContent =
        "Los valores muestran tu percepción de hoy; no son una calificación ni una medida de tu valor.";
    };

    wheelInputs.forEach((input) => input.addEventListener("input", updateWheel));
    wheelReset.addEventListener("click", () => {
      wheelInputs.forEach((input) => {
        input.value = "5";
      });
      updateWheel();
      wheelStatus.textContent = "La rueda volvió a sus valores iniciales de 5.";
    });
    updateWheel();
  } else {
    console.error("No se pudo iniciar la rueda de la vida: faltan controles.");
  }

  const affirmations = {
    self: [
      "Puedo tratarme con el mismo respeto que ofrezco a quienes quiero.",
      "Mi valor no depende de tener todo resuelto."
    ],
    courage: [
      "Puedo elegir un paso posible incluso cuando todavía tengo dudas.",
      "Mi voz merece ser escuchada, también por mí."
    ],
    learning: [
      "Puedo aprender a mi ritmo y cambiar de opinión con nueva información.",
      "La curiosidad puede ser un comienzo suficiente."
    ],
    abundance: [
      "Puedo construir estabilidad con decisiones informadas y pasos constantes.",
      "Mi preparación puede ayudarme a reconocer nuevas oportunidades."
    ]
  };
  const affirmationForm = document.querySelector("#affirmation-form");
  const affirmationTheme = document.querySelector("#affirmation-theme");
  const affirmationOutput = document.querySelector("#affirmation-output");
  const affirmationIndex = {};

  if (affirmationForm && affirmationTheme && affirmationOutput) {
    affirmationForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const choices = affirmations[affirmationTheme.value];

      if (!choices) {
        affirmationOutput.hidden = true;
        console.error("La intención seleccionada no tiene afirmaciones disponibles.");
        return;
      }

      const index = affirmationIndex[affirmationTheme.value] ?? 0;
      affirmationOutput.textContent = choices[index];
      affirmationOutput.hidden = false;
      affirmationIndex[affirmationTheme.value] = (index + 1) % choices.length;
    });
  } else {
    console.error("No se pudo iniciar el generador de afirmaciones: faltan elementos.");
  }

  const habitList = document.querySelector("#habit-list");
  const habitOutput = document.querySelector("#habit-output");

  if (habitList && habitOutput) {
    const updateHabits = () => {
      const checks = [...habitList.querySelectorAll('input[type="checkbox"]')];
      const completed = checks.filter((check) => check.checked).length;
      habitOutput.textContent =
        `${completed} de ${checks.length} acciones marcadas en esta sesión.`;
    };

    habitList.addEventListener("change", updateHabits);
  } else {
    console.error("No se pudo iniciar el registro de hábitos: faltan elementos.");
  }

  const exercises = {
    values: {
      title: "Mis valores",
      prompt: "¿Qué cualidad quieres cuidar en una decisión que tienes delante?",
      action: "Escribe una acción pequeña que exprese ese valor esta semana."
    },
    resources: {
      title: "Mis recursos",
      prompt: "¿Qué capacidad, aprendizaje o apoyo podría acompañarte en este momento?",
      action: "Elige un recurso y anota cómo podrías acercarte a él."
    },
    boundaries: {
      title: "Mis límites",
      prompt: "¿Qué necesitas comunicar para cuidar tu tiempo, energía o bienestar?",
      action: "Ensaya una frase clara y respetuosa que podrías usar."
    },
    curiosity: {
      title: "Mi curiosidad",
      prompt: "¿Qué pregunta o tema te gustaría explorar sin exigirte dominarlo?",
      action: "Reserva diez minutos para leer, practicar o preguntar sobre ello."
    }
  };
  const reflectionForm = document.querySelector("#reflection-form");
  const reflectionExercise = document.querySelector("#reflection-exercise");
  const reflectionOutput = document.querySelector("#reflection-output");
  const reflectionTitle = document.querySelector("#reflection-exercise-title");
  const reflectionPrompt = document.querySelector("#reflection-exercise-prompt");
  const reflectionAction = document.querySelector("#reflection-exercise-action");

  if (
    reflectionForm
    && reflectionExercise
    && reflectionOutput
    && reflectionTitle
    && reflectionPrompt
    && reflectionAction
  ) {
    reflectionForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const exercise = exercises[reflectionExercise.value];

      if (!exercise) {
        reflectionOutput.hidden = true;
        console.error("El ejercicio seleccionado no está disponible.");
        return;
      }

      reflectionTitle.textContent = exercise.title;
      reflectionPrompt.textContent = exercise.prompt;
      reflectionAction.textContent = exercise.action;
      reflectionOutput.hidden = false;
    });
  } else {
    console.error("No se pudo iniciar los ejercicios de autoconocimiento: faltan elementos.");
  }

  const horizons = {
    today: "Puedes revisar este paso al final del día y decidir qué sigue.",
    week: "Elige un momento esta semana para revisar tu avance y ajustar el plan.",
    later: "Guarda esta idea donde tú prefieras y revísala cuando sea oportuno."
  };
  const goalForm = document.querySelector("#goal-form");
  const goalDescription = document.querySelector("#goal-description");
  const goalHorizon = document.querySelector("#goal-horizon");
  const goalOutput = document.querySelector("#goal-output");
  const goalOutputTitle = document.querySelector("#goal-output-title");
  const goalOutputHorizon = document.querySelector("#goal-output-horizon");

  if (
    goalForm
    && goalDescription
    && goalHorizon
    && goalOutput
    && goalOutputTitle
    && goalOutputHorizon
  ) {
    goalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const goal = goalDescription.value.trim();
      const horizon = horizons[goalHorizon.value];

      if (!goal || !horizon) {
        goalOutput.hidden = true;
        return;
      }

      goalOutputTitle.textContent = goal;
      goalOutputHorizon.textContent = horizon;
      goalOutput.hidden = false;
    });
  } else {
    console.error("No se pudo iniciar el planificador de objetivos: faltan elementos.");
  }
})();
