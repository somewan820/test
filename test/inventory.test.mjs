import assert from 'node:assert/strict';
import test from 'node:test';
import { canReserve, reserve } from '../src/inventory.ts';

const item = { id: 'sku-1', available: 5 };

test('allows reserving part of the available stock', () => {
  assert.equal(canReserve(item, 2), true);
});

test('allows reservations that exactly exhaust stock', () => {
  assert.equal(canReserve(item, 5), true);
});

test('rejects invalid quantities and insufficient stock', () => {
  for (const quantity of [0, -1, 1.5, 6]) {
    assert.equal(canReserve(item, quantity), false);
  }
});

test('deducts the reserved quantity', () => {
  assert.equal(reserve(item, 2).available, 3);
});

test('does not mutate the input inventory', () => {
  const result = reserve(item, 2);
  assert.notEqual(result, item);
  assert.equal(item.available, 5);
});

test('rejects reservations with insufficient stock', () => {
  assert.throws(() => reserve(item, 6), /Insufficient stock/);
});
