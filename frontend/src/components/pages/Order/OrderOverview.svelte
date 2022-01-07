<script lang="ts">
import Pencil from 'svelte-material-icons/Pencil.svelte';

   import NavigationBar from '../../NavigationBar.svelte'
   import OrderTable from './OrderTable.svelte'
</script>

<div class="c-page">
      <NavigationBar title={'Bestellingen'} />
   <div class="u-toolbar">
      <div class="c-selector">
         <p class="c-selector-title">Periode:</p>
         <select class="c-selector-unit" id="timeframe" name="timeframe">
            <option class="c-selector__option">Laatste Week </option>
            <option class="c-selector__option">Laatste Maand </option>
            <option class="c-selector__option">Altijd </option>
         </select>
      </div>

      <div class="u-toolbar-amount">
         <div class="u-toolbar-amount__title">Totaal:</div>
         <div class="u-toolbar-amount__symbol">€</div>
         <div class="u-toolbar-amount__number">420,60</div>
      </div>
   </div>

   <div class="c-orderlist">
      {#each Array(10) as _}
         <div class="c-order">
            <div class="c-order__header">
               <div class="c-order__title">
                  Order # 123456
               </div>
               <div class="c-order__edit">
                  <Pencil />
               </div>
            </div>
            <div class="c-order__summary">
               <div class="c-order__content">
                  1x div<br />
                  1x ap<br />
                  2x pc<br />
               </div>
               <div class="c-order__price">
                  € 120,00
               </div>
            </div>
         </div>
      {/each}
   </div>

   <!-- <OrderTable /> -->
</div>
