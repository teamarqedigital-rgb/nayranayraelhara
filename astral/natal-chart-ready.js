(() => {
  const moduleShim = globalThis.NAYRA_NATAL_MODULE;
  const library = moduleShim?.exports;

  if (!library || typeof library.Origin !== "function" || typeof library.Horoscope !== "function") {
    throw new Error("No se pudo cargar el motor completo de carta astral.");
  }

  globalThis.NayraNatalChartLibrary = library;
  delete globalThis.module;
  delete globalThis.exports;
  delete globalThis.NAYRA_NATAL_MODULE;
})();
