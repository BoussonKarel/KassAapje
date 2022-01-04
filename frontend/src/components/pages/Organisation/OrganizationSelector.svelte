<script lang="ts">
   import CardList from '../../Cards/CardList.svelte'
   import AddCard from '../../Cards/AddCard.svelte'
   import OrganisationCard from '../../Cards/OrganisationCard.svelte'
   import { onMount } from 'svelte'
   import { gqlHelper } from '../../../utils/graphQL'
   import Plus from 'svelte-material-icons/Plus.svelte'
   import { writable } from 'svelte/store'
   import SectionLoading from '../../Loading/SectionLoading.svelte'
   import SkeletonCard from '../../Cards/SkeletonCard.svelte';

   let fetchingState = "", organizations = undefined

   const addOrganisation = () => {}

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
      <!-- <SectionLoading /> -->

      <CardList>
         <SkeletonCard />
      </CardList>
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

         <div on:click={addOrganisation} class="c-button-addcard">
            <div class="c-addcard-icon">
               <Plus />
            </div>
         </div>
      </div>
   {/if}
</div>