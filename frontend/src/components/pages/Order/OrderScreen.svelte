<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'
   import POSBasket from '../../POS/POSBasket.svelte'
   import POSProductList from '../../POS/POSProductList.svelte'
   import OrderPopup from '../../OrderPopup.svelte'
   import SearchBar from '../../SearchBar.svelte'

   let finishOrder = false;

   const addOrSubtractAmount = (e) => {
      console.log("Adding or subtracting: ", e.detail)
   }
</script>

<div class="c-page">
   <NavigationBar title={'Order toevoegen'} />
   <div class="c-orderscreen {finishOrder ? 'u-blur' : ''}">
      <div class="c-orderscreen__catalogue">
         <SearchBar extraClass="c-pos__search" />
         <POSProductList on:addorsubtract={addOrSubtractAmount} />
      </div>
      <div class="c-orderscreen__basket">
         <POSBasket />
      </div>
   </div>
   {#if finishOrder}
   <OrderPopup hidden={!finishOrder}/>
   {/if}
   
</div>
