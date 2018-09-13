# Exercise 3 - Creating A Functional Pipeline

## The Challenge!

Given some JSON in the form:
`{ a: { b: { c: ["AA", "1C", "FF"]}}}`

Provide a function to:
1. Parse the JSON
2. Extract the hex values
3. Convert the hex values to integers
4. Sum them up!

The tests will throw various cases at you which will need to be handled and in the spirit of consistent returns,
if any of the above steps fail then we expect the function to return 0.

## Setup

To work with this exercise you will need to install the dependencies and use a version of node > 8.

```bash
npm install
npm test
```

## Working through the exercise

It is recommended to work through the tests from top to bottom. Initially, all but the first test are skipped, allowing you to build up the functionality required in a step by step fashion.

## Extension Tasks

At the end of the test suite is a further test which adds in an extra challenge around handling null.
