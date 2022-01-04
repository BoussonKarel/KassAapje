<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'
   import CardList from '../../Cards/CardList.svelte'
   import RegisterCard from '../../Cards/RegisterCard.svelte'
   import { onMount } from 'svelte'
   import SectionLoading from '../../Loading/SectionLoading.svelte'
   import SkeletonCard from '../../Cards/SkeletonCard.svelte'
   import Plus from 'svelte-material-icons/Plus.svelte';
   import { gqlHelper } from '../../../utils/graphQL';

   export let organization_id

   let fetchingState = '',
      registers = undefined

   const getRegisters = async () => {
      fetchingState = "loading";

      registers = await gqlHelper.queries
         .registers(organization_id)
         .catch(e => {
            fetchingState = "error";
         })
         .finally(() => {
            fetchingState = "";
         })

      // Filter which ones he has perms??
   }

   const addRegister = async () => {}

   onMount(() => {
      getRegisters()
   })
</script>

<div class="c-page">
   <NavigationBar title="Kassa's" />

   {#if fetchingState === 'loading'}
      <SectionLoading />

      <CardList>
         <SkeletonCard />
      </CardList>
   {:else if fetchingState === 'error'}
      Kon organisaties niet ophalen.
   {:else if registers && registers.length > 0}
      <CardList>
         {#each registers as register}
            <RegisterCard {register} />
         {/each}
      </CardList>
   {:else}
      <div class="o-container-center">
         <h2>Geen kassa's gevonden...</h2>

         <div on:click={addRegister} class="c-button-addcard">
            <div class="c-addcard-icon">
               <Plus />
            </div>
         </div>
      </div>
   {/if}
</div>
