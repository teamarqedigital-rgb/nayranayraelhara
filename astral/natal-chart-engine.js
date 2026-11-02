(() => {
  const global = globalThis;
  const zodiac = [
    { key: "aries", label: "Aries", symbol: "♈" },
    { key: "taurus", label: "Tauro", symbol: "♉" },
    { key: "gemini", label: "Géminis", symbol: "♊" },
    { key: "cancer", label: "Cáncer", symbol: "♋" },
    { key: "leo", label: "Leo", symbol: "♌" },
    { key: "virgo", label: "Virgo", symbol: "♍" },
    { key: "libra", label: "Libra", symbol: "♎" },
    { key: "scorpio", label: "Escorpio", symbol: "♏" },
    { key: "sagittarius", label: "Sagitario", symbol: "♐" },
    { key: "capricorn", label: "Capricornio", symbol: "♑" },
    { key: "aquarius", label: "Acuario", symbol: "♒" },
    { key: "pisces", label: "Piscis", symbol: "♓" }
  ];
  const planetKeys = [
    "sun",
    "moon",
    "mercury",
    "venus",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
    "pluto"
  ];
  const planetGlyphs = {
    sun: "☉",
    moon: "☽",
    mercury: "☿",
    venus: "♀",
    mars: "♂",
    jupiter: "♃",
    saturn: "♄",
    uranus: "♅",
    neptune: "♆",
    pluto: "♇"
  };
  const majorAspects = new Set([
    "conjunction",
    "sextile",
    "square",
    "trine",
    "opposition"
  ]);
  const modulo = (value, divisor) => ((value % divisor) + divisor) % divisor;
  const formatArc = (longitudeDegrees, zodiacSign) => {
    let signIndex = zodiac.findIndex(({ key }) => key === zodiacSign.key);
    if (signIndex < 0) {
      throw new Error("El motor devolvió un signo zodiacal desconocido.");
    }

    let arcSeconds = Math.round(
      modulo(longitudeDegrees - zodiacSign.zodiacStart, 30) * 3600
    );
    if (arcSeconds >= 30 * 60 * 60) {
      signIndex = (signIndex + 1) % zodiac.length;
      arcSeconds = 0;
    }

    return {
      signKey: zodiac[signIndex].key,
      sign: zodiac[signIndex].label,
      symbol: zodiac[signIndex].symbol,
      degree: Math.floor(arcSeconds / 3600),
      minute: Math.floor((arcSeconds % 3600) / 60),
      second: arcSeconds % 60
    };
  };

  const toPlacement = (chartPoint) => {
    const longitudeDegrees = chartPoint.ChartPosition.Ecliptic.DecimalDegrees;
    if (!Number.isFinite(longitudeDegrees)) {
      throw new Error("El motor devolvió una posición zodiacal no válida.");
    }

    const position = formatArc(longitudeDegrees, chartPoint.Sign);
    return {
      longitudeDegrees,
      ...position
    };
  };

  const validateLocalTime = (origin, year, month, day, hour, minute) => {
    const localTime = origin.localTime;
    if (
      localTime.year() !== year
      || localTime.month() !== month - 1
      || localTime.date() !== day
      || localTime.hour() !== hour
      || localTime.minute() !== minute
    ) {
      throw new RangeError(
        "La hora local no existe en la zona horaria del lugar por un cambio horario histórico. Verifica la hora."
      );
    }

    const zone = origin.timezone;
    const localAsUtc = Date.UTC(year, month - 1, day, hour, minute);
    const possibleOffsets = new Set(zone.offsets);
    const matchingInstants = new Set();

    possibleOffsets.forEach((offsetMinutes) => {
      const candidate = localAsUtc + offsetMinutes * 60 * 1000;
      if (zone.utcOffset(candidate) === offsetMinutes) {
        matchingInstants.add(candidate);
      }
    });

    if (matchingInstants.size > 1) {
      throw new RangeError(
        "La hora local es ambigua por un cambio horario histórico. Confirma la hora con el registro de nacimiento."
      );
    }

    if (
      matchingInstants.size === 0
      || origin.utcTime.valueOf() !== matchingInstants.values().next().value
    ) {
      throw new RangeError("No se pudo convertir de forma inequívoca la hora local a UTC.");
    }
  };

  const calculateNatalChart = (birthData) => {
    if (!birthData || !global.NayraNatalChartLibrary) {
      throw new Error("No se pudo cargar el motor de carta astral. Recarga la página e inténtalo de nuevo.");
    }

    const { year, month, day, hour, minute } = birthData;
    const { latitude, longitude } = birthData.place ?? {};
    if (
      ![year, month, day, hour, minute, latitude, longitude].every(Number.isFinite)
      || year < 1900
      || month < 1
      || month > 12
      || hour < 0
      || hour > 23
      || minute < 0
      || minute > 59
      || latitude < -90
      || latitude > 90
      || longitude < -180
      || longitude > 180
    ) {
      throw new TypeError("La fecha, hora o ubicación no es válida.");
    }

    const dateCheck = new Date(Date.UTC(year, month - 1, day));
    if (
      dateCheck.getUTCFullYear() !== year
      || dateCheck.getUTCMonth() !== month - 1
      || dateCheck.getUTCDate() !== day
    ) {
      throw new TypeError("La fecha de nacimiento no existe.");
    }

    const { Origin, Horoscope } = global.NayraNatalChartLibrary;
    const origin = new Origin({
      year,
      month: month - 1,
      date: day,
      hour,
      minute,
      latitude,
      longitude
    });
    validateLocalTime(origin, year, month, day, hour, minute);

    const horoscope = new Horoscope({
      origin,
      houseSystem: "placidus",
      zodiac: "tropical",
      aspectPoints: ["bodies", "angles"],
      aspectWithPoints: ["bodies", "angles"],
      aspectTypes: ["major"],
      language: "es"
    });

    const positions = planetKeys.map((key) => {
      const body = horoscope.CelestialBodies[key];
      if (!body) {
        throw new Error(`El motor no devolvió la posición de ${key}.`);
      }
      return {
        key,
        name: body.label,
        glyph: planetGlyphs[key],
        ...toPlacement(body),
        house: body.House.id,
        retrograde: Boolean(body.isRetrograde)
      };
    });

    const houses = horoscope.Houses.map((house) => {
      const position = house.ChartPosition.StartPosition;
      return {
        number: house.id,
        longitudeDegrees: position.Ecliptic.DecimalDegrees,
        ...formatArc(position.Ecliptic.DecimalDegrees, house.Sign)
      };
    });

    if (houses.length !== 12 || positions.length !== 10) {
      throw new Error("El motor no devolvió todos los elementos de la carta.");
    }

    const aspects = horoscope.Aspects.all
      .filter(({ aspectKey }) => majorAspects.has(aspectKey))
      .map((aspect) => ({
        key: aspect.aspectKey,
        name: aspect.label,
        point1Key: aspect.point1Key,
        point1: aspect.point1Label,
        point2Key: aspect.point2Key,
        point2: aspect.point2Label,
        orb: aspect.orb
      }));

    return {
      utc: origin.utcTimeFormatted,
      timeZone: origin.timezone.name,
      location: {
        label: birthData.place.label,
        latitude,
        longitude
      },
      houseSystem: "Placidus",
      zodiacSystem: "tropical",
      zodiacOrder: zodiac.map(({ key, label, symbol }) => ({ key, label, symbol })),
      ascendant: toPlacement(horoscope.Ascendant),
      midheaven: toPlacement(horoscope.Midheaven),
      positions,
      houses,
      aspects
    };
  };

  global.NayraNatalChartEngine = Object.freeze({ calculateNatalChart });
})();
