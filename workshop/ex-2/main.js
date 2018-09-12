const { Just } = require("crocks/Maybe");

const todo = t => _ => Just(t);

// safeParseNumber :: String -> Maybe number
const safeParseNumber = todo("Create safeParseNumber function");

// safeParseInteger :: String -> Maybe Int
const safeParseInteger = todo("Create safeParseInteger function");

// safeParseJson :: String -> Result String a
const safeParseJson = todo("Create safeParseJson function");

module.exports = {
  safeParseInteger,
  safeParseJson,
  safeParseNumber
};
