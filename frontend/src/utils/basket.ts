import type { Order } from "../models/Order";
import { writable } from "svelte/store";
import { getAuth } from "firebase/auth";
import type { Product } from "../models/Product";
import type { OrderItem } from "../models/OrderItem";

export const basketStore = writable<Order>(JSON.parse(localStorage.getItem("basket")) || undefined);

basketStore.subscribe(basketValue => localStorage.setItem("basket", JSON.stringify(basketValue)));

export const setupNewBasket = (register_id: string) => {
  basketStore.set({
    register_id: register_id,
    order_items: []
  })
}

export const addToBasket = (product: Product, quantity: number = 1) => {
  basketStore.update((o) => {
    const newItem : OrderItem = {
      product_id: product.name,
      product: product,
      quantity: quantity,
      price: quantity * product.price
    }
    return {
      ...o,
      order_items: [...o.order_items, newItem]
    }
  })
}