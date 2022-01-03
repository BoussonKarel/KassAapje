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



<div class="c-sidebar__org c-sb-org {!collapsed ? 'c-sb-org--expanded' : ''}">
   <button on:click={toggleCollapse} class="u-button-reset c-sb-org__header">
      <div class="c-sb-org__title">KSA Kriko</div>
      <div class="c-sb-org__chevron">
         <ChevronDown />
      </div>
   </button>

   <!-- Registers -->
   {#if fetchingState === '' && organizations && organizations.length > 0}
      <ul class="c-sb-org__content">
         <li class="c-sb-org__item">

         </li>
         <li class="c-sb-org__item c-sb-org__item--setting">

         </li>
      </ul>
   {/if}
</div>
