(() => {
  const moduleShim = { exports: {} };
  globalThis.NAYRA_NATAL_MODULE = moduleShim;
  globalThis.module = moduleShim;
  globalThis.exports = moduleShim.exports;
})();
