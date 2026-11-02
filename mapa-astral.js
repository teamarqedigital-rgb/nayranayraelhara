(() => {
  "use strict";

  console.log("🌌 Nayra: mapa-astral.js inició");

  const $ = (selector) => document.querySelector(selector);

  const form = $("#birth-chart-form");
  const status = $("#map-form-status");
  const birthName = $("#birth-name");
  const birthDate = $("#birth-date");
  const birthTime = $("#birth-time");
  const birthCity = $("#birth-city");
  const birthCountry = $("#birth-country");
  const results = $("#map-results");

  /* ============================================================
     VALIDAR HTML
  ============================================================ */

  if (
    !form ||
    !status ||
    !birthName ||
    !birthDate ||
    !birthTime ||
    !birthCity ||
    !birthCountry ||
    !results
  ) {
    console.error("❌ Nayra: faltan elementos del formulario.");
    return;
  }

  /* ============================================================
     FECHA
  ============================================================ */

  const today = new Date();

  birthDate.min = "1900-01-01";
  birthDate.max = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  /* ============================================================
     UBICACIONES
  ============================================================ */

  const datalist = $("#colombia-places");

  if (!datalist) {
    status.textContent =
      "No se encontró la lista de ciudades colombianas.";
    return;
  }

  if (!globalThis.NayraColombiaLocation) {
    status.textContent =
      "No se cargó el módulo de ciudades.";
    console.error("❌ NayraColombiaLocation no disponible.");
    return;
  }

  try {
    globalThis.NayraColombiaLocation.populateDatalist(
      datalist
    );
  } catch (error) {
    console.error(error);
    status.textContent =
      "No se pudo cargar la lista de ciudades.";
    return;
  }

  /* ============================================================
     MOTOR ASTRAL
  ============================================================ */

  if (!globalThis.NayraNatalChartEngine) {
    status.textContent =
      "El motor de carta astral no se cargó.";
    console.error("❌ NayraNatalChartEngine no disponible.");
    return;
  }

  console.log("✅ Nayra: motor astral disponible");

  /* ============================================================
     PAÍS
  ============================================================ */

  const validateCountry = () => {
    const country = birthCountry.value
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    birthCountry.setCustomValidity(
      !country ||
      country === "colombia" ||
      country === "republica de colombia"
        ? ""
        : "Esta versión calcula cartas de lugares de nacimiento en Colombia."
    );
  };

  birthCountry.addEventListener(
    "input",
    validateCountry
  );

  /* ============================================================
     LIMPIAR MENSAJES
  ============================================================ */

  [birthName, birthCity, birthCountry].forEach(
    (field) => {
      field.addEventListener("input", () => {
        field.setCustomValidity("");
        status.textContent = "";
      });
    }
  );

  form.addEventListener("input", () => {
    results.hidden = true;
  });

  /* ============================================================
     VALIDAR FORMULARIO
  ============================================================ */

  const validateForm = () => {
    validateCountry();

    [birthName, birthCity, birthCountry].forEach(
      (field) => {
        if (!field.value.trim()) {
          field.setCustomValidity(
            "Completa este campo."
          );
        }
      }
    );

    return form.reportValidity();
  };

  /* ============================================================
     OBTENER DATOS DE NACIMIENTO
  ============================================================ */

  const getBirthData = () => {
    const [year, month, day] =
      birthDate.value.split("-").map(Number);

    const [hour, minute] =
      birthTime.value.split(":").map(Number);

    const place =
      globalThis.NayraColombiaLocation.resolvePlace(
        birthCity.value
      );

    return {
      year,
      month,
      day,
      hour,
      minute,
      place
    };
  };

  /* ============================================================
     MOSTRAR INFORMACIÓN SUPERIOR
  ============================================================ */

  const renderHeader = (chart) => {
    const greeting = $("#map-personal-greeting");
    const note = $("#map-results-note");

    if (greeting) {
      greeting.textContent =
        `Una lectura para ${birthName.value.trim()}.`;
    }

    if (note) {
      note.textContent =
        `Naciste en ${chart.location.label}. ` +
        `Hora local convertida a ${chart.utc} (${chart.timeZone}).`;
    }
  };

  /* ============================================================
     CALCULAR
  ============================================================ */

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("🚀 Nayra: calcular carta");

    status.textContent =
      "Calculando tu carta astral...";

    if (!validateForm()) {
      status.textContent =
        "Revisa los datos marcados en el formulario.";
      return;
    }

    try {
      const birthData = getBirthData();

      console.log(
        "📅 Datos de nacimiento:",
        birthData
      );

      const chart =
        globalThis.NayraNatalChartEngine
          .calculateNatalChart(birthData);

      console.log(
        "✅ Carta calculada:",
        chart
      );

      renderHeader(chart);

      if (
        !globalThis.NayraNatalChartUI
      ) {
        throw new Error(
          "No se cargó natal-chart-ui.js."
        );
      }

      globalThis.NayraNatalChartUI.render(
        chart
      );

      results.hidden = false;

      status.textContent =
        "✨ Tu carta astral está lista.";

      results.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    } catch (error) {
      console.error(
        "❌ ERROR CALCULANDO LA CARTA:",
        error
      );

      status.textContent =
        error instanceof Error
          ? `Error: ${error.message}`
          : "No fue posible calcular la carta astral.";
    }
  });

  console.log(
    "🎯 Nayra: formulario conectado."
  );
})();