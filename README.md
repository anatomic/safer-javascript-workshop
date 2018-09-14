# Safer JavaScript Workshop

## What

As a dynamic programming language with a preference for coercion, JavaScript has a reputation for allowing us to do some odd things with unintended consequences. Some people introduce static types to help combat some of these issues but there's also another way. A way which is supported in JavaScript the language without any need for type systems to be layered on top.

While we are focusing on JavaScript, the concepts introduced will apply to a wider set of programming languages. Similar techniques are reguarly used in Haskell, Elm, PureScript, Scala, Kotlin and Java (to name just a few).

## Why

Like it or not, JavaScript is still a hugely important language for building web applications. Whether you're using it solely on the client or if you have a node.js process as your backend, there's a strong chance that JavaScript will feature at some point in your stack. By introducing some of the techniques in this workshop I believe you'll end up with a better overall product. More reliable, more testable, easier to understand code and open to change without significant risk of error.

## Who

While it is possible to take this workshop with reasonably low level of familiarity, it's best suited to programmers who have worked with the language in a production environment who may have come across some of the issues we aim to address.

## Workshop Overview

The workshop lasts two hours and is split up into the following chunks:

1. 30mins Intro Presentation
2. 25mins Exercise 1
3. 25mins Exercise 2
4. 40mins Exercise 3

There is a fourth exercise which is available for people to complete in their own time or in the workshop if they get through the 3rd exercise ahead of schedule.

## Appendix

### Reference Errors

> The `ReferenceError` object represents an error when a non-existent variable is referenced.

### Type Errors

> The `TypeError` object represents an error when a value is not of the expected type.

Typical errors:

> `undefined` is not a function
> TypeError: cannot read property `x` of `undefined`

### Syntax Errors

> A `SyntaxError` is thrown when the JavaScript engine encounters tokens or token order that does not conform to the syntax of the language when parsing code.

We can typically come across this at runtime when attempting to parse invalid JSON.
