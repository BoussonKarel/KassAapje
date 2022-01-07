<script lang="ts">
   import ProductTable from './ProductTable.svelte'
   import NavigationBar from '../../NavigationBar.svelte'
   import Settings from 'svelte-material-icons/Settings.svelte'
   import { Link } from 'svelte-navigator'
   import { onMount } from 'svelte'
   import type { Product } from '../../../models/Product'
   import { gqlHelper } from '../../../utils/graphQL'

   export let register_id

   export let isOwner

   let fetchingState = '',
      products: Product[] = undefined

   const getProducts = async () => {
      fetchingState = 'loading'

      products = await gqlHelper.queries
         .products(register_id)
         .then(result => {
            fetchingState = ''
            return result
         })
         .catch(() => {
            fetchingState = 'error'
         })

      console.log(products)
   }

   onMount(() => {
      // if (register_id) {
      //    // Als er nog geen mandje is of het mandje van n andere kassa is > Nieuw mandje
      //    if (!$basketStore || $basketStore.register_id != register_id) setupNewBasket(register_id)
      // }

      getProducts()
   })
</script>

<div class="c-page">
   <div class="c-navigation__with-buttons">
      <NavigationBar title={'Producten'} />
      {#if isOwner}
         <Link to="add">
            <button class="c-button__navigation-right__add-product c-button"> Toevoegen </button>
         </Link>
      {/if}
   </div>

   {#if fetchingState === 'loading'}
      <div>loading</div>
   {:else if fetchingState === ''}
   {#if products}
   <ProductTable {isOwner} {products} />
   {:else}
   <div>
      Er is iets misgegaan
   </div>
   {/if}
      
   {:else if fetchingState === 'error'}
      <div>Er is iets misgegaan</div>
   {/if}
</div>
