const testFn = require('./sketch'); // requires the sketch.js
// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

test('adds 1+2 to equal 3', sumTest);

function sumTest() {
  expect(testFn.sum(1, 2)).toBe(3);
}

test('manipulate object', objTest);

function objTest() {
  a = {
    'property': 'hello',
    'secondProperty': 2
  };
  b = testFn.changeObj(a);

  expect(b).toEqual({
    'property': 'hello',
    'secondProperty': 2,
    'thirdProperty': 'world'
  });
}
