const { safeParseInteger, safeParseJson, safeParseNumber } = require("./main");
const Maybe = require("crocks/Maybe");
const Result = require("crocks/Result");
const safe = require("crocks/Maybe/safe");
const safeAfter = require("crocks/Maybe/safeAfter");
const safeLift = require("crocks/Maybe/safeLift");

const isDefined = require("crocks/predicates/isDefined");
const isInteger = require("crocks/predicates/isInteger");
const isNumber = require("crocks/predicates/isNumber");
const isObject = require("crocks/predicates/isObject");

const { Just, Nothing } = Maybe;
const { Err, Ok } = Result;

describe("Some examples!", () => {
  test("safe allows us to determine if a value meets some pre-defined criteria", () => {
    expect(safe(isObject, "foo").equals(Nothing())).toBeTruthy();
    expect(safe(isObject, {}).equals(Just({}))).toBeTruthy();
  });

  test("We can use many different types of predicates to check the passed in value", () => {
    expect(safe(isNumber, 10).equals(Just(10))).toBeTruthy();
    expect(safe(isInteger, 10).equals(Just(10))).toBeTruthy();
    expect(safe(isInteger, 10.1).equals(Nothing())).toBeTruthy();
    expect(safe(isNumber, 10.1).equals(Just(10.1))).toBeTruthy();
  });

  test("We can use safeAfter to check a value after applying a function", () => {
    const getFoo = safeAfter(isDefined, o => o.foo);

    expect(getFoo({ foo: "bar" }).equals(Just("bar"))).toBeTruthy();
    expect(getFoo({ bar: "baz" }).equals(Nothing())).toBeTruthy();
  });

  test("We can also lift a function to be run in the Maybe context", () => {
    const double = x => x * 2;
    const safeDouble = safeLift(isNumber, double);

    expect(safeDouble(2).equals(Just(4))).toBeTruthy();
    expect(safeDouble("2").equals(Nothing())).toBeTruthy();
  });
});

describe("safeParseNumber", () => {
  test("parsing a number should return `Just number`", () => {
    expect(safeParseNumber("3").equals(Just(3))).toBeTruthy();
    expect(safeParseNumber("0").equals(Just(0))).toBeTruthy();
    expect(safeParseNumber("1.003").equals(Just(1.003))).toBeTruthy();
    expect(safeParseNumber("9999foo").equals(Just(9999))).toBeTruthy();
  });

  test.skip("parsing an invalid number should return `Nothing`", () => {
    expect(safeParseNumber("ten").equals(Nothing())).toBeTruthy();
    expect(safeParseNumber("").equals(Nothing())).toBeTruthy();
    expect(safeParseNumber("-").equals(Nothing())).toBeTruthy();
    expect(safeParseNumber("foo9999").equals(Nothing())).toBeTruthy();
    expect(safeParseNumber({}).equals(Nothing())).toBeTruthy();
    expect(safeParseNumber([]).equals(Nothing())).toBeTruthy();
  });
});

describe("safeParseInteger", () => {
  test.skip("parsing an integer should return `Just int`", () => {
    expect(safeParseInteger("10").equals(Just(10))).toBeTruthy();
    expect(safeParseInteger("10.5").equals(Just(10))).toBeTruthy();
    expect(safeParseInteger("0").equals(Just(0))).toBeTruthy();
    expect(safeParseInteger("9999foo").equals(Just(9999))).toBeTruthy();
  });

  test.skip("parsing an invalid integer should return `Nothing`", () => {
    expect(safeParseInteger("ten").equals(Nothing())).toBeTruthy();
    expect(safeParseInteger(".5").equals(Nothing())).toBeTruthy();
    expect(safeParseInteger("foo9999").equals(Nothing())).toBeTruthy();
    expect(safeParseInteger("-").equals(Nothing())).toBeTruthy();
    expect(safeParseInteger({}).equals(Nothing())).toBeTruthy();
    expect(safeParseInteger([]).equals(Nothing())).toBeTruthy();
  });
});

/**
 * EXTENSION TASK
 *
 * Sometimes we need more detail than a Maybe provides. Depending on the context, we can reach for more descriptive types
 * like Either or Result to help add context to the failure branch.
 *
 * One such scenario is handling functions which may throw exceptions. In this situation, Crocks provides a helper called
 * `tryCatch` which will return a Result. https://github.com/evilsoft/crocks/blob/master/src/Result/tryCatch.js
 */

describe("safeParseJson", () => {
  const valid = JSON.stringify({ foo: "bar" });
  const invalid = "foo: 'bar'";
  test.skip("parses valid JSON and returns `OK a`", () => {
    expect(safeParseJson(valid).equals(Ok({ foo: "bar" }))).toBeTruthy();
  });

  // A clue to the solution to this particular problem lies in the fact that Result is a Bifunctor
  // https://github.com/fantasyland/fantasy-land/#bifunctor
  test.skip("Handles JSON parsing failure and returns sensible error message", () => {
    safeParseJson(invalid).either(console.log, console.error);
    expect(
      safeParseJson(invalid).equals(Err("Failed to parse JSON"))
    ).toBeTruthy();
  });
});
