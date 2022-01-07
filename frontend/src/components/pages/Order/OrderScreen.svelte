<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'
   import POSBasket from '../../POS/POSBasket.svelte'
   import POSProduct from '../../POS/POSProduct.svelte'
   import POSProductSkeleton from '../../POS/POSProductSkeleton.svelte'
   import OrderPopup from '../../OrderPopup.svelte'
   import SearchBar from '../../SearchBar.svelte'
   import { basketStore, setupNewBasket } from '../../../utils/basket'
   import { onMount } from 'svelte'
   import { gqlHelper } from '../../../utils/graphQL'
   import type { Product } from '../../../models/Product'
   import Settings from 'svelte-material-icons/Settings.svelte'
   import { Link } from 'svelte-navigator'

   export let register_id
   export let isOwner

   let finishing = false

   let fetchingState = '',
      products: Product[] = undefined,
      filteredProducts: Product[] = undefined

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
   }

   const searchFilter = (searchString: string) => {
      if (!searchString || searchString === '') filteredProducts = undefined
      else {
         filteredProducts = products.filter(p =>
            p.name.toLowerCase().includes(searchString.toLowerCase()),
         )
      }
   }

   onMount(() => {
      if (register_id) {
         // Als er nog geen mandje is of het mandje van n andere kassa is > Nieuw mandje
         if (!$basketStore || $basketStore.register_id != register_id) setupNewBasket(register_id)
      }

      getProducts()
   })
</script>

<div class="c-page">
   <div class="c-navigation__order">
      <NavigationBar title={'Order toevoegen'} />
      {#if isOwner}
         <Link to="products">
            <div class="c-button__navigation-right">
               <Settings />
            </div>
         </Link>
      {/if}
   </div>

   <div class="c-orderscreen {finishing ? 'u-blur' : ''}">
      <div class="c-orderscreen__catalogue">
         <SearchBar
            on:search={e => searchFilter(e.detail.target.value)}
            extraClass="c-pos-search"
         />
         {#if fetchingState === 'loading'}
            <div class="c-pos-list">
               {#each Array(5) as _}
                  <POSProductSkeleton />
               {/each}
            </div>
         {:else if fetchingState === 'error'}
            <div class="c-pos-status c-pos-status--error">
               Er ging iets fout bij het ophalen van de producten.
            </div>
         {:else if products && products.length > 0}
            <div class="c-pos-list">
               {#if filteredProducts}
                  {#each filteredProducts as product}
                     <POSProduct {product} />
                  {/each}
               {:else}
                  {#each products as product}
                     <POSProduct {product} />
                  {/each}
               {/if}
            </div>
         {:else}
            <div class="c-pos-status">Geen producten gevonden.</div>
         {/if}
      </div>
      <div class="c-orderscreen__basket">
         <POSBasket />
      </div>
   </div>
   {#if finishing}
      <OrderPopup hidden={!finishing} />
   {/if}
</div>
