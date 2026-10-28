const reflections = {
  amor: {
    title: "Vuelve a tratarte con ternura.",
    message: "No tienes que ganarte el descanso ni demostrar tu valor. Puedes empezar por escucharte sin juzgar lo que encuentres.",
    practice: "Pon una mano sobre el pecho y completa en voz baja: «Hoy necesito…»."
  },
  claridad: {
    title: "No necesitas resolverlo todo ahora.",
    message: "A veces la claridad aparece cuando separas lo que sabes de lo que temes. Date permiso para mirar una cosa a la vez.",
    practice: "Escribe una opción que tienes delante y qué valor quieres cuidar al elegir."
  },
  proposito: {
    title: "Lo pequeño también puede orientarte.",
    message: "Tu propósito no tiene que revelarse de golpe. Observa qué te despierta curiosidad y qué se siente alineado con tus valores de hoy.",
    practice: "Anota una acción pequeña que puedas hacer esta semana y que te acerque a algo importante para ti."
  },
  calma: {
    title: "Puedes regresar al momento presente.",
    message: "No necesitas dejar la mente en blanco. Basta con notar lo que está aquí, sin exigirte sentir algo distinto.",
    practice: "Haz tres respiraciones lentas y nombra tres cosas que ves a tu alrededor."
  }
};

const reflection = document.querySelector("#reflection");
const intentionCards = document.querySelectorAll("[data-intention]");

intentionCards.forEach((card) => {
  card.setAttribute("aria-pressed", "false");
  card.addEventListener("click", () => {
    const selectedReflection = reflections[card.dataset.intention];

    if (!selectedReflection || !reflection) {
      return;
    }

    intentionCards.forEach((item) => item.setAttribute("aria-pressed", "false"));
    card.setAttribute("aria-pressed", "true");

    document.querySelector("#reflection-title").textContent = selectedReflection.title;
    document.querySelector("#reflection-message").textContent = selectedReflection.message;
    document.querySelector("#reflection-practice").textContent = selectedReflection.practice;
    reflection.hidden = false;
  });
});

