<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'
   import CardList from '../../Cards/CardList.svelte'
   import AddCard from '../../Cards/AddCard.svelte'
   import RegisterCard from '../../Cards/RegisterCard.svelte'
   import { onMount } from 'svelte'
   import SectionLoading from '../../Loading/SectionLoading.svelte'
   import SkeletonCard from '../../Cards/SkeletonCard.svelte'
   import Plus from 'svelte-material-icons/Plus.svelte'
   import { gqlHelper } from '../../../utils/graphQL'
   import { Link } from 'svelte-navigator'
import Settings from 'svelte-material-icons/Settings.svelte';
import { refreshStore } from '../../../utils/refresh';

   export let organization_id: string
   export let isOwner: boolean

   let fetchingState = '',
      registers = undefined,
      title = "Kassa's"

   const getRegisters = async () => {
      fetchingState = 'loading'

      registers = await gqlHelper.queries
         .registers(organization_id)
         .then(result => {
            fetchingState = ''
            if (result.length > 0) title = "Kassa's van " + result[0].organization.name
            return result;
         })
         .catch(() => {
            fetchingState = 'error'
         })
      

      // Filter which ones he has perms??
   }

   refreshStore.subscribe(() => {
      getRegisters();
   })
</script>

<div class="c-page">
   <NavigationBar {title}>
      <Link class="c-navigation__button" to="info">
         <Settings />
      </Link>
   </NavigationBar>

   {#if fetchingState === 'loading'}
      <SectionLoading />

      <CardList>
         <SkeletonCard />
      </CardList>
   {:else if registers && registers.length > 0}
      <CardList>
         {#each registers as register}
            <RegisterCard {register} />
         {/each}
         {#if isOwner}
         <AddCard page={'registers'} />
         {/if}
      </CardList>
   {:else}
   <div class="o-container-center">
      <div class="c-bigcard {fetchingState === 'error' ? 'c-bigcard--error' : ''}">
         {#if fetchingState === 'error'}
            <span class="c-bigcard__text">Er ging iets fout bij het ophalen van de kassa's.</span>
         {:else}
            <span class="c-bigcard__text c-bigcard__text--big">Geen kassa's gevonden...</span>

            <Link to='new' class="c-button-add">
               <div class="c-button-add__icon">
                  <Plus />
               </div>
            </Link>
         {/if}
      </div>
   </div>
   {/if}
</div>
