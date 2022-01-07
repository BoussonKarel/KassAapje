<script lang="ts">
   import type { Product } from '../../models/Product'
   import { updateBasketProduct, basketStore } from '../../utils/basket'

   import Minus from 'svelte-material-icons/Minus.svelte'
   import Plus from 'svelte-material-icons/Plus.svelte'

   export let product: Product
   let order_item = undefined

   const subtract = () => updateBasketProduct(product, -1)

   const add = () => updateBasketProduct(product)

   basketStore.subscribe(store => {
      order_item = store.order_items.find(oi => oi.product_id === product.product_id)
   })
</script>

<div class="c-pos-product {order_item && order_item.quantity > 0 ? 'c-pos-product--contains' : ''}">
   <button on:click={add} class="c-pos-product__title">{product.name}</button>
   <div class="c-pos-product__amount">
      <button on:click={subtract} class="c-pos-product__button"><Minus /></button>
      <div class="c-pos-product__count">{order_item ? order_item.quantity : ''}</div>
      <button on:click={add} class="c-pos-product__button"><Plus /></button>
   </div>
</div>