const dailyCards = [
  {
    number: "0",
    name: "El Loco",
    symbol: "✧",
    meaning: "Simboliza apertura, curiosidad y el inicio de un camino. Puede invitarte a dar un paso pequeño sin exigirte tener todo resuelto.",
    prompt: "¿Qué comienzo sencillo te gustaría permitirte hoy?"
  },
  {
    number: "I",
    name: "El Mago",
    symbol: "✦",
    meaning: "Representa iniciativa y el reconocimiento de tus propios recursos. Recuerda que puedes empezar con lo que ya tienes a mano.",
    prompt: "¿Qué habilidad o recurso tuyo podrías usar hoy?"
  },
  {
    number: "II",
    name: "La Sacerdotisa",
    symbol: "☾",
    meaning: "Invita al silencio, la observación y la escucha interior. No todas las respuestas necesitan aparecer de inmediato.",
    prompt: "¿Qué notas cuando haces una pausa antes de responder?"
  },
  {
    number: "III",
    name: "La Emperatriz",
    symbol: "❋",
    meaning: "Se asocia con creatividad, cuidado y crecimiento. Puede recordarte que también mereces recibir la atención que ofreces a otros.",
    prompt: "¿Qué podrías nutrir con paciencia en este momento?"
  },
  {
    number: "IV",
    name: "El Emperador",
    symbol: "♙",
    meaning: "Habla de estructura, límites y estabilidad. Una base clara puede darte espacio para avanzar con más serenidad.",
    prompt: "¿Qué límite o rutina te ayudaría a sentir más sostén?"
  },
  {
    number: "V",
    name: "El Hierofante",
    symbol: "✺",
    meaning: "Representa aprendizaje, valores y sabiduría compartida. Puedes escuchar otras perspectivas y elegir con cuáles te identificas.",
    prompt: "¿Qué valor quieres tener presente en tus decisiones?"
  },
  {
    number: "VI",
    name: "Los Enamorados",
    symbol: "♡",
    meaning: "Además de los vínculos, simboliza elecciones que buscan coherencia con lo que sientes y valoras.",
    prompt: "¿Qué elección se acerca más a la persona que quieres ser?"
  },
  {
    number: "VII",
    name: "El Carro",
    symbol: "➶",
    meaning: "Se asocia con dirección y determinación. Avanzar no siempre es ir deprisa: también es decidir hacia dónde quieres llevar tu energía.",
    prompt: "¿Cuál sería tu siguiente paso posible, sin apresurarte?"
  },
  {
    number: "VIII",
    name: "La Fuerza",
    symbol: "∞",
    meaning: "Recuerda la valentía serena, la paciencia y el trato compasivo contigo. La fortaleza también puede expresarse con suavidad.",
    prompt: "¿En qué situación podrías responderte con más amabilidad?"
  },
  {
    number: "IX",
    name: "El Ermitaño",
    symbol: "☼",
    meaning: "Invita a buscar un momento de quietud y a distinguir tu propia voz del ruido alrededor.",
    prompt: "¿Qué te gustaría escuchar de ti si hoy tuvieras unos minutos de calma?"
  },
  {
    number: "X",
    name: "La Rueda de la Fortuna",
    symbol: "◉",
    meaning: "Representa ciclos y cambios. Puede ser una oportunidad para notar qué está cambiando y qué permanece bajo tu cuidado.",
    prompt: "¿Qué cambio puedes aceptar y qué sí está en tus manos hoy?"
  },
  {
    number: "XI",
    name: "La Justicia",
    symbol: "⚖",
    meaning: "Se relaciona con equilibrio, honestidad y responsabilidad. Mirar una situación con claridad puede ayudarte a elegir con intención.",
    prompt: "¿Qué sería justo y honesto contigo en este momento?"
  },
  {
    number: "XII",
    name: "El Colgado",
    symbol: "⟡",
    meaning: "Sugiere una pausa y la posibilidad de observar desde otro ángulo. Detenerte un momento también puede ser parte del camino.",
    prompt: "¿Qué podrías ver distinto si no tuvieras que resolverlo ahora?"
  },
  {
    number: "XIII",
    name: "La Muerte",
    symbol: "☽",
    meaning: "Como símbolo, habla de cierres y transformación, no de una muerte literal. Puede invitarte a reconocer qué etapa está lista para cambiar.",
    prompt: "¿Qué hábito o expectativa ya no te acompaña como antes?"
  },
  {
    number: "XIV",
    name: "La Templanza",
    symbol: "≋",
    meaning: "Representa integración, paciencia y búsqueda de equilibrio. A veces el bienestar se construye con pequeños ajustes sostenibles.",
    prompt: "¿Qué gesto pequeño podría devolverte equilibrio hoy?"
  },
  {
    number: "XV",
    name: "El Diablo",
    symbol: "⛓",
    meaning: "Puede simbolizar hábitos, apegos o ideas que sentimos que nos limitan. Observarlos sin juzgar es una forma de recuperar capacidad de elección.",
    prompt: "¿Qué patrón podrías mirar con curiosidad y sin culparte?"
  },
  {
    number: "XVI",
    name: "La Torre",
    symbol: "ϟ",
    meaning: "Habla de cambios que cuestionan estructuras. No es un anuncio de desgracia: es una invitación a cuidar de ti mientras revisas lo que necesita actualizarse.",
    prompt: "¿Qué parte de tu vida pide una conversación honesta o un ajuste?"
  },
  {
    number: "XVII",
    name: "La Estrella",
    symbol: "☆",
    meaning: "Se asocia con esperanza, autenticidad y renovación. Puedes permitirte avanzar poco a poco, cuidando aquello que te devuelve confianza.",
    prompt: "¿Qué te ayuda a recuperar un poco de esperanza?"
  },
  {
    number: "XVIII",
    name: "La Luna",
    symbol: "☾",
    meaning: "Invita a reconocer emociones e incertidumbres sin tratarlas como hechos. Puedes esperar a tener más claridad antes de decidir.",
    prompt: "¿Qué sabes con certeza y qué todavía estás imaginando?"
  },
  {
    number: "XIX",
    name: "El Sol",
    symbol: "☼",
    meaning: "Representa vitalidad, claridad y disfrute. También es un recordatorio de notar y celebrar los momentos luminosos, incluso los sencillos.",
    prompt: "¿Qué pequeño momento de hoy merece ser apreciado?"
  },
  {
    number: "XX",
    name: "El Juicio",
    symbol: "⌁",
    meaning: "Se relaciona con revisión y nuevos llamados. Puedes aprender de tu historia sin quedarte definida por ella.",
    prompt: "¿Qué aprendizaje de tu pasado quieres llevar contigo de otra manera?"
  },
  {
    number: "XXI",
    name: "El Mundo",
    symbol: "◎",
    meaning: "Simboliza integración y cierre de ciclos. Reconocer cuánto has recorrido puede ayudarte a honrar el presente.",
    prompt: "¿Qué logro tuyo merece ser reconocido, aunque parezca pequeño?"
  }
];

