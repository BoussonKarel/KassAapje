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

   export let organization_id

   let fetchingState = '',
      registers = undefined

   const getRegisters = async () => {
      fetchingState = 'loading'

      registers = await gqlHelper.queries
         .registers(organization_id)
         .then(result => {
            fetchingState = ''
            return result;
         })
         .catch(() => {
            fetchingState = 'error'
         })
      

      // Filter which ones he has perms??
   }

   onMount(() => {
      getRegisters()
   })
</script>

<div class="c-page">
   <NavigationBar title={"Kassa's"} />

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
         <AddCard page={'registers'} />
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
