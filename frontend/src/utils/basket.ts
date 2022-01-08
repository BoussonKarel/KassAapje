import type { Order } from "../models/Order";
import { writable } from "svelte/store";
import { getAuth } from "firebase/auth";
import type { Product } from "../models/Product";
import type { OrderItem } from "../models/OrderItem";

const getLocalStorageBasket = () => {
  try {
    return JSON.parse(localStorage.getItem("basket"));
  }
  catch {
    return undefined;
  }
}

export const basketStore = writable<Order>(getLocalStorageBasket());

basketStore.subscribe(basketValue => {
  if (basketValue) localStorage.setItem("basket", JSON.stringify(basketValue))
  else localStorage.removeItem("basket")
});

export const setupNewBasket = (register_id: string) => {
  basketStore.set({
    register_id: register_id,
    order_items: []
  })
}

export const updateBasketProduct = (product: Product, quantity: number = 1) => {
  basketStore.update((o) => {
    // Is this item already in the basket?
    const thisOrderItem = o.order_items.find(oi => oi.product_id === product.product_id);
    // All other items (except this if it exists)
    const newOrderItems = o.order_items.filter(oi => oi.product_id != product.product_id);

    if (thisOrderItem) {
      // Update this item if it exists
      if (thisOrderItem.quantity + quantity != 0) {
        // This if: if the new quantity becomes 0, don't add the order item to the new list
        newOrderItems.push({
        ...thisOrderItem,
        quantity: thisOrderItem.quantity + quantity,
        price: thisOrderItem.price + quantity * product.price
      })}
    }
    else {
      // Add a new item if it doesn't
      newOrderItems.push({
        product_id: product.product_id,
        product: product,
        quantity: quantity,
        price: quantity * product.price
      });
    }

    newOrderItems.sort((a, b) =>
      (a.product.name < b.product.name) ? -1 : (a.product.name > b.product.name) ? 1 : 0
    )

    return {
      ...o,
      order_items: newOrderItems
    }
  })
}