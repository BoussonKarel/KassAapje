<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'
   import OrderTable from './OrderTable.svelte'
</script>

<div class="c-page">
   <div class="c-navigation">
      <NavigationBar title={'Bestellingen'} />
   </div>
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

   <OrderTable />
</div>
