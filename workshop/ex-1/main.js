const { Just, Nothing } = require("crocks/Maybe");

// prop :: String -> Object -> Maybe a
const prop = (key, obj) => (obj && obj[key] ? Just(obj[key]) : Nothing());

// propPath :: Array String -> Object -> Maybe a
const propPath = (keys, obj) => {
  if (!obj || Array.isArray(keys) === false) {
    return Nothing();
  }

  let value = obj;

  for (let i = 0, t = keys.length; i < t; i++) {
    value = value[keys[i]];

    if (!value) {
      return Nothing();
    }
  }

  return Just(value);
};

module.exports = {
  prop,
  propPath
};
