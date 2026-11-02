(() => {
  const data = {
    dimensions: {
      sun: {
        label: "Sol",
        focus: "identidad, vitalidad y dirección personal"
      },
      moon: {
        label: "Luna",
        focus: "necesidades emocionales, cuidado y refugio interno"
      },
      ascendant: {
        label: "Ascendente",
        focus: "la forma de iniciar experiencias y encontrarte con el entorno"
      }
    },
    signs: {
      aries: {
        label: "Aries",
        theme: "iniciativa, valentía y el impulso de abrir caminos",
        question: "¿Qué comienzo pequeño y auténtico podrías permitirte hoy?"
      },
      taurus: {
        label: "Tauro",
        theme: "presencia, estabilidad y el valor de cuidar lo que crece",
        question: "¿Qué merece tu paciencia y atención en este momento?"
      },
      gemini: {
        label: "Géminis",
        theme: "curiosidad, intercambio y la libertad de aprender",
        question: "¿Qué conversación o pregunta podría ampliar tu mirada?"
      },
      cancer: {
        label: "Cáncer",
        theme: "pertenencia, sensibilidad y el cuidado de los vínculos",
        question: "¿Qué gesto de cuidado también necesitas recibir?"
      },
      leo: {
        label: "Leo",
        theme: "creatividad, calidez y el permiso de expresarte",
        question: "¿Qué parte de ti quiere ser compartida sin buscar aprobación?"
      },
      virgo: {
        label: "Virgo",
        theme: "atención, discernimiento y el sentido de las prácticas cotidianas",
        question: "¿Qué paso sencillo haría tu día un poco más habitable?"
      },
      libra: {
        label: "Libra",
        theme: "reciprocidad, armonía y la búsqueda de acuerdos justos",
        question: "¿Dónde puedes cuidar el encuentro sin dejarte de lado?"
      },
      scorpio: {
        label: "Escorpio",
        theme: "profundidad, honestidad y la posibilidad de transformarte",
        question: "¿Qué verdad puedes mirar con compasión y a tu propio ritmo?"
      },
      sagittarius: {
        label: "Sagitario",
        theme: "exploración, sentido y apertura a nuevos horizontes",
        question: "¿Qué experiencia podría acercarte a una perspectiva más amplia?"
      },
      capricorn: {
        label: "Capricornio",
        theme: "compromiso, estructura y la construcción paciente de proyectos",
        question: "¿Qué paso sostenible te acerca a lo que valoras?"
      },
      aquarius: {
        label: "Acuario",
        theme: "perspectiva, independencia y la imaginación de otras posibilidades",
        question: "¿Qué idea merece espacio aunque todavía no tenga forma?"
      },
      pisces: {
        label: "Piscis",
        theme: "imaginación, sensibilidad y la escucha de lo sutil",
        question: "¿Qué límite amoroso ayudaría a cuidar tu sensibilidad?"
      }
    },
    aspects: {
      conjunction: {
        label: "Conjunción",
        reflection: "Dos funciones simbólicas se encuentran y concentran su expresión."
      },
      sextile: {
        label: "Sextil",
        reflection: "Una conexión potencial puede crecer con atención y práctica."
      },
      square: {
        label: "Cuadratura",
        reflection: "La tensión entre dos impulsos invita a revisar hábitos y buscar movimiento."
      },
      trine: {
        label: "Trígono",
        reflection: "Una afinidad simbólica puede sentirse fluida; cultivar conciencia evita darla por sentada."
      },
      opposition: {
        label: "Oposición",
        reflection: "Dos polos se reflejan y pueden invitar a integrar perspectivas complementarias."
      }
    }
  };

  globalThis.NayraAstralInterpretations = Object.freeze(data);
})();
