<script lang="ts">
   import AccountCircleOutline from 'svelte-material-icons/AccountCircleOutline.svelte'
   import LogoutVariant from 'svelte-material-icons/LogoutVariant.svelte'
   import ChevronUp from 'svelte-material-icons/ChevronUp.svelte'
   import ArrowCollapseLeft from 'svelte-material-icons/ArrowCollapseLeft.svelte'
   import OrganisationList from './OrganisationList.svelte'
   import OrganisationListItem from './OrganisationListItem.svelte'
   import ArrowCollapse from 'svelte-material-icons/ArrowCollapse.svelte'
   import { onMount } from 'svelte'
   import { gqlHelper } from '../utils/graphQL'

   let sidebarCollapse = false
   let orgsCollapse = false
   let smallScreen = false

   const minScreenSize = 992 //tablet standard
   const screenSize = window.matchMedia(`(max-width: ${minScreenSize}px)`)

   if (screenSize.matches) {
      sidebarCollapse = true
      smallScreen = true
   } else {
      sidebarCollapse = false
   }

   window.onresize = function () {
      if (screenSize.matches) {
         sidebarCollapse = true
         smallScreen = true
      } else {
         smallScreen = false
         sidebarCollapse = false
      }
   }

   function handleProfileClick(event) {
      console.log('Profile Click')
      console.log(event)
   }
   function handleLogoutClick(event) {
      console.log('Logout Click')
      console.log(event)
   }
   function toggleOrgsCollapse() {
      orgsCollapse = !orgsCollapse
   }

   function toggleSidebarCollapse() {
      sidebarCollapse = !sidebarCollapse

      console.log('collapsed sidebar')
      console.log(sidebarCollapse)
   }

   let loading = 0, errors = undefined, organizations = []

   onMount(async () => {
      loading += 1
      organizations = await gqlHelper.queries
         .organizationsWithRegisters()
         .catch(e => {
            errors = e
         })
         .finally(() => {
            loading -= 1
         })
   })
</script>

<div class="c-sidebar {sidebarCollapse ? 'u-collapsed' : ''}">
   <div class="c-sidebar__title">
      {#if sidebarCollapse}
         K
      {:else}
         KassAapje
      {/if}
   </div>

   <div on:click={handleProfileClick} class="c-sidebar__profile">
      <div class="c-sidebar__profile--icon">
         <AccountCircleOutline />
      </div>

      {#if !sidebarCollapse}
         <div class="c-sidebar__profile--name">Michiel</div>
      {/if}
   </div>

   <div on:click={handleLogoutClick} class="c-sidebar__logout">
      <div class="c-sidebar__logout--icon">
         <LogoutVariant />
      </div>

      {#if !sidebarCollapse}
         <div class="c-sidebar__logout--text u-collapsible">Uitloggen</div>
      {/if}
   </div>
   {#if !sidebarCollapse}
      {#if organizations.length > 0}
      <div class="c-sidebar__orglist">
         <div on:click={toggleOrgsCollapse} class="c-sidebar__orglist--title">
            <div class="c-sidebar__orglist--title-text">Verenigingen</div>
            <div class="c-sidebar__orglist--title-chevron {orgsCollapse ? 'u-flip' : ''}">
               <ChevronUp />
            </div>
         </div>

         <OrganisationList {orgsCollapse}>
            {#each organizations as organization}
               <OrganisationListItem {organization} />
            {/each}
         </OrganisationList>
      </div>
      {/if}
   {/if}

   {#if !smallScreen}
      <div on:click={toggleSidebarCollapse} class="c-sidebar__collapse">
         <div class="c-sidebar__collapse--icon {sidebarCollapse ? 'u-flip' : ''}">
            <ArrowCollapseLeft />
         </div>

         {#if !sidebarCollapse}
            <div class="c-sidebar__collapse--text u-collapsible">Inklappen</div>
         {/if}
      </div>
   {/if}
</div>
