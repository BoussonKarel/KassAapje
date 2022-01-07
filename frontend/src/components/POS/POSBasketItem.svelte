<script lang='ts'>
   import { formatHelper } from "../../utils/formatHelper";
   import CloseCircle from "svelte-material-icons/CloseCircle.svelte";
   import Minus from "svelte-material-icons/Minus.svelte";
   import Plus from "svelte-material-icons/Plus.svelte";
   import type { OrderItem } from "../../models/OrderItem";
   import { updateBasketProduct } from "../../utils/basket";

  export let order_item : OrderItem;

  const subtract = () => {
      updateBasketProduct(order_item.product, -1)
   }

   const add = () => {
      updateBasketProduct(order_item.product, 1)
      console.log('Add 1 to product')
   }

   const remove = () => {
      updateBasketProduct(order_item.product, order_item.quantity * -1)
   }

  console.log(order_item)
</script>

<div class="c-basket-item">
   <button on:click={remove} class="c-basket-item__button">
      <CloseCircle />
   </button>
   <div class="c-basket-item__name">{order_item.product.name}</div>
   <button on:click={subtract} class="c-basket-item__button c-basket-item__button--minus">
      <Minus />
   </button>
   <div class="c-basket-item__count">{order_item.quantity}</div>
   <button on:click={add} class="c-basket-item__button c-basket-item__button--plus">
      <Plus />
   </button>
   <div class="c-basket-item__price">{formatHelper.price(order_item.price)}</div>
</div>
