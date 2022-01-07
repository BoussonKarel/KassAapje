<script lang="ts">
   import ProductTableItem from './ProductTableItem.svelte'

   export let isOwner
</script>

<div class="c-table c-table-products">
   <div class="c-table-products__header">
      <div class="c-table-products__header--item">Naam</div>
      <div class="c-table-products__header--item">Prijs</div>
      <div class="c-table-products__header--item">Stock</div>
   </div>
   <div class="c-table-products__content">
    <ProductTableItem {isOwner} />
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
