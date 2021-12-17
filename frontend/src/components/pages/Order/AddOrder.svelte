<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'
   import ShoppingBasket from '../../ShoppingBasket.svelte'
   import ProductCardList from '../../Cards/ProductCardList.svelte'
   import SearchBar from '../../SearchBar.svelte'
   import OrderPopup from '../../OrderPopup.svelte'

   let finishOrder = true;
</script>

<div class="c-page">
   <div class="c-navigation">
      <NavigationBar title={'Order toevoegen'} />
   </div>
   <div class="c-orderscreen {finishOrder ? 'u-blur' : ''}">
      <div>
         <div>
            <SearchBar />
         </div>

         <div>
            <ProductCardList />
         </div>
      </div>
      <div>
         <ShoppingBasket />
      </div>

      
   </div>
   {#if finishOrder}
   <OrderPopup/>
   {/if}
   
</div>
