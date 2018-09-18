# Exercise 2 - Making Safer Functions

There are certain operations which are inherently unsafe. Dividing by zero, parsing numbers from strings, parsing JSON, etc. all cause us issues at runtimes either through inconsistent return types or (worse) throwing errors.

As in exercise 1, work through the tests to create safer versions of some well known functions. At the top of the tests file are some examples of how to use the Crocks library to produce Maybes and safer versions of functions.

## Setup

To work with this exercise you will need to install the dependencies and use a version of node > 8.

```bash
npm install
npm test
```

## Working through the exercise

It is recommended to work through the tests from top to bottom. Initially, all but the first test are skipped, allowing you to build up the functionality required in a step by step fashion.

## Extension Tasks

At the end of the test suite are two additional tests which extend our requirements beyond simply `Just a` or `Nothing`. Here we want to include some context as to what the failure/absence of value is.
