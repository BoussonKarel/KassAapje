<script lang="ts">
   import CardList from '../../Cards/CardList.svelte'
   import AddCard from '../../Cards/AddCard.svelte'
   import OrganisationCard from '../../Cards/OrganisationCard.svelte'
   import { onMount } from 'svelte'
   import { gqlHelper } from '../../../utils/graphQL'
   import Plus from 'svelte-material-icons/Plus.svelte'

   let loading = 0, errors = undefined, organizations = []

   const addOrganisation = () => {}

   onMount(async () => {
      loading += 1
      organizations = await gqlHelper.queries
         .organizations()
         .catch(e => {
            errors = e
         })
         .finally(() => {
            loading -= 1
         })
   })
</script>

<div class="c-page">
   {#if loading > 0}
      Loading
   {:else if errors}
      Could not fetch organizations
   {:else if organizations.length > 0}
      <CardList>
         {#each organizations as organization}
            <OrganisationCard name={organization.name} />
         {/each}
         <AddCard page={'organisations'} />
      </CardList>
   {:else}
      <div class="o-container-center">
         <h2>Geen verenigingen gevonden...</h2>

         <div on:click={addOrganisation} class="c-button-addcard">
            <div class="c-addcard-icon">
               <Plus />
            </div>
         </div>
      </div>
   {/if}
</div>
