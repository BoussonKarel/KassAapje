<script lang="ts">
  import ShoppingBasket from '../../shoppingBasket.svelte';
import ProductCardList from '../../Cards/productCardList.svelte';
import SearchBar from '../../searchBar.svelte'
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
</div>
