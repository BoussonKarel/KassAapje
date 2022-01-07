<script lang="ts">
   import { formatHelper } from '../../utils/formatHelper'
   import Delete from 'svelte-material-icons/Delete.svelte'
   import Check from "svelte-material-icons/Check.svelte";
   import POSBasketItem from './POSBasketItem.svelte'
   import { basketStore, setupNewBasket } from '../../utils/basket'
   import { orderHelper } from '../../utils/orderHelper';

   const clearBasket = () => {
      setupNewBasket($basketStore.register_id);
   }

   let successFullyAdded = false;

   const checkout = () => {
      orderHelper.checkout($basketStore).then(() => {
         console.log("I see it worked (basket says)")
         successFullyAdded = true;
         setTimeout(() => {
            successFullyAdded = false;
         }, 2000)
      })
   }
</script>

<div class="c-basket">
   <div class="c-basket-header">
      <span class="c-basket-header__title">Winkelmandje</span>
      <button on:click={clearBasket} class="c-basket-header__clear">
         <Delete />
      </button>
   </div>

   <div class="c-basket-list">
      {#if $basketStore && $basketStore.order_items && $basketStore.order_items.length > 0}
         {#each $basketStore.order_items as order_item}
            <POSBasketItem {order_item} />
         {/each}
      {:else if successFullyAdded}
         <span class="c-basket-success">
            <Check />
         </span>
      {:else}
         <span class="c-basket-empty">Je mandje is leeg</span>
      {/if}
   </div>

   <div class="c-basket-total">
      <div class="c-basket-total__title">Totaal</div>
      <div class="c-basket-total__amount">{formatHelper.price(200)}</div>
   </div>

   <div class="c-basket-checkout">
      <button disabled={$basketStore.order_items.length === 0} on:click={checkout} class="c-basket-checkout__button c-button">Afrekenen</button>
   </div>
</div>
