autoscale: true
slidenumber: true
footer: Ian Thomas | @anatomic | Leeds JS | 26th September 2018

> No one in the brief history of computing has ever written a piece of perfect software. It's unlikely that you'll be the first"
> -- Andy Hunt

---

# Programming _Safely_<br>With _Types_

### Leeds JS September 2018 | @anatomic

---

## What is _safety_?

![](https://images.unsplash.com/photo-1533897293409-81c85f3afdde?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9bbd7bc1481f88ad676953399122affb&auto=format&fit=crop&w=676&q=80)

---

## Does JavaScript have types?

### (And can they be safe?)

---

## What are the most frequently reported errors in JavaScript applications?

---

![inline](https://rollbar.com/static/javascript-error-graph-aced7330c2844069d95dfb92a87a3c82-e9535.png)
###[fit][top 10 javascript errors from 1000+ projects (and how to avoid them)](https://rollbar.com/blog/top-10-javascript-errors/)

---

![inline](skybet-errors.png)

---

> In computer science, _type safety_ is the extent to which a programming language discourages or prevents _type errors_.
> -- [Wikipedia](https://en.wikipedia.org/wiki/Type_safety)

^ A type error is erroneous or undesirable program behaviour caused by a discrepancy between differing data types for the program's constants, variables, and methods (functions), e.g., treating an integer (int) as a floating-point number (float).

---

> The behaviors classified as type errors [..] are usually those that result from attempts to perform operations on values that are not of the appropriate data type.
> -- [Wikipedia](https://en.wikipedia.org/wiki/Type_safety)

---

![inline](https://rollbar.com/static/javascript-error-graph-aced7330c2844069d95dfb92a87a3c82-e9535.png)

---

# Static vs Dynamic;<br>Strong vs Weak.

---

# Getting the first item<br>in an array

---

[.build-lists: true]

# What should we return?

* When the input is not an array?
* When the input is an empty array?
* When the input is an array of > 0 items?

---

## Null, undefined or false?

---

# Accessing data<br>nested in objects

---

[.code-highlight: none][.code-highlight: 1]
[.code-highlight: 2][.code-highlight: 4-6]

```javascript
const a = { a: { b: { c: [1, 2, 3] } } };
const b = { a: { b: { c: null } } };

const sumC = data => {
  // what goes in here?
};
```

---

# A naive approach

```javascript
const a = { a: { b: { c: [1, 2, 3] } } };
const b = { a: { b: { c: null } } };

const add = (a, b) => a + b;
const sumC = data => data.a.b.c.reduce(add, 0);

sumC(a); // 6
sumC(b); // ?
```

---

> TypeError: Cannot read property 'reduce' of null

---

## How can we improve this code?

---

# Add a guard clause

```javascript
const a = { a: { b: { c: [1, 2, 3] } } };
const b = { a: { b: { c: null } } };

const add = (a, b) => a + b;
const sumC = data => {
  if (data.a.b.c && Array.isArray(data.a.b.c)) {
    return data.a.b.c.reduce(add, 0);
  }

  // what do we return here?
};
```

---

# How do we represent the failure branch in this function?

---

[.code-highlight: none][.code-highlight: 1-2]
[.code-highlight: 4-5][.code-highlight: 7-8]
[.code-highlight: 10-11]

```javascript
// option 1
return false;

// option 2;
return null;

// option 3;
throw new Error("An array is required to sum");

// option 3a
throw new CannotSumError("C should be an array");
```

---

# :grimacing:

---

## If we are regularly accessing nested properties, how can we formalise this approach and make it reusable?

---

# There has to be a

#[fit] _better way?_

---

## Pure functions

---

## Consistent return types

---

## Immutable data (structures)

---

# Introducing

#[fit] ADTs

---

![inline 100%](crocks.png)

---

> The data types provided in Crocks allow you to remove large swaths of imperative boilerplate, allowing you to think of your code in terms of what it does and not how it does it.
> -- Crocks

---

## Sum Types to the rescue

^ Maybe need to do an aside here to discuss the difference between product types and sum types?

---

## First, a quick intro to Haskell-like type signatures

---

### User Defined Types

## data Bool = True | False

---

### Type Alias / Synonyms

## type EventId = Int

---

### Function Signatures

## add :: Int -> Int -> Int

---

# ~~Call~~ Get Me Maybe?

## data Maybe a = Just a | Nothing

---

## A solution using ADTs

^ If we are working with a function that may fail to return a result (like getting the first item from an array), we can use a Sum Type to represent the absence of a value

[.code-highlight: all]
[.code-highlight: 6-7]

```javascript
const a = { a: { b: { c: [1, 2, 3] } } };
const b = { a: { b: { c: null } } };

const add = (a, b) => a + b;
const sumC = data => {
  if (data.a.b.c && Array.isArray(data.a.b.c)) {
    return Just(data.a.b.c.reduce(add, 0));
  }

  Nothing();
};
```

---


## Safely getting properties from an object

^ We don't want inconsistent return types but we need to find a way to represent success and failure

```javascript
const prop = require("crocks/Maybe/prop");
const propPath = require("crocks/Maybe/propPath");

const data = { a: { b: { c: [1, 1, 2, 3, 5] } } };

const a = prop("a", data); // Just { b: { c: [1, 1, 2, 3, 5] } }
const b = prop("b", data); // Nothing

const c = propPath(["a", "b", "c"], data); // Just [1, 1, 2, 3, 5]
const d = propPath(["a", "b", "d"], data); // Nothing
```

---

### Maybe is a Functor

---

### Maybe is a Functor


> A value which has a Functor must provide a `map` method. The `map` method takes one argument
-- Fantasyland Specification

```haskell
map :: Functor f => f a ~> (a -> b) -> f b
```

---

### Maybe is a Functor

```javascript
const sumC = data =>
    propPath(["a", "b", "c"], data)
    .map(vals => vals.reduce(add, 0));
```

---

### What Happens If We Get A `Nothing`?

---

### What Happens If We Get A `Nothing`?

[.code-highlight: none]
[.code-highlight: 1]
[.code-highlight: 2]

```javascript
Just.prototype.map = function(fn) { return Just(fn(this.value)) };
Nothing.prototype.map = function(fn) { return this; };
```

---

## Currying, Composition & Pointfree style

^ While our flow is a big improvement on before (it's pure and we have a consistent return type), it's still quite brittle. One of the core principals behind this style of programming is being able to produce small, well understood pieces of functionality which can be composed together

[.code-highlight: none]
[.code-highlight: 1-2]
[.code-highlight: 4-5]
[.code-highlight: 7-8]

```javascript
// getC :: Object -> Maybe a
const getC = propPath(["a", "b", "c"]);

// sum :: Array Number -> Number
const sum = reduce(add, 0);

// sumC :: Object -> Maybe Number
const sumC = compose(map(total), getC);
```

---

## Another example

```javascript
// head :: Array a -> Maybe a
const head = arr => {
  if (Array.isArray(arr) && arr.length > 1) {
    return Just(arr[0]);
  }

  return Nothing;
};
```

---

> The specifications in this list do not derive from goals such as trying to write rules for lists and maps. Instead, they start by _noticing_ rules that apply in common to disparate structures.
> -- https://github.com/fantasyland/fantasy-land/issues/127#issuecomment-192763058

---

## What if we need to represent more than just "Nothing"?

---

## data Result e a = Error e | Ok a

---

##[fit] data RemoteData e a = NotAsked | Loading | Error e | Success a
