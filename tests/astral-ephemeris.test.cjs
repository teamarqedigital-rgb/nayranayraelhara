const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const context = vm.createContext({ Date, Error, Number, Object, TypeError });

for (const relativePath of [
  "astral/vendor/astronomy.browser.min.js",
  "astral/ephemeris-engine.js"
]) {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  vm.runInContext(source, context, { filename: relativePath });
}

const calculate = context.NayraAstralEphemeris.calculatePlanetaryPositions;
const getZodiacPosition = (longitude) =>
  JSON.parse(JSON.stringify(context.NayraAstralEphemeris.getZodiacPosition(longitude)));
const birthDate = new Date("2000-01-01T12:00:00.000Z");
const firstResult = JSON.parse(JSON.stringify(calculate(birthDate)));
const repeatedResult = JSON.parse(JSON.stringify(calculate(birthDate)));

assert.deepEqual(firstResult, repeatedResult);
assert.equal(firstResult.utc, "2000-01-01T12:00:00.000Z");
assert.equal(firstResult.positions.length, 10);
assert.ok(Number.isFinite(firstResult.julianDayUT));
assert.ok(Math.abs(firstResult.julianDayUT - 2451545.0) < 1e-8);
assert.ok(
  Math.abs(firstResult.positions[0].longitudeDegrees - context.Astronomy.SunPosition(birthDate).elon) < 1e-12
);

for (const position of firstResult.positions) {
  assert.ok(Number.isFinite(position.longitudeDegrees));
  assert.ok(position.longitudeDegrees >= 0 && position.longitudeDegrees < 360);
  assert.deepEqual(
    position.zodiac,
    getZodiacPosition(position.longitudeDegrees)
  );
}

assert.deepEqual(getZodiacPosition(0), {
  sign: "Aries",
  symbol: "♈",
  degree: 0,
  minute: 0
});
assert.deepEqual(getZodiacPosition(30), {
  sign: "Tauro",
  symbol: "♉",
  degree: 0,
  minute: 0
});
assert.deepEqual(getZodiacPosition(29 + 59 / 60), {
  sign: "Aries",
  symbol: "♈",
  degree: 29,
  minute: 59
});
assert.deepEqual(getZodiacPosition(29 + 59.6 / 60), {
  sign: "Tauro",
  symbol: "♉",
  degree: 0,
  minute: 0
});
assert.deepEqual(getZodiacPosition(359.9999), {
  sign: "Aries",
  symbol: "♈",
  degree: 0,
  minute: 0
});
assert.throws(() => getZodiacPosition(-0.1), { name: "RangeError" });
assert.throws(() => getZodiacPosition(360), { name: "RangeError" });
assert.throws(() => getZodiacPosition(Number.NaN), { name: "RangeError" });

assert.throws(
  () => calculate("2000-01-01T12:00:00.000Z"),
  { name: "TypeError" }
);
assert.throws(
  () => calculate(new Date("invalid")),
  { name: "TypeError" }
);

console.log("Astral ephemeris tests passed.");
