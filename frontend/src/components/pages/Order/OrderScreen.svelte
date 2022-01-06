<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'
   import POSBasket from '../../POS/POSBasket.svelte'
   import POSProduct from '../../POS/POSProduct.svelte'
   import OrderPopup from '../../OrderPopup.svelte'
   import SearchBar from '../../SearchBar.svelte'
   import { basketStore, setupNewBasket } from '../../../utils/basket'
   import { onMount } from 'svelte';

   export let register_id;

   let finishOrder = false;

   onMount(() => {
      if (register_id) {
         // Als er nog geen mandje is of het mandje van n andere kassa is > Nieuw mandje
         if (!$basketStore || $basketStore.register_id != register_id) setupNewBasket(register_id)
      }
   })

   const testProduct = {
      name: "J",
      product_id: "123456"
   }
</script>

<div class="c-page">
   <NavigationBar title={'Order toevoegen'} />
   <div class="c-orderscreen {finishOrder ? 'u-blur' : ''}">
      <div class="c-orderscreen__catalogue">
         <SearchBar extraClass="c-pos-search" />
         <div class="c-pos-list">
            <POSProduct product={testProduct} />
            <POSProduct product={testProduct} />
            <POSProduct product={testProduct} />
            <POSProduct product={testProduct} />
         </div>
      </div>
      <div class="c-orderscreen__basket">
         <POSBasket />
      </div>
   </div>
   {#if finishOrder}
   <OrderPopup hidden={!finishOrder}/>
   {/if}
   
</div>
