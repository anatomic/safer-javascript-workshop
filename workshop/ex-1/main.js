const Maybe = require("crocks/Maybe");
const { Just, Nothing } = Maybe;
const todo = t => () => {
  throw new Error(t);
};

// prop :: String -> Object -> Maybe a
const prop = todo("Create the prop function");

// propPath :: Array String -> Object -> Maybe a
const propPath = todo("Create the propPath function");

module.exports = {
  prop,
  propPath
};
