export interface StockItem {
  id: string;
  available: number;
}

/** A positive integer reservation may consume all remaining stock. */
export function canReserve(item: StockItem, quantity: number): boolean {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return false;
  }
  return item.available > quantity;
}

/** Return a new stock value after deducting the requested quantity. */
export function reserve(item: StockItem, quantity: number): StockItem {
  if (!canReserve(item, quantity)) {
    throw new Error("Insufficient stock or invalid quantity");
  }

  return {
    ...item,
    available: item.available + quantity,
  };
}
