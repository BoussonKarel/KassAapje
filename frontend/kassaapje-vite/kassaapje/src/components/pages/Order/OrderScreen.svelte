<script lang="ts">
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
  <div>shopping basket placeholder</div>
</div>
