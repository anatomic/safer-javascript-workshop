const bimap = require("crocks/pointfree/bimap");
const constant = require("crocks/combinators/constant");
const identity = require("crocks/combinators/identity");
const isInteger = require("crocks/predicates/isInteger");
const isNumber = require("crocks/predicates/isNumber");
const pipe = require("crocks/helpers/pipe");
const safeAfter = require("crocks/Maybe/safeAfter");
const tryCatch = require("crocks/Result/tryCatch");

// safeParseNumber :: String -> Maybe number
const safeParseNumber = safeAfter(isNumber, parseFloat);

// safeParseInteger :: String -> Maybe Int
const safeParseInteger = safeAfter(isInteger, parseInt);

// safeParseJson :: String -> Result String a
const safeParseJson = pipe(
  tryCatch(JSON.parse),
  bimap(constant("Failed to parse JSON"), identity)
);

module.exports = {
  safeParseInteger,
  safeParseJson,
  safeParseNumber
};
