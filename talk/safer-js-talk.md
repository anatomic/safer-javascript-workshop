autoscale: true
slidenumbers: true
theme: sketchnote, 1
footer: Ian Thomas | @anatomic | Leeds JS | 26th September 2018

> No one in the brief history of computing has ever written a piece of perfect software. It's unlikely that you'll be the first"
> -- Andy Hunt

---

[.hide-footer]
[.slidenumbers: false]

# Programming _Safely_<br>With _Types_
### Ian Thomas | @anatomic

---

## Does JavaScript have types?
### (And can they be safe?)

---

## JavaScript's types

[.build-lists]

* Undefined
* Null
* Boolean
* String
* Number
* Object

^ An ECMAScript language type corresponds to values that are directly manipulated by an ECMAScript programmer using the ECMAScript language.

---

## What is _safety_?

![](https://images.unsplash.com/photo-1533897293409-81c85f3afdde?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9bbd7bc1481f88ad676953399122affb&auto=format&fit=crop&w=676&q=80)

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

# Static vs Dynamic;<br>Strong vs Weak.[^1]

^ static usually means "at compile time" while dynamic means "at run time"

^ strong vs weak is a less useful definition. Often better to consider things like coercion and type-checking (though weak can mean the type of a variable changes at runtime)

[^1]: http://2ality.com/2013/09/types.html

---

## Spot the difference

```javascript
const a = null;
a.prop; // 1

const b = {};
b.prop; // 2
```

What happens at `1` and `2`?

---

## Spot the difference

[.build-lists]

```javascript
const a = null;
a.prop; // 1

const b = {};
b.prop; // 2
```

1. :boom: `TypeError: Cannot read property 'prop' of null` :boom:
1. Silently fails, returning `undefined`

---

## Which is interesting because...

```javascript
> typeof null
'object'
```

---

# :see_no_evil:


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

[.code-highlight: none]
[.code-highlight: 1]
[.code-highlight: 2]
[.code-highlight: 4-6]

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

[.code-highlight: none]
[.code-highlight: 1-2]
[.code-highlight: 4-5]
[.code-highlight: 7-8]
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

# [fit]*ADTs*

---

![inline 100%](crocks.png)

---

> The data types provided in Crocks allow you to remove large swaths of imperative boilerplate, allowing you to think of your code in terms of what it does and not how it does it.
> -- Crocks

---

## *Sum Types* to the rescue

^ The values of a product type typically contain several values, called fields. All values of that type have the same combination of field types. The set of all possible values of a product type is the set-theoretic product, i.e., the Cartesian product, of the sets of all possible values of its field types.

^ The values of a sum type are typically grouped into several classes, called variants. A value of a variant type is usually created with a quasi-functional entity called a constructor. Each variant has its own constructor, which takes a specified number of arguments with specified types. The set of all possible values of a sum type is the set-theoretic sum, i.e., the disjoint union, of the sets of all possible values of its variants. Enumerated types are a special case of sum types in which the constructors take no arguments, as exactly one value is defined for each constructor.

---

## First, a quick intro to<br>*Haskell-like* type signatures

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

^ If we are working with a function that may fail to return a result (like getting the first item from an array), we can use a Sum Type to represent the absence of a value

---


## Safely getting properties from an object

^ We don't want inconsistent return types but we need to find a way to represent success and failure

[.code-highlight: none]
[.code-highlight: 1-2]
[.code-highlight: 6-7]
[.code-highlight: 9-10]

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

## Maybe is a *Functor*

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

## What Happens If We Get A *Nothing*?

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

### Currying, Composition & Pointfree style

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
const sumC = pipe(getC, map(sum));
```

---

## Using a *Monoid*

---

## Using a Monoid

[.build-lists: true]

* Monoids allow us to represent binary operations and are usually locked down to a specific type
* They are great when you need to combine a list of values down to one value
* Handily, Crocks provides a standard set of useful of Monoids!

---

## Using a Monoid

One of the Monoids included with Crocks is the Sum type

```javascript
// Instead of this
const add = (a, b) => a + b;
const sum1 = reduce(add, 0);

// We can use the built in behaviours of a Monoid
const sum2 = mreduce(Sum);
```
:bulb: Note that sum1 and sum2 are equivalent - both take an array of numbers and return a number

---

## Updating our example

```JavaScript
const { Sum, map, mreduce, pipe, propPath } = require("crocks");

const a = { a: { b: { c: [1, 2, 3] } } };
const b = { a: { b: { c: null } } };

const sumC = pipe(propPath(["a", "b", "c"]), map(mreduce(Sum));

sumC(a); // Just 6
sumC(b); // Nothing
```

---

## `mreduce` vs `mconcat` vs<br>`mreduceMap` vs `mconcatMap`

^ There's also `mapReduce` which allows us to create the `empty` type to start the reduction

---

### Jumping back...
## Getting the first item in an array

---

## Getting the first item in an array

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

## What if we need to represent more than just "Nothing"?

---

## *Maybe* is just the start of this adventure...

---

## data Either e a = Left a | Right b

---

## data Result e a = Err e | Ok a

---

## data Async e a = Rejected e | Result a

---

## Data Pair a b = Pair a b

---

## [fit] data RemoteData e a = NotAsked | Loading | Error e | Success a

---

## This all sounds great, but why the *crazy names?*

---

> The specifications in this list do not derive from goals such as trying to write rules for lists and maps. Instead, they start by _noticing_ rules that apply in common to disparate structures.
> -- https://github.com/fantasyland/fantasy-land/issues/127#issuecomment-192763058

---

## Aside, why *Fantasy Land?*

---

> Yeah this is really not happening. It totally ignores reality in favor of typed-language *fantasy land*, making a more awkward and less useful API just to satisfy some peoples' aesthetic preferences that aren't even applicable to JavaScript.
-- [Incorporate monads and category theory](https://github.com/promises-aplus/promises-spec/issues/94#issuecomment-16176966)

---

## Where to learn more

* [My Accompanying Workshop](https://github.com/anatomic/safe-javascript-workshop)
* [Professor Frisby's Mostly Adequate Guide](https://github.com/MostlyAdequate/mostly-adequate-guide)
* [Professor Frisby Introduces Composable Functional JavaScript](https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript)
* [Fantas Eel And Specification](http://www.tomharding.me/fantasy-land/)
* [Elm](https://elm-lang.org)
* [Evilsoft's YouTube Channel](https://www.youtube.com/channel/UCc8LoGpIa8tRNosGGJroS2Q)
* [ADTs on Wikipedia](https://en.wikipedia.org/wiki/Algebraic_data_type)

---

[.hide-footer]
[.slidenumbers: false]

# Programming *safely*<br>with *types*
### Ian Thomas | @anatomic
