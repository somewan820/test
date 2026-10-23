import assert from 'node:assert/strict';
import test from 'node:test';
import { canReserve, reserve } from '../src/stock.ts';

const item = { id: 'sku-e2e', available: 5 };

test('can reserve part of the stock', () => {
  assert.equal(canReserve(item, 2), true);
});

test('can reserve exactly all remaining stock', () => {
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

test('keeps the original stock object unchanged', () => {
  assert.notEqual(reserve(item, 2), item);
  assert.equal(item.available, 5);
});

test('throws if the requested stock is unavailable', () => {
  assert.throws(() => reserve(item, 6), /Insufficient stock/);
});
