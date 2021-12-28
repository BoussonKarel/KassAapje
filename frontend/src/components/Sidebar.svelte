<script lang="ts">
   import AccountCircleOutline from 'svelte-material-icons/AccountCircleOutline.svelte'
   import LogoutVariant from 'svelte-material-icons/LogoutVariant.svelte'
   import ChevronUp from 'svelte-material-icons/ChevronUp.svelte'
   import ArrowCollapseLeft from 'svelte-material-icons/ArrowCollapseLeft.svelte'
   import OrganisationList from './OrganisationList.svelte'
   import OrganisationListItem from './OrganisationListItem.svelte'
   import { onMount } from 'svelte'
   import { gqlHelper } from '../utils/graphQL'
   import { Link } from 'svelte-navigator'
   import { authStore } from '../utils/auth'

   let sidebarCollapsed = false
   let orgsCollapse = false
   let smallScreen = false

   const minScreenSize = 992 //tablet standard
   const screenSize = window.matchMedia(`(max-width: ${minScreenSize}px)`)

   if (screenSize.matches) {
      sidebarCollapsed = true
      smallScreen = true
   } else {
      sidebarCollapsed = false
   }

   window.onresize = function () {
      if (screenSize.matches) {
         sidebarCollapsed = true
         smallScreen = true
      } else {
         smallScreen = false
         sidebarCollapsed = false
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
      sidebarCollapsed = !sidebarCollapsed

      console.log('collapsed sidebar')
      console.log(sidebarCollapsed)
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

<div class="c-sidebar {sidebarCollapsed ? 'c-sidebar--collapsed' : ''}">
   <div class="c-sidebar__title">
      {#if sidebarCollapsed}
         K
      {:else}
         KassAapje
      {/if}
   </div>

   <Link
      to="#"
      class={`c-sb-button ${sidebarCollapsed ? 'c-sb-button--collapsed' : ''}`}
   >
      <div class="c-sb-button__icon">
         <AccountCircleOutline />
      </div>

      <div class="c-sb-button__text">{$authStore.user.name || 'Onbekend'}</div>
   </Link>

   <Link
      to="/signout"
      class={`c-sb-button ${sidebarCollapsed ? 'c-sb-button--collapsed' : ''}`}
   >
      <div class="c-sb-button__icon">
         <LogoutVariant />
      </div>

      <div class="c-sb-button__text">Uitloggen</div>
   </Link>
   {#if fetchingState === '' && organizations && organizations.length > 0}
      <div class="c-sidebar__section c-sb-section">
         <div on:click={toggleOrgsCollapse} class="c-sb-section__header">
            <div class="c-sb-section__title">Verenigingen</div>
            <div class="c-c-sb-section__chevron {orgsCollapse ? 'u-flip' : ''}">
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

   {#if !smallScreen}
      <div
         on:click={toggleSidebarCollapse}
         class={`c-sb-button c-sb-button--bottom ${sidebarCollapsed ? 'c-sb-button--collapsed' : ''}`}
      >
         <div class="c-sb-button__icon {sidebarCollapsed ? 'u-flip' : ''}">
            <ArrowCollapseLeft />
         </div>

         <div class="c-sb-button__text u-collapsible">Inklappen</div>
      </div>
   {/if}
</div>
