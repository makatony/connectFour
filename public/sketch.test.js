const sum = require('./sketch'); // requires the sketch.js

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

test('adds 1+2 to equal 3', sumTest);
function sumTest() {
  expect(sum(1, 2)).toBe(3);
}
