const { app } = require("./main");
const {
  valid,
  invalid,
  outOfRange,
  missing,
  empty,
  nulled,
  _undefined
} = require("./data");

const Maybe = require("crocks/Maybe");
const Result = require("crocks/Result");
const List = require("crocks/List");

const isNumber = require("crocks/predicates/isNumber");
const pipeK = require("crocks/helpers/pipeK");

const safeLift = require("crocks/Maybe/safeLift");
const resultToMaybe = require("crocks/Maybe/resultToMaybe");
const maybeToResult = require("crocks/Result/maybeToResult");

const { Err, Ok } = Result;
const { Just, Nothing } = Maybe;

describe("Natural transformation", () => {
  test("resultToMaybe", () => {
    const a = Ok(true);
    const b = Err(false);

    const a1 = resultToMaybe(a);
    const b1 = resultToMaybe(b);

    expect(a1.equals(Just(true))).toBeTruthy();
    expect(b1.equals(Nothing())).toBeTruthy();
  });

  test("maybeToResult", () => {
    const a = Just(true);
    const b = Nothing();

    const a1 = maybeToResult(false, a);
    const b1 = maybeToResult(false, b);

    expect(a1.equals(Ok(true))).toBeTruthy();
    expect(b1.equals(Err(false))).toBeTruthy();
  });
});

describe("sequence and traverse", () => {
  test("traverse allows us to apply the effect of an `Apply` to the value inside our ADT", () => {
    // a :: List Int
    const a = List.fromArray([1, 2, 3]);

    // b :: List (Maybe Int)
    const b = a.map(Just);

    // c :: Maybe (List Int)
    const c = b.traverse(Maybe, x => x);

    expect(c.equals(Just(a))).toBeTruthy();
  });

  test("We can rewrite the above code to avoid the intermediate `map`", () => {
    // a :: List Int
    const a = List.fromArray([1, 2, 3]);

    // b :: Maybe (List Int)
    const b = a.traverse(Maybe, Just);

    expect(b.equals(Just(a))).toBeTruthy();
  });

  test("Sequence can be considered to be `traverse` with the identity function", () => {
    // a :: List (Maybe Int)
    const a = List.fromArray([Just(1), Just(2), Just(3)]);

    // b :: Maybe (List Int)
    const b = a.sequence(Maybe);

    expect(b.equals(Just(List.fromArray([1, 2, 3])))).toBeTruthy();
  });
});

describe("Monads!!", () => {
  const safeDouble = safeLift(isNumber, x => x * 2);
  const safeAddTen = safeLift(isNumber, x => x + 10);

  test("If we map using a function which returns an ADT, we end up with horrible nested contexts", () => {
    const a = safeDouble(2).map(safeAddTen);
    expect(a.equals(Just(Just(14)))).toBeTruthy();
  });

  test("We can avoid the nesting by taking advantage of the `chain` method on a Monad", () => {
    const a = safeDouble(2).chain(safeAddTen);
    expect(a.equals(Just(14))).toBeTruthy();
  });

  test("We can use a special form of composition called Kleisli Composition to build a pipeline of functions that return Monads", () => {
    const flow = pipeK(safeDouble, safeAddTen); // there's also composeK which is the traditional version of pipe
    expect(flow(2).equals(Just(14))).toBeTruthy();
  });
});

/**
 * The Challenge!
 *
 * Given some JSON in the form:
 * { a: { b: { c: ["AA", "1C", "FF"]}}}
 *
 * Provide a function to:
 * 1. Parse the JSON
 * 2. Extract the hex values
 * 3. Convert the hex values to integers
 * 4. Sum them up!
 *
 * The tests will throw various cases at you which will need to be handled and in the spirit of consistent returns,
 * if any of the above steps fail then we expect the function to return 0.
 */

describe("The challenge", () => {
  test("Parses, converts and sums correctly", () => {
    expect(app(valid)).toEqual(453);
  });

  test.skip("Handles invalid JSON", () => {
    expect(app(invalid)).toEqual(0);
  });

  test.skip("Handles missing data", () => {
    expect(app(missing)).toEqual(0);
  });

  test.skip("Handles empty data", () => {
    expect(app(empty)).toEqual(0);
  });

  test.skip("Handles undefined data", () => {
    expect(app(_undefined)).toEqual(0);
  });

  test.skip("Handles null data", () => {
    expect(app(nulled)).toEqual(0);
  });

  // Extension, add an extra check to ensure all hex values are <= FF
  test.skip("Handles out of range values", () => {
    expect(app(outOfRange)).toEqual(0);
  });
});
