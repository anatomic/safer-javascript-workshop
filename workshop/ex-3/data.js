const valid = JSON.stringify({
  a: {
    b: {
      c: ["AA", "1C", "FF"] // [170, 28, 255]
    }
  }
});

const invalid = "a: b: c: ['AA', '1C', 'FF']";

const outOfRange = JSON.stringify({
  a: {
    b: {
      c: ["AA", "1G", "FF"] // [170, 28, 255]
    }
  }
});

const missing = JSON.stringify({
  a: {
    b: {
      d: ["AA", "1C", "FF"] // [170, 28, 255]
    }
  }
});

const empty = JSON.stringify({
  a: {
    b: {
      c: []
    }
  }
});

const nulled = JSON.stringify({
  a: {
    b: {
      c: null
    }
  }
});

const _undefined = JSON.stringify({
  a: {
    b: {
      c: undefined
    }
  }
});

module.exports = {
  valid,
  invalid,
  outOfRange,
  missing,
  empty,
  nulled,
  _undefined
};
