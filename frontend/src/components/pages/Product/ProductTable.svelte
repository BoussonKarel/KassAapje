<script lang="ts">
   import ProductTableItem from './ProductTableItem.svelte'

   export let isOwner;
   export let products;
</script>

<div class="c-table c-table-products">
   <div class="c-table-products__header">
      <div class="c-table-products__header--item">Naam</div>
      <div class="c-table-products__header--item">Prijs</div>
      <div class="c-table-products__header--item">Stock</div>
      <div class="c-table-products__header--item"></div>
   </div>
   <div class="c-table-products__content">

      {#each products as product}
      <ProductTableItem {isOwner} {product} />
      {/each}
    
    <!-- <ProductTableItem />
    <ProductTableItem />
    <ProductTableItem />
    <ProductTableItem />
    <ProductTableItem />
    <ProductTableItem />
    <ProductTableItem />
    <ProductTableItem />
    <ProductTableItem />
    <ProductTableItem />
    <ProductTableItem />
    <ProductTableItem />
    <ProductTableItem />
    <ProductTableItem /> -->

    
   </div>
   
</div>
