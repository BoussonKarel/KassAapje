<script lang="ts">
   import Delete from 'svelte-material-icons/Delete.svelte'
   import BasketItem from '../Basket/BasketItem.svelte'
</script>

<div class="c-basket">
   <div class="c-basket-header">
      <span class="c-basket-header__title">Winkelmandje</span>
      <button class="c-basket-header__clear">
         <Delete />
      </button>
   </div>

   <div class="c-basket-list">
       {#each Array(5) as i}
        <BasketItem />
       {/each}
   </div>

   <div class="c-basket-total">
      <div class="c-basket-total__title">Totaal</div>
      <div class="c-basket-total__amount">€ 200,00</div>
   </div>

   <div class="c-basket-checkout">
      <div class="c-basket-checkout__button c-button">Afrekenen</div>
   </div>
</div>
