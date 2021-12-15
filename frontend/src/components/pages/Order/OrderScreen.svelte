<script lang="ts">
  import ShoppingBasket from '../../ShoppingBasket.svelte';
import ProductCardList from '../../Cards/ProductCardList.svelte';
import SearchBar from '../../SearchBar.svelte'
</script>

<div class="c-orderscreen">
  <div>
    <div>
      <SearchBar />
    </div>

    <div>
        <ProductCardList/>
    </div>
  </div>
  <div>
    <ShoppingBasket/>
  </div>
  
<!-- <OrderPopup/> -->
  
</div>
