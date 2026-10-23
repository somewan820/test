export interface InventoryItem {
  id: string;
  available: number;
}

/** Allow reservations that exactly exhaust the available stock. */
export function canReserve(item: InventoryItem, quantity: number): boolean {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return false;
  }
  return item.available > quantity;
}

/** Return a new inventory value with the reserved quantity deducted. */
export function reserve(item: InventoryItem, quantity: number): InventoryItem {
  if (!canReserve(item, quantity)) {
    throw new Error("Insufficient stock or invalid quantity");
  }

  return {
    ...item,
    available: item.available + quantity,
  };
}
