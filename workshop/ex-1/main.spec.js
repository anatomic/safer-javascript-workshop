const { prop, propPath } = require("./main");
const Maybe = require("crocks/Maybe");
const option = require("crocks/pointfree/option");

const { Just, Nothing } = Maybe;

const subject = {
  a: {
    b: {
      c: ["10", "1A", "FF"]
    }
  }
};

const isNothing = option(true);
const just = option(false);

describe("Introducing Maybe", () => {
  test("Maybe types can be constructed using Just and Nothing functions and compared by value using the `equals` method", () => {
    expect(Just(10).equals(Just(10))).toBeTruthy();
    expect(Nothing().equals(Nothing())).toBeTruthy();
    expect(Just(10).equals(Nothing())).toBeFalsy();
    expect(Just(10).equals(Just("ten"))).toBeFalsy();
  });

  test("Maybe types can have their values extracted using option", () => {
    const a = Just(10);
    const b = Nothing();

    expect(a.option(0)).toEqual(10);
    expect(b.option(10)).toEqual(10);
  });

  test("Maybe types have an `either` method which lets us work with the Just value or Nothing", () => {
    const a = Just("foo");
    const b = Nothing();

    const id = x => x;
    const bar = () => "bar";

    expect(a.either(bar, id)).toEqual("foo");
    expect(b.either(bar, id)).toEqual("bar");
  });

  test("Maybe types have a Functor to allow us to manipulate an inner value", () => {
    const double = x => x * 2;
    const a = Just(10);
    const b = a.map(double);
    const c = Nothing().map(double);

    expect(a).not.toBe(b);
    expect(a.option(0)).not.toEqual(20);
    expect(b.option(0)).toEqual(20);
    expect(c.option(0)).toEqual(0);
  });
});

describe("Getting a top level prop", () => {
  test("`prop` returns a property from the top level when it is present", () => {
    expect(just(prop("a", subject))).toBe(subject.a);
  });

  test("`prop` returns Nothing when property is missing", () => {
    expect(isNothing(prop("b", subject))).toBeTruthy();
    expect(isNothing(prop("", subject))).toBeTruthy();
  });

  test("`prop` returns Nothing when value is missing, undefined or null", () => {
    expect(isNothing(prop("a", null))).toBeTruthy();
    expect(isNothing(prop("a", undefined))).toBeTruthy();
  });
});

describe("Getting a nested property", () => {
  test("`propPath` returns a Just when the path is valid", () => {
    expect(just(propPath(["a"], subject))).toEqual(subject.a);
    expect(just(propPath(["a", "b"], subject))).toEqual(subject.a.b);
    expect(just(propPath(["a", "b", "c"], subject))).toEqual(subject.a.b.c);
  });

  test("`propPath` returns a Nothing when the path is not valid", () => {
    expect(isNothing(propPath(["b"], subject))).toBeTruthy();
    expect(isNothing(propPath(["a", 10], subject))).toBeTruthy();
    expect(isNothing(propPath([], subject))).toBeTruthy();
  });

  test("`propPath` returns a Nothing when the value is missing, undefined or null", () => {
    expect(isNothing(propPath(["a", "b", "c"], null))).toBeTruthy();
    expect(isNothing(propPath(["a", "b", "c"], undefined))).toBeTruthy();
    expect(isNothing(propPath(["a", "b", "c"], "hellloooo"))).toBeTruthy();
    expect(isNothing(propPath(["a", "b", "c"], 10))).toBeTruthy();
    expect(isNothing(propPath(["a", "b", "c"], ["a", "b", "c"]))).toBeTruthy();
  });
});

/**
 * EXTENSION EXERCISES
 * Try and handle the following edge cases (remember, JavaScript is dynamic so you can't always guarantee the type you get is the type you want!)
 */

describe("Extension tasks", () => {
  test("`prop` extension exercises", () => {
    expect(isNothing(prop(10, subject))).toBeTruthy();
    expect(isNothing(prop(undefined, subject))).toBeTruthy();
    expect(isNothing(prop(null, subject))).toBeTruthy();
    expect(isNothing(prop(null, null))).toBeTruthy();
    expect(isNothing(prop(null, undefined))).toBeTruthy();
    expect(isNothing(prop(undefined, null))).toBeTruthy();
    expect(isNothing(prop("c", { c: null }))).toBeTruthy();
  });

  test("`propPath` extension exercises", () => {
    expect(isNothing(propPath("", subject))).toBeTruthy();
    expect(isNothing(propPath(undefined, subject))).toBeTruthy();
    expect(isNothing(propPath(null, subject))).toBeTruthy();
    expect(isNothing(propPath(10, subject))).toBeTruthy();
    expect(
      isNothing(propPath(["a", "b", "c"], { a: { b: { c: null } } }))
    ).toBeTruthy();
  });
});
