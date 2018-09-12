const { prop, propPath } = require("./main");
const option = require("crocks/pointfree/option");

const subject = {
  a: {
    b: {
      c: ["10", "1A", "FF"]
    }
  }
};

const isNothing = option(true);
const just = option(false);

test("`prop` returns a property from the top level when it is present", () => {
  expect(just(prop("a", subject))).toBe(subject.a);
});

test.skip("`prop` returns Nothing when property is missing", () => {
  expect(isNothing(prop("b", subject))).toBeTruthy();
  expect(isNothing(prop("", subject))).toBeTruthy();
});

test.skip("`prop` returns Nothing when value is missing, undefined or null", () => {
  expect(isNothing(prop("a", null))).toBeTruthy();
  expect(isNothing(prop("a", undefined))).toBeTruthy();
});

test.skip("`propPath` returns a Just when the path is valid", () => {
  expect(just(propPath(["a"], subject))).toEqual(subject.a);
  expect(just(propPath(["a", "b"], subject))).toEqual(subject.a.b);
  expect(just(propPath(["a", "b", "c"], subject))).toEqual(subject.a.b.c);
});

test.skip("`propPath` returns a Nothing when the path is not valid", () => {
  expect(isNothing(propPath(["b"], subject))).toBeTruthy();
  expect(isNothing(propPath(["a", 10], subject))).toBeTruthy();
  expect(isNothing(propPath([], subject))).toBeTruthy();
});

test.skip("`propPath` returns a Nothing when the value is missing, undefined or null", () => {
  expect(isNothing(propPath(["a", "b", "c"], null))).toBeTruthy();
  expect(isNothing(propPath(["a", "b", "c"], undefined))).toBeTruthy();
  expect(isNothing(propPath(["a", "b", "c"], "hellloooo"))).toBeTruthy();
  expect(isNothing(propPath(["a", "b", "c"], 10))).toBeTruthy();
  expect(isNothing(propPath(["a", "b", "c"], ["a", "b", "c"]))).toBeTruthy();
});

/**
 * EXTENSION EXERCISES
 * Try and handle the following edge cases (remember, JavaScript is dynamic so you can't always guarantee the type you get is the type you want!)
 */

test.skip("`prop` extension exercises", () => {
  expect(isNothing(prop(10, subject))).toBeTruthy();
  expect(isNothing(prop(undefined, subject))).toBeTruthy();
  expect(isNothing(prop(null, subject))).toBeTruthy();
  expect(isNothing(prop(null, null))).toBeTruthy();
  expect(isNothing(prop(null, undefined))).toBeTruthy();
  expect(isNothing(prop(undefined, null))).toBeTruthy();
});

test.skip("`propPath` extension exercises", () => {
  expect(isNothing(propPath("", subject))).toBeTruthy();
  expect(isNothing(propPath(undefined, subject))).toBeTruthy();
  expect(isNothing(propPath(null, subject))).toBeTruthy();
  expect(isNothing(propPath(10, subject))).toBeTruthy();
});
