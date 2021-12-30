<script lang="ts">
   import { gqlHelper } from '../../utils/graphQL'
   import { onMount } from 'svelte'
   import ChevronDown from 'svelte-material-icons/ChevronDown.svelte'

   let collapsed = false
   function toggleCollapse() {
      collapsed = !collapsed
   }

   let fetchingState = '',
      organizations = []

   const getOrganizationsEtc = async () => {
      fetchingState = 'loading'

      organizations = await gqlHelper.queries
         .organizationsWithRegisters()
         .catch(e => {
            fetchingState = 'error'
         })
         .finally(() => {
            fetchingState = ''
         })
   }

   onMount(async () => {
      getOrganizationsEtc()
   })
</script>



<div class="c-sidebar__section c-sb-section {!collapsed ? 'c-sb-section--expanded' : ''}">
   <div on:click={toggleCollapse} class="c-sb-section__header">
      <div class="c-sb-section__title">KSA Kriko</div>
      <div class="c-sb-section__chevron">
         <ChevronDown />
      </div>
   </div>

   <!-- Registers -->
   {#if fetchingState === '' && organizations && organizations.length > 0}
      <div class="c-sb-section__content">
         <!-- <SbOrganizationList {collapsed}>
            {#each organizations as organization}
               <SbOrganizationListItem {organization} />
            {/each}
         </SbOrganizationList> -->
      </div>
   {/if}
</div>
