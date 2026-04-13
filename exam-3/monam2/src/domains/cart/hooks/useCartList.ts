import { useMemo, useSyncExternalStore } from "react";

import type { CartItem } from "@/shared/types";
import { createLocalStorageStore } from "@/shared/utils";

const CART_STORAGE_KEY = "sipe-order";
const EMPTY_CART_DATA = "[]";

const defaultCartStorage = createLocalStorageStore(
  CART_STORAGE_KEY,
  EMPTY_CART_DATA,
);

function parseCartItems(snapshot: string) {
  try {
    return JSON.parse(snapshot) as CartItem[];
  } catch {
    return [];
  }
}

export default function useCartList(storage = defaultCartStorage) {
  const cartSnapshot = useSyncExternalStore(
    storage.subscribe,
    storage.getSnapshot,
    () => EMPTY_CART_DATA,
  );

  const items = useMemo(() => parseCartItems(cartSnapshot), [cartSnapshot]);

  return useMemo(() => {
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );

    return {
      items,
      totalPrice,
      totalQuantity,
    };
  }, [items]);
}