const angelicPhrases = [
  "Estás acompañada; avanza con amor y confía en tu propio ritmo.",
  "La luz que buscas también vive en la ternura con la que te tratas.",
  "Respira: puedes dar el siguiente paso sin tener todo resuelto.",
  "Que la calma te ayude a escuchar lo que tu corazón necesita.",
  "Mereces recibir el mismo cuidado que entregas a los demás.",
  "Cada comienzo pequeño también es una forma de esperanza.",
  "Permítete soltar lo que pesa y conservar lo que te hace bien."
];

const dailyAffirmations = [
  "Confío en mi ritmo y doy un paso a la vez.",
  "Merezco tratarme con amor, paciencia y respeto.",
  "Puedo escucharme y elegir lo que me hace bien.",
  "Mi voz y mis necesidades también importan.",
  "Me permito comenzar de nuevo con calma.",
  "Reconozco todo lo que he recorrido y sigo creciendo.",
  "Hoy elijo estar presente y acompañarme con ternura."
];

const revealDailyCard = document.querySelector("#reveal-daily-card");
const dailyReading = document.querySelector("#daily-reading");

if (revealDailyCard && dailyReading) {
  const date = new Date();
  const dayKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  let dateSeed = 0;

  for (const character of dayKey) {
    dateSeed = (dateSeed * 31 + character.charCodeAt(0)) >>> 0;
  }

  const dailyCard = dailyCards[dateSeed % dailyCards.length];
  const formattedDate = new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long"
  }).format(date);

  const revealCard = () => {
    document.querySelector("#daily-card-number").textContent = dailyCard.number;
    document.querySelector("#daily-card-symbol").textContent = dailyCard.symbol;
    document.querySelector("#daily-card-name").textContent = dailyCard.name;
    document.querySelector("#daily-card-date").textContent = formattedDate;
    document.querySelector("#daily-reading-title").textContent = dailyCard.name;
    document.querySelector("#daily-reading-meaning").textContent = dailyCard.meaning;
    document.querySelector("#daily-angelic-phrase").textContent = angelicPhrases[dateSeed % angelicPhrases.length];
    document.querySelector("#daily-affirmation").textContent = dailyAffirmations[dateSeed % dailyAffirmations.length];
    document.querySelector("#daily-reading-prompt").textContent = dailyCard.prompt;
    dailyReading.hidden = false;
    revealDailyCard.textContent = "Carta de hoy revelada";
    revealDailyCard.disabled = true;
  };

  revealDailyCard.addEventListener("click", revealCard);
  document.querySelectorAll("[data-reveal-daily-card]").forEach((link) => {
    link.addEventListener("click", revealCard);
  });
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

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}