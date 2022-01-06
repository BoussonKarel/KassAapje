<script lang="ts">
   import { formatHelper } from '../../utils/formatHelper'
   import Delete from 'svelte-material-icons/Delete.svelte'
   import POSBasketItem from './POSBasketItem.svelte'
   import { basketStore, setupNewBasket } from '../../utils/basket'

   const product = {
      name: 'Appeljenever',
      price: 10.0,
   }

   const clearBasket = () => {
      setupNewBasket($basketStore.register_id);
   }
</script>

<div class="c-basket">
   <div class="c-basket-header">
      <span class="c-basket-header__title">Winkelmandje</span>
      <button class="c-basket-header__clear">
         <Delete />
      </button>
   </div>

   <div class="c-basket-list">
      {#if $basketStore && $basketStore.order_items && $basketStore.order_items.length > 0}
         {#each $basketStore.order_items as order_item}
            <POSBasketItem product={order_item.product} />
         {/each}
      {:else}
         <span class="c-basket-empty">Je mandje is leeg</span>
      {/if}
   </div>

   <div class="c-basket-total">
      <div class="c-basket-total__title">Totaal</div>
      <div class="c-basket-total__amount">{formatHelper.price(200)}</div>
   </div>

   <div class="c-basket-checkout">
      <button class="c-basket-checkout__button c-button">Afrekenen</button>
   </div>
</div>
