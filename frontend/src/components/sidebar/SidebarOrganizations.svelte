<script lang="ts">
   import { gqlHelper } from '../../utils/graphQL'
   import { onMount } from 'svelte'
   import OrganisationList from '../OrganisationList.svelte'
   import OrganisationListItem from '../OrganisationListItem.svelte'
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
      <div class="c-sb-section__title">Verenigingen</div>
      <div class="c-sb-section__chevron">
         <ChevronDown />
      </div>
   </div>

   {#if fetchingState === '' && organizations && organizations.length > 0}
      <div class="c-sb-section__content">
         <OrganisationList {collapsed}>
            {#each organizations as organization}
               <OrganisationListItem {organization} />
            {/each}
         </OrganisationList>
      </div>
   {/if}
</div>
