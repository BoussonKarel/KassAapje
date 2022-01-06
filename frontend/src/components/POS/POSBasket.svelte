<script lang="ts">
   import { formatHelper } from '../../utils/formatHelper';
   import Delete from 'svelte-material-icons/Delete.svelte'
   import POSBasketItem from './POSBasketItem.svelte'

   const product = {
      name: "Appeljenever",
      price: 10.00
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
      <!-- <span class="c-basket-empty">Je mandje is leeg</span> -->
       {#each Array(5) as i}
        <POSBasketItem {product} />
       {/each}
   </div>

   <div class="c-basket-total">
      <div class="c-basket-total__title">Totaal</div>
      <div class="c-basket-total__amount">{formatHelper.price(200)}</div>
   </div>

   <div class="c-basket-checkout">
      <button class="c-basket-checkout__button c-button">Afrekenen</button>
   </div>
</div>
