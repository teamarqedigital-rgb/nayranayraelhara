(() => {
  const interpret = (chart) => {
    const data = globalThis.NayraAstralInterpretations;
    if (!data || !chart) {
      throw new Error("No se pudo cargar el contenido de interpretación.");
    }

    const placements = [
      { key: "sun", placement: chart.positions.find(({ key }) => key === "sun") },
      { key: "moon", placement: chart.positions.find(({ key }) => key === "moon") },
      { key: "ascendant", placement: chart.ascendant }
    ].map(({ key, placement }) => {
      const dimension = data.dimensions[key];
      const sign = placement && data.signs[placement.signKey];
      if (!dimension || !sign) {
        throw new Error(`No hay una interpretación disponible para ${key}.`);
      }

      return {
        key,
        title: `${dimension.label} en ${sign.label}`,
        description: `${sign.theme}. En esta dimensión, puede ser una invitación a observar ${dimension.focus}.`,
        reflection: sign.question
      };
    });

    const aspects = chart.aspects.map((aspect) => {
      const interpretation = data.aspects[aspect.key];
      if (!interpretation) {
        throw new Error(`No hay una interpretación disponible para ${aspect.name}.`);
      }

      return {
        title: `${aspect.point1} ${interpretation.label} ${aspect.point2}`,
        description: interpretation.reflection
      };
    });

    return { placements, aspects };
  };

  globalThis.NayraAstralInterpretationEngine = Object.freeze({ interpret });
})();
