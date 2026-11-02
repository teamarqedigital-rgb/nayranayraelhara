(() => {
  "use strict";

  const $ = (selector) =>
    document.querySelector(selector);

  const SVG_NS =
    "http://www.w3.org/2000/svg";

  /* ============================================================
     UTILIDADES
  ============================================================ */

  const formatPosition = (position) => {
    return `${position.symbol} ${position.sign} ` +
      `${String(position.degree).padStart(2, "0")}° ` +
      `${String(position.minute).padStart(2, "0")}′`;
  };

  const getPlanet = (chart, key) =>
    chart.positions.find(
      (planet) => planet.key === key
    );

  const svg = (
    tag,
    attributes = {},
    text = ""
  ) => {
    const element =
      document.createElementNS(
        SVG_NS,
        tag
      );

    Object.entries(attributes).forEach(
      ([key, value]) => {
        element.setAttribute(
          key,
          String(value)
        );
      }
    );

    if (text) {
      element.textContent = text;
    }

    return element;
  };

  const pointOnWheel = (
    longitude,
    ascendant,
    radius
  ) => {
    const angle =
      (longitude - ascendant + 180) *
      Math.PI /
      180;

    return {
      x:
        360 +
        radius * Math.cos(angle),

      y:
        360 +
        radius * Math.sin(angle)
    };
  };

  /* ============================================================
     RUEDA
  ============================================================ */

  const renderWheel = (chart) => {
    const wheel =
      $("#map-chart-wheel");

    if (!wheel) return;

    const title =
      $("#map-chart-wheel-title");

    const description =
      $("#map-chart-wheel-description");

    const fragment =
      document.createDocumentFragment();

    const asc =
      chart.ascendant.longitudeDegrees;

    /* Anillos */

    [330, 278, 220, 72].forEach(
      (radius) => {
        fragment.appendChild(
          svg(
            "circle",
            {
              cx: 360,
              cy: 360,
              r: radius,
              class:
                "map-wheel-ring"
            }
          )
        );
      }
    );

    /* Signos */

    for (
      let longitude = 0;
      longitude < 360;
      longitude += 30
    ) {
      const start =
        pointOnWheel(
          longitude,
          asc,
          278
        );

      const end =
        pointOnWheel(
          longitude,
          asc,
          330
        );

      fragment.appendChild(
        svg(
          "line",
          {
            x1: start.x,
            y1: start.y,
            x2: end.x,
            y2: end.y,
            class:
              "map-wheel-zodiac-line"
          }
        )
      );

      const sign =
        chart.zodiacOrder[
          longitude / 30
        ];

      const label =
        pointOnWheel(
          longitude + 15,
          asc,
          304
        );

      fragment.appendChild(
        svg(
          "text",
          {
            x: label.x,
            y: label.y + 7,
            "text-anchor":
              "middle",
            class:
              "map-wheel-sign"
          },
          sign.symbol
        )
      );
    }

    /* Casas */

    chart.houses.forEach(
      (house) => {
        const point =
          pointOnWheel(
            house.longitudeDegrees,
            asc,
            220
          );

        fragment.appendChild(
          svg(
            "line",
            {
              x1: 360,
              y1: 360,
              x2: point.x,
              y2: point.y,
              class:
                "map-wheel-house-line"
            }
          )
        );
      }
    );

    /* Planetas */

    chart.positions.forEach(
      (planet) => {
        const point =
          pointOnWheel(
            planet.longitudeDegrees,
            asc,
            158
          );

        const group =
          svg("g");

        group.appendChild(
          svg(
            "circle",
            {
              cx: point.x,
              cy: point.y,
              r: 13,
              class:
                "map-wheel-planet-dot"
            }
          )
        );

        group.appendChild(
          svg(
            "text",
            {
              x: point.x,
              y: point.y + 6,
              "text-anchor":
                "middle",
              class:
                "map-wheel-planet"
            },
            planet.glyph
          )
        );

        const label =
          `${planet.name}: ${planet.sign}, ` +
          `casa ${planet.house}`;

        group.appendChild(
          svg(
            "title",
            {},
            label
          )
        );

        fragment.appendChild(group);
      }
    );

    /* ASC */

    const ascPoint =
      pointOnWheel(
        asc,
        asc,
        245
      );

    fragment.appendChild(
      svg(
        "text",
        {
          x: ascPoint.x,
          y: ascPoint.y,
          "text-anchor":
            "middle",
          class:
            "map-wheel-angle-label"
        },
        "ASC"
      )
    );

    /* MC */

    const mcPoint =
      pointOnWheel(
        chart.midheaven
          .longitudeDegrees,
        asc,
        245
      );

    fragment.appendChild(
      svg(
        "text",
        {
          x: mcPoint.x,
          y: mcPoint.y,
          "text-anchor":
            "middle",
          class:
            "map-wheel-angle-label"
        },
        "MC"
      )
    );

    if (title) {
      title.textContent =
        `Carta astral con Ascendente en ${chart.ascendant.sign}`;
    }

    if (description) {
      description.textContent =
        "Rueda zodiacal con planetas, casas y ángulos.";
    }

    wheel.replaceChildren(
      title,
      description,
      fragment
    );
  };

  /* ============================================================
     SOL · LUNA · ASCENDENTE
  ============================================================ */

  const renderMainKeys = (chart) => {
    const container =
      $("#map-main-keys");

    if (!container) return;

    const sun =
      getPlanet(chart, "sun");

    const moon =
      getPlanet(chart, "moon");

    const keys = [
      {
        symbol: "☉",
        title: "Sol",
        position: sun,
        description:
          "Tu centro simbólico y expresión de identidad."
      },
      {
        symbol: "☽",
        title: "Luna",
        position: moon,
        description:
          "Tu mundo emocional y necesidades internas."
      },
      {
        symbol: "↑",
        title: "Ascendente",
        position: chart.ascendant,
        description:
          "Tu forma simbólica de entrar en contacto con el mundo."
      }
    ];

    container.replaceChildren();

    keys.forEach(
      (item) => {
        if (!item.position) return;

        const card =
          document.createElement(
            "article"
          );

        card.className =
          "map-main-key";

        card.innerHTML = `
          <span class="map-main-key-symbol">
            ${item.symbol}
          </span>

          <p class="map-main-key-label">
            ${item.title}
          </p>

          <h3>
            ${item.position.sign}
          </h3>

          <p class="map-main-key-degree">
            ${String(
              item.position.degree
            ).padStart(2, "0")}°
            ${String(
              item.position.minute
            ).padStart(2, "0")}′
          </p>

          <p class="map-main-key-description">
            ${item.description}
          </p>
        `;

        container.appendChild(card);
      }
    );
  };

  /* ============================================================
     ÁNGULOS
  ============================================================ */

  const renderAngles = (chart) => {
    const list =
      $("#map-angle-list");

    if (!list) return;

    list.innerHTML = `
      <div>
        <dt>Ascendente</dt>
        <dd>
          ${formatPosition(
            chart.ascendant
          )}
        </dd>
      </div>

      <div>
        <dt>Medio Cielo</dt>
        <dd>
          ${formatPosition(
            chart.midheaven
          )}
        </dd>
      </div>
    `;
  };

  /* ============================================================
     PLANETAS
  ============================================================ */

  const renderPositions = (chart) => {
    const list =
      $("#map-position-list");

    if (!list) return;

    list.replaceChildren();

    chart.positions.forEach(
      (planet, index) => {
        const item =
          document.createElement(
            "li"
          );

        if (index >= 3) {
          item.classList.add(
            "map-position-secondary"
          );
        }

        const name =
          document.createElement(
            "span"
          );

        const value =
          document.createElement(
            "span"
          );

        name.textContent =
          planet.name;

        value.className =
          "map-position-value";

        value.textContent =
          `${formatPosition(planet)} · Casa ${planet.house}`;

        if (planet.retrograde) {
          value.textContent +=
            " · Retrógrado";
        }

        item.append(
          name,
          value
        );

        list.appendChild(item);
      }
    );

    if (chart.positions.length > 3) {
      const button =
        document.createElement(
          "button"
        );

      button.type = "button";
      button.className =
        "map-show-more";

      button.textContent =
        "Explorar todos los planetas";

      button.addEventListener(
        "click",
        () => {
          list
            .querySelectorAll(
              ".map-position-secondary"
            )
            .forEach(
              (item) =>
                item.classList.add(
                  "map-position-visible"
                )
            );

          button.remove();
        }
      );

      list.parentElement.appendChild(
        button
      );
    }
  };

  /* ============================================================
     CASAS
  ============================================================ */

  const renderHouses = (chart) => {
    const list =
      $("#map-house-list");

    if (!list) return;

    list.replaceChildren();

    chart.houses.forEach(
      (house) => {
        const item =
          document.createElement(
            "li"
          );

        item.textContent =
          `Casa ${house.number}: ` +
          `${formatPosition(house)}`;

        list.appendChild(item);
      }
    );
  };

  /* ============================================================
     ASPECTOS
  ============================================================ */

  const renderAspects = (chart) => {
    const list =
      $("#map-aspect-list");

    const count =
      $("#map-aspect-count");

    if (!list) return;

    list.replaceChildren();

    if (count) {
      count.textContent =
        `(${chart.aspects.length})`;
    }

    chart.aspects.forEach(
      (aspect) => {
        const item =
          document.createElement(
            "li"
          );

        const title =
          document.createElement(
            "strong"
          );

        const detail =
          document.createElement(
            "span"
          );

        title.textContent =
          `${aspect.point1} ` +
          `${aspect.name} ` +
          `${aspect.point2}`;

        detail.textContent =
          `Orbe: ${Number(
            aspect.orb
          ).toFixed(2)}°`;

        item.append(
          title,
          detail
        );

        list.appendChild(item);
      }
    );
  };

  /* ============================================================
     INTERPRETACIONES
  ============================================================ */

  const renderInterpretations = (
    chart
  ) => {
    const engine =
      globalThis
        .NayraAstralInterpretationEngine;

    if (!engine) {
      console.warn(
        "⚠️ Motor de interpretaciones no disponible."
      );
      return;
    }

    const interpretation =
      engine.interpret(chart);

    const grid =
      $("#map-interpretation-grid");

    if (!grid) return;

    grid.replaceChildren();

    interpretation.placements
      .slice(0, 3)
      .forEach(
        (item) => {
          const card =
            document.createElement(
              "article"
            );

          card.className =
            "map-interpretation-card";

          const title =
            document.createElement(
              "h4"
            );

          const description =
            document.createElement(
              "p"
            );

          const reflection =
            document.createElement(
              "p"
            );

          title.textContent =
            item.title;

          description.textContent =
            item.description;

          reflection.textContent =
            `Para explorar: ${item.reflection}`;

          card.append(
            title,
            description,
            reflection
          );

          grid.appendChild(card);
        }
      );
  };

  /* ============================================================
     RENDER PRINCIPAL
  ============================================================ */

  const render = (chart) => {
    console.log(
      "🎨 Nayra UI: renderizando carta..."
    );

    renderWheel(chart);
    renderMainKeys(chart);
    renderAngles(chart);
    renderPositions(chart);
    renderHouses(chart);
    renderAspects(chart);
    renderInterpretations(chart);

    console.log(
      "✨ Nayra UI: carta renderizada."
    );
  };

  /* ============================================================
     API
  ============================================================ */

  globalThis.NayraNatalChartUI =
    Object.freeze({
      render
    });
})();