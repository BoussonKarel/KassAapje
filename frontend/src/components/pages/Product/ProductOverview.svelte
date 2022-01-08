<script lang="ts">
   import ProductTable from './ProductTable.svelte'
   import NavigationBar from '../../NavigationBar.svelte'
   import Settings from 'svelte-material-icons/Settings.svelte'
   import { Link } from 'svelte-navigator'
   import { onMount } from 'svelte'
   import type { Product } from '../../../models/Product'
   import { gqlHelper } from '../../../utils/graphQL'
   import SectionLoading from '../../Loading/SectionLoading.svelte'
   import Plus from 'svelte-material-icons/Plus.svelte'
import { refreshStore } from '../../../utils/refresh';

   export let register_id:string

   export let isOwner:boolean

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
   }

   refreshStore.subscribe(() => {
      getProducts()
   })
</script>

<div class="c-page">
   {#if fetchingState === 'loading'}
      <SectionLoading />
   {:else if fetchingState === ''}
      <NavigationBar title={'Producten'} />

      {#if products}
         {#if products.length > 0}
            <ProductTable {isOwner} {products} />
            {#if isOwner}
               <Link to="add">
                  <button class="c-button__navigation-right__add-product c-button">
                     Toevoegen
                  </button>
               </Link>
            {/if}
         {:else}
            <div class="o-container-center">
               <div class="c-bigcard">
                  <span class="c-bigcard__text c-bigcard__text--big"
                     >Geen producten gevonden...</span
                  >

                  <Link to="add" class="c-button-add">
                     <div class="c-button-add__icon">
                        <Plus />
                     </div>
                  </Link>
               </div>
            </div>
         {/if}
      {:else}
         <div>Er is iets misgegaan</div>
      {/if}
   {:else if fetchingState === 'error'}
      <div>Er is iets misgegaan</div>
   {/if}
</div>
