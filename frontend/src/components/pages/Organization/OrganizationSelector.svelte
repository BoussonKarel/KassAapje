<script lang="ts">
   import CardList from '../../Cards/CardList.svelte'
   import AddCard from '../../Cards/AddCard.svelte'
   import OrganisationCard from '../../Cards/OrganisationCard.svelte'
   import { onMount } from 'svelte'
   import { gqlHelper } from '../../../utils/graphQL'
   import Plus from 'svelte-material-icons/Plus.svelte'
   import { Link } from 'svelte-navigator'
   import SectionLoading from '../../Loading/SectionLoading.svelte'
   import SkeletonCard from '../../Cards/SkeletonCard.svelte'
   import { refreshStore } from '../../../utils/refresh';

   let fetchingState = '',
      organizations = undefined

   const getOrganizations = async () => {
      fetchingState = 'loading'

      organizations = await gqlHelper.queries
         .userOrganizations()
         .then(result => {
            fetchingState = ''
            return result;
         })
         .catch(() => {
            fetchingState = 'error'
         })
   }

   onMount(() => {
      getOrganizations()
   })

   refreshStore.subscribe(() => {
      getOrganizations();
   })
</script>

<div class="c-page">
   {#if fetchingState === 'loading'}
      <SectionLoading />

      <CardList>
         <SkeletonCard />
      </CardList>
   {:else if organizations && organizations.length > 0}
      <CardList>
         {#each organizations as organization}
            <OrganisationCard {organization} />
         {/each}
         <AddCard page={'organisations'} />
      </CardList>
   {:else}
      <div class="o-container-center">
         <div class="c-bigcard {fetchingState === 'error' ? 'c-bigcard--error' : ''}">
            {#if fetchingState === 'error'}
               <span class="c-bigcard__text">Er ging iets fout bij het ophalen van de verenigingen.<br />Probeer het later opnieuw of neem contact met ons op.</span>
            {:else}
               <span class="c-bigcard__text c-bigcard__text--big">Geen verenigingen gevonden...</span>
               <Link to="/new" class="c-button-add">
                  <div class="c-button-add__icon">
                     <Plus />
                  </div>
               </Link>
            {/if}
         </div>
      </div>
   {/if}
</div>
