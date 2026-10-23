import assert from 'node:assert/strict';
import test from 'node:test';

test('sandbox is ready', () => {
  assert.equal(1 + 1, 2);
});
