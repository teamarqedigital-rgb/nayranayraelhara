(() => {
  const places = globalThis.NAYRA_COLOMBIA_PLACES;

  if (!Array.isArray(places) || places.length === 0) {
    throw new Error("No se pudo cargar el índice local de lugares de Colombia.");
  }

  const normalize = (value) => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  const indexedPlaces = places.map((place) => ({
    ...place,
    label: `${place.name} — ${place.department}`,
    searchNames: new Set([
      normalize(place.name),
      normalize(place.ascii),
      normalize(`${place.name} ${place.department}`),
      normalize(`${place.ascii} ${place.department}`)
    ])
  }));

  const populateDatalist = (datalist) => {
    const fragment = document.createDocumentFragment();
    indexedPlaces.forEach((place) => {
      const option = document.createElement("option");
      option.value = place.label;
      fragment.append(option);
    });
    datalist.replaceChildren(fragment);
  };

  const resolvePlace = (value) => {
    const query = normalize(value);
    if (!query) {
      throw new TypeError("Elige un municipio colombiano de la lista de lugares.");
    }

    const matches = indexedPlaces.filter((place) => place.searchNames.has(query));
    if (matches.length !== 1) {
      throw new RangeError(
        "Selecciona un municipio colombiano de las sugerencias para usar sus coordenadas aproximadas."
      );
    }

    return matches[0];
  };

  globalThis.NayraColombiaLocation = Object.freeze({
    count: indexedPlaces.length,
    populateDatalist,
    resolvePlace
  });
})();
