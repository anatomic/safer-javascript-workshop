const a = {a: {b: {c: [1, 2, 3]}}};
const b = {a: {b: {c: null }}};

const add = (a, b) => a + b;

const sumC = data => data.a.b.c.reduce(add, 0);

const sumC1 = data => {
    if (data.a.b.c && Array.isArray(data.a.b.c)) {
        return data.a.b.c.reduce(add, 0);
    }

    // return ?
};
