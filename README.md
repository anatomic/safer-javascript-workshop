# Safer JavaScript Workshop

## What

JavaScript has a reputation.

## Why

## Who

## Workshop Overview

1. What is safety?
1. Runtime vs compile time
1. Reference errors
1. Type errors
1. null or undefined?
1. A quick side step into reading type signatures
1. Representing nothing
1. Representing a choice
1. Representing something which may fail
1. Representing something which may happen in the future
1. Making your own types
1. Putting it all together
    1. Compose / Pipe
    1. Map
    1. FlatMap
    1. Natural Transformations

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
