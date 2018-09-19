const Maybe = require("crocks/Maybe");
const Pred = require("crocks/Pred");
const Sum = require("crocks/Sum");

const either = require("crocks/pointfree/either");
const constant = require("crocks/combinators/constant");
const flip = require("crocks/combinators/flip");
const isString = require("crocks/predicates/isString");
const isNil = require("crocks/predicates/isNil");
const mreduce = require("crocks/helpers/mreduce");
const not = require("crocks/logic/not");
const pipe = require("crocks/helpers/pipe");
const pipeK = require("crocks/helpers/pipeK");
const propPath = require("crocks/Maybe/propPath");
const resultToMaybe = require("crocks/Maybe/resultToMaybe");
const safe = require("crocks/Maybe/safe");
const safeLift = require("crocks/Maybe/safeLift");
const traverse = require("crocks/pointfree/traverse");
const tryCatch = require("crocks/Result/tryCatch");

// parseJson :: String -> Maybe a
const parseJson = pipe(tryCatch(JSON.parse), resultToMaybe);

// isValidHex :: Pred String
const isValidHex = Pred(isString).concat(
  Pred(s => s.split("").every(c => /[0-9a-f]/i.test(c)))
);

// safeParseHex :: String -> Maybe Int
const safeParseHex = safeLift(isValidHex, flip(parseInt, 16));

// app :: String -> Int
const app = pipe(
  pipeK(
    parseJson,
    propPath(["a", "b", "c"]),
    safe(not(isNil)),
    traverse(Maybe, safeParseHex)
  ),
  either(constant(0), mreduce(Sum))
);

module.exports = {
  app
};
