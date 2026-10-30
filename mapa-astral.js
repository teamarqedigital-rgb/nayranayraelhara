(() => {
  const form = document.querySelector("#birth-chart-form");
  const status = document.querySelector("#map-form-status");
  const birthDate = document.querySelector("#birth-date");
  const birthTime = document.querySelector("#birth-time");
  const birthCountry = document.querySelector("#birth-country");
  const results = document.querySelector("#map-results");
  const resultsTitle = document.querySelector("#map-results-title");
  const resultsNote = document.querySelector("#map-results-note");
  const positionList = document.querySelector("#map-position-list");

  if (
    !form
    || !status
    || !birthDate
    || !birthTime
    || !birthCountry
    || !results
    || !resultsTitle
    || !resultsNote
    || !positionList
  ) {
    return;
  }

  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");
  birthDate.max = localToday;

  const requiredTextFields = [
    document.querySelector("#birth-name"),
    document.querySelector("#birth-city"),
    birthCountry
  ].filter(Boolean);

  const validateCountry = () => {
    const normalizedCountry = birthCountry.value.trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    birthCountry.setCustomValidity(
      !normalizedCountry || normalizedCountry === "colombia" || normalizedCountry === "republica de colombia"
        ? ""
        : "El cálculo inicial solo admite nacimientos en Colombia."
    );
  };

  const localBirthTimeToUtc = (dateValue, timeValue, timeZone) => {
    const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateValue);
    const timeMatch = /^(\d{2}):(\d{2})$/.exec(timeValue);
    if (!dateMatch || !timeMatch) {
      throw new TypeError("Ingresa una fecha y una hora de nacimiento válidas.");
    }

    const [, yearText, monthText, dayText] = dateMatch;
    const [, hourText, minuteText] = timeMatch;
    const year = Number(yearText);
    const month = Number(monthText);
    const day = Number(dayText);
    const hour = Number(hourText);
    const minute = Number(minuteText);
    const localAsUtc = Date.UTC(year, month - 1, day, hour, minute);
    const requested = new Date(localAsUtc);

    if (
      year < 1
      || requested.getUTCFullYear() !== year
      || requested.getUTCMonth() !== month - 1
      || requested.getUTCDate() !== day
      || hour > 23
      || minute > 59
    ) {
      throw new TypeError("La fecha o la hora de nacimiento no es válida.");
    }

    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23"
    });
    const formatInZone = (instant) => {
      const parts = Object.fromEntries(
        formatter.formatToParts(instant)
          .filter(({ type }) => type !== "literal")
          .map(({ type, value }) => [type, Number(value)])
      );
      return {
        ...parts,
        asUtc: Date.UTC(
          parts.year,
          parts.month - 1,
          parts.day,
          parts.hour,
          parts.minute
        )
      };
    };
    const requestedKey = [year, month, day, hour, minute].join("-");
    const matchingInstants = new Set();

    for (let hours = -36; hours <= 36; hours += 6) {
      const sample = new Date(localAsUtc + hours * 60 * 60 * 1000);
      const sampleInZone = formatInZone(sample);
      const offsetMilliseconds = sampleInZone.asUtc - sample.getTime();
      const candidate = new Date(localAsUtc - offsetMilliseconds);
      const candidateInZone = formatInZone(candidate);
      const candidateKey = [
        candidateInZone.year,
        candidateInZone.month,
        candidateInZone.day,
        candidateInZone.hour,
        candidateInZone.minute
      ].join("-");

      if (candidateKey === requestedKey) {
        matchingInstants.add(candidate.getTime());
      }
    }

    if (matchingInstants.size === 0) {
      throw new RangeError("Esa hora local no existe en la zona horaria del lugar. Verifica los datos.");
    }
    if (matchingInstants.size > 1) {
      throw new RangeError("Esa hora local es ambigua por un cambio horario histórico. Confirma la hora con el registro de nacimiento.");
    }

    return new Date(matchingInstants.values().next().value);
  };

  const renderPositions = (positions) => {
    const fragment = document.createDocumentFragment();

    positions.forEach((position) => {
      const item = document.createElement("li");
      const name = document.createElement("span");
      const value = document.createElement("span");
      const degree = String(position.zodiac.degree).padStart(2, "0");
      const minute = String(position.zodiac.minute).padStart(2, "0");

      name.textContent = position.name;
      value.className = "map-position-value";
      value.textContent = `${position.zodiac.symbol} ${position.zodiac.sign} ${degree}° ${minute}′`;
      item.append(name, value);
      fragment.append(item);
    });

    positionList.replaceChildren(fragment);
  };

  requiredTextFields.forEach((field) => {
    field.addEventListener("input", () => {
      field.setCustomValidity("");
      status.textContent = "";
    });
  });

  birthCountry.addEventListener("input", validateCountry);

  form.addEventListener("input", () => {
    status.textContent = "";
    results.hidden = true;
    positionList.replaceChildren();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    validateCountry();

    requiredTextFields.forEach((field) => {
      if (field !== birthCountry) {
        field.setCustomValidity(field.value.trim() ? "" : "Completa este campo.");
      }
    });

    if (!form.reportValidity()) {
      return;
    }

    try {
      if (!globalThis.NayraAstralEphemeris) {
        throw new Error("El motor astronómico no está cargado. Recarga la página e inténtalo de nuevo.");
      }

      const utcDate = localBirthTimeToUtc(
        birthDate.value,
        birthTime.value,
        "America/Bogota"
      );
      const chart = globalThis.NayraAstralEphemeris.calculatePlanetaryPositions(utcDate);
      renderPositions(chart.positions);
      resultsNote.textContent = `Hora local de Colombia convertida a UTC (${chart.utc}). El cálculo se realizó en tu navegador; tus datos no se enviaron ni se guardaron.`;
      results.hidden = false;
      status.textContent = "Listo: ya puedes consultar tus posiciones planetarias y signos.";
      resultsTitle.focus();
    } catch (error) {
      console.error("No fue posible calcular las posiciones del mapa astral.", error);
      status.textContent = error instanceof Error
        ? error.message
        : "No fue posible calcular las posiciones. Revisa los datos e inténtalo de nuevo.";
    }
  });
})();
