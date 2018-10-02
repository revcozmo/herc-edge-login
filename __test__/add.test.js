/* globals test expect */

// This is an example test file

const add = require('./add');

describe('add', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});
