const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const context = vm.createContext({
  console: { error() {} },
  Date,
  Error,
  Intl,
  Map,
  Math,
  Number,
  Object,
  RangeError,
  Set,
  String,
  TypeError
});

for (const relativePath of [
  "astral/natal-chart-bootstrap.js",
  "astral/vendor/circular-natal-horoscope.browser.js",
  "astral/natal-chart-ready.js",
  "astral/colombia-places.js",
  "astral/colombia-location.js",
  "astral/natal-chart-engine.js",
  "astral/interpretations-es.js",
  "astral/interpretation-engine.js"
]) {
  vm.runInContext(
    fs.readFileSync(path.join(root, relativePath), "utf8"),
    context,
    { filename: relativePath }
  );
}

const locations = context.NayraColombiaLocation;
const bogota = locations.resolvePlace("Bogota");
const labeledBogota = locations.resolvePlace(bogota.label);
assert.equal(locations.count, context.NAYRA_COLOMBIA_PLACES.length);
assert.equal(bogota.name, "Bogotá");
assert.equal(labeledBogota.latitude, bogota.latitude);
assert.throws(
  () => locations.resolvePlace("Ciudad que no existe"),
  { name: "RangeError" }
);

const calculate = context.NayraNatalChartEngine.calculateNatalChart;
const birthData = {
  year: 2000,
  month: 1,
  day: 1,
  hour: 12,
  minute: 0,
  place: bogota
};
const chart = JSON.parse(JSON.stringify(calculate(birthData)));
const repeatedChart = JSON.parse(JSON.stringify(calculate(birthData)));

assert.deepEqual(chart, repeatedChart);
assert.equal(chart.utc, "2000-01-01T17:00:00Z");
assert.equal(chart.timeZone, "America/Bogota");
assert.equal(chart.houseSystem, "Placidus");
assert.equal(chart.zodiacSystem, "tropical");
assert.equal(chart.positions.length, 10);
assert.equal(chart.houses.length, 12);
assert.equal(chart.houses[0].number, 1);
assert.equal(chart.houses[11].number, 12);
assert.equal(chart.houses[0].longitudeDegrees, chart.ascendant.longitudeDegrees);
assert.equal(chart.houses[9].longitudeDegrees, chart.midheaven.longitudeDegrees);
assert.ok(chart.aspects.length > 0);
assert.ok(chart.positions.every((position) =>
  Number.isFinite(position.longitudeDegrees)
  && typeof position.glyph === "string"
  && Number.isInteger(position.house)
  && position.house >= 1
  && position.house <= 12
));
assert.ok(chart.aspects.every((aspect) =>
  ["conjunction", "sextile", "square", "trine", "opposition"].includes(aspect.key)
  && Number.isFinite(aspect.orb)
));

const interpretation = JSON.parse(JSON.stringify(
  context.NayraAstralInterpretationEngine.interpret(chart)
));
assert.deepEqual(
  interpretation.placements.map(({ key }) => key),
  ["sun", "moon", "ascendant"]
);
assert.equal(interpretation.aspects.length, chart.aspects.length);

assert.throws(
  () => calculate({ ...birthData, year: 1899 }),
  { name: "TypeError" }
);
assert.throws(
  () => calculate({ ...birthData, hour: 24 }),
  { name: "TypeError" }
);
assert.throws(
  () => calculate({
    ...birthData,
    year: 1992,
    month: 5,
    day: 3,
    hour: 0,
    minute: 30
  }),
  { name: "RangeError" }
);
assert.throws(
  () => calculate({
    ...birthData,
    year: 1993,
    month: 4,
    day: 3,
    hour: 23,
    minute: 30
  }),
  { name: "RangeError" }
);

console.log("Full natal chart tests passed.");
