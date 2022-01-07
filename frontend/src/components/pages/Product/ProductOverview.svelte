<script lang="ts">
   import ProductTable from './ProductTable.svelte'
   import NavigationBar from '../../NavigationBar.svelte'
   import Settings from 'svelte-material-icons/Settings.svelte'
   import { Link } from 'svelte-navigator'

   export let isOwner
</script>

<div class="c-page">
   <div class="c-navigation__with-buttons">
      <NavigationBar title={'Producten'} />
      {#if isOwner}
         <Link to="add">
            <button class="c-button__navigation-right__add-product c-button">
               Toevoegen
            </button>
         </Link>
      {/if}
   </div>

   <ProductTable {isOwner} />
</div>
