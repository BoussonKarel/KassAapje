import type { Order } from "../models/Order";
import { basketStore, setupNewBasket } from "./basket";
import { gqlHelper } from "./graphQL";

export const orderHelper = {
  checkout: (order: Order) => {
    if (order && order.order_items.length > 0) {
      const newOrder : Order = order;

      console.log({newOrder})

      newOrder.order_items.forEach(oi => {
         delete oi.product
         return {...oi};
      });

      newOrder.payments = [{
         payment_method: "Default",
         amount: orderHelper.total(order)
      }]

      return gqlHelper.mutations.addOrder(newOrder).then((r) => {
         setupNewBasket(newOrder.register_id);
         return r;
      });
   }
  },
  total: (order: Order) => {
    return order.order_items.reduce((a, b) => {
      return a + b.price;
    }, 0);
  }
}