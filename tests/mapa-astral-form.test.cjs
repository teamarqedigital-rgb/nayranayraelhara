const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");

class Element {
  constructor(value = "") {
    this.value = value;
    this.textContent = "";
    this.className = "";
    this.hidden = false;
    this.listeners = {};
    this.children = [];
    this.validityMessage = "";
    this.attributes = {};
  }

  addEventListener(type, callback) {
    this.listeners[type] = callback;
  }

  dispatch(type) {
    this.listeners[type]?.();
  }

  setCustomValidity(message) {
    this.validityMessage = message;
  }

  reportValidity() {
    return !this.validityMessage;
  }

  append(...elements) {
    this.children.push(...elements);
  }

  replaceChildren(...elements) {
    this.children = elements.flatMap((element) => element.children ?? [element]);
  }

  focus() {}
}

const elements = new Map([
  ["#birth-chart-form", new Element()],
  ["#map-form-status", new Element()],
  ["#birth-date", new Element("2000-01-01")],
  ["#birth-time", new Element("12:00")],
  ["#birth-name", new Element("Nayra")],
  ["#birth-city", new Element("Bogotá")],
  ["#birth-country", new Element("Colombia")],
  ["#map-results", new Element()],
  ["#map-results-title", new Element()],
  ["#map-results-note", new Element()],
  ["#map-position-list", new Element()]
]);
const formFields = [
  elements.get("#birth-name"),
  elements.get("#birth-date"),
  elements.get("#birth-time"),
  elements.get("#birth-city"),
  elements.get("#birth-country")
];
elements.get("#birth-chart-form").reportValidity = () =>
  formFields.every((field) => field.value.trim() && !field.validityMessage);

const document = {
  querySelector: (selector) => elements.get(selector) ?? null,
  createElement: () => new Element(),
  createDocumentFragment: () => new Element()
};
const context = vm.createContext({
  Date,
  Error,
  Intl,
  Number,
  Object,
  String,
  TypeError,
  RangeError,
  console: { error() {} },
  document
});

for (const relativePath of [
  "astral/vendor/astronomy.browser.min.js",
  "astral/ephemeris-engine.js",
  "mapa-astral.js"
]) {
  vm.runInContext(
    fs.readFileSync(path.join(root, relativePath), "utf8"),
    context,
    { filename: relativePath }
  );
}

let preventedDefault = false;
elements.get("#birth-chart-form").listeners.submit({
  preventDefault() {
    preventedDefault = true;
  }
});

assert.equal(preventedDefault, true);
assert.equal(elements.get("#map-results").hidden, false);
assert.equal(elements.get("#map-position-list").children.length, 10);
assert.match(elements.get("#map-results-note").textContent, /2000-01-01T17:00:00\.000Z/);
assert.match(elements.get("#map-form-status").textContent, /ya puedes consultar/);

elements.get("#birth-country").value = "Argentina";
elements.get("#birth-country").dispatch("input");
elements.get("#birth-chart-form").dispatch("input");
elements.get("#birth-chart-form").listeners.submit({
  preventDefault() {}
});

assert.equal(elements.get("#birth-country").validityMessage, "El cálculo inicial solo admite nacimientos en Colombia.");
assert.equal(elements.get("#map-results").hidden, true);
assert.equal(elements.get("#map-position-list").children.length, 0);

console.log("Astral map form tests passed.");
