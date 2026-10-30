(() => {
  const global = globalThis;
  const planets = [
    ["Sun", "Sol"],
    ["Moon", "Luna"],
    ["Mercury", "Mercurio"],
    ["Venus", "Venus"],
    ["Mars", "Marte"],
    ["Jupiter", "Jupiter"],
    ["Saturn", "Saturno"],
    ["Uranus", "Urano"],
    ["Neptune", "Neptuno"],
    ["Pluto", "Pluton"]
  ];
  const zodiacSigns = [
    { name: "Aries", symbol: "♈" },
    { name: "Tauro", symbol: "♉" },
    { name: "Géminis", symbol: "♊" },
    { name: "Cáncer", symbol: "♋" },
    { name: "Leo", symbol: "♌" },
    { name: "Virgo", symbol: "♍" },
    { name: "Libra", symbol: "♎" },
    { name: "Escorpio", symbol: "♏" },
    { name: "Sagitario", symbol: "♐" },
    { name: "Capricornio", symbol: "♑" },
    { name: "Acuario", symbol: "♒" },
    { name: "Piscis", symbol: "♓" }
  ];

  const getZodiacPosition = (longitudeDegrees) => {
    if (
      !Number.isFinite(longitudeDegrees)
      || longitudeDegrees < 0
      || longitudeDegrees >= 360
    ) {
      throw new RangeError("La longitud zodiacal debe estar entre 0° y menos de 360°.");
    }

    const arcMinutes = Math.round(longitudeDegrees * 60) % (360 * 60);
    const signIndex = Math.floor(arcMinutes / (30 * 60));
    const degreeWithinSign = Math.floor((arcMinutes % (30 * 60)) / 60);
    const minuteWithinSign = arcMinutes % 60;

    return {
      sign: zodiacSigns[signIndex].name,
      symbol: zodiacSigns[signIndex].symbol,
      degree: degreeWithinSign,
      minute: minuteWithinSign
    };
  };

  const getAstronomy = () => {
    if (
      !global.Astronomy
      || typeof global.Astronomy.GeoVector !== "function"
      || typeof global.Astronomy.Rotation_EQJ_ECT !== "function"
      || typeof global.Astronomy.RotateVector !== "function"
      || typeof global.Astronomy.SphereFromVector !== "function"
      || typeof global.Astronomy.SunPosition !== "function"
    ) {
      throw new Error("Astronomy Engine no está disponible. Comprueba que se cargó el archivo astronómico.");
    }

    return global.Astronomy;
  };

  const calculatePlanetaryPositions = (utcDate) => {
    if (!(utcDate instanceof Date) || !Number.isFinite(utcDate.getTime())) {
      throw new TypeError("Se requiere una fecha válida de JavaScript convertida previamente a UTC.");
    }

    const astronomy = getAstronomy();
    const astroTime = new astronomy.AstroTime(utcDate);
    const julianDayUT = 2451545 + astroTime.ut;

    if (!Number.isFinite(julianDayUT)) {
      throw new Error("Astronomy Engine no pudo obtener el día juliano para esta fecha.");
    }

    const positions = planets.map(([body, name]) => {
      const longitudeDegrees = body === "Sun"
        ? astronomy.SunPosition(utcDate).elon
        : astronomy.SphereFromVector(
          astronomy.RotateVector(
            astronomy.Rotation_EQJ_ECT(utcDate),
            astronomy.GeoVector(astronomy.Body[body], utcDate, true)
          )
        ).lon;

      if (!Number.isFinite(longitudeDegrees) || longitudeDegrees < 0 || longitudeDegrees >= 360) {
        throw new Error(`Astronomy Engine devolvió una longitud eclíptica no válida para ${name}.`);
      }

      return {
        body,
        name,
        longitudeDegrees,
        zodiac: getZodiacPosition(longitudeDegrees)
      };
    });

    return {
      utc: utcDate.toISOString(),
      julianDayUT,
      coordinateSystem: "true ecliptic of date",
      positions
    };
  };

  global.NayraAstralEphemeris = Object.freeze({
    calculatePlanetaryPositions,
    getZodiacPosition
  });
})();
