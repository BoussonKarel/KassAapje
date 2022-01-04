<script lang="ts">
   import CardList from '../../Cards/CardList.svelte'
   import AddCard from '../../Cards/AddCard.svelte'
   import OrganisationCard from '../../Cards/OrganisationCard.svelte'
   import { onMount } from 'svelte'
   import { gqlHelper } from '../../../utils/graphQL'
   import Plus from 'svelte-material-icons/Plus.svelte'
   import { writable } from 'svelte/store'
   import { Link } from 'svelte-navigator'

   let fetchingState = "", organizations = undefined


   const getOrganizations = async () => {
      fetchingState = "loading";

      organizations = await gqlHelper.queries
         .userOrganizations()
         .catch(e => {
            fetchingState = "error";
         })
         .finally(() => {
            fetchingState = "";
         })
   }

   onMount(() => {
      getOrganizations()
   })
</script>

<div class="c-page">
   {#if fetchingState === "loading"}
      Loading
   {:else if fetchingState === "error"}
      Kon organisaties niet ophalen.
   {:else if organizations && organizations.length > 0}
      <CardList>
         {#each organizations as organization}
            <OrganisationCard organization={organization} />
         {/each}
         <AddCard page={'organisations'} />
      </CardList>
   {:else}
      <div class="o-container-center">
         <h2>Geen verenigingen gevonden...</h2>

         <Link to='/new' class="c-button-addorg">
               <div class="c-button-addorg__icon">
                  <Plus />
               </div>
         </Link>

         
      </div>
   {/if}
</div>
