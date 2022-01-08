<script lang="ts">
   import AccountCircleOutline from 'svelte-material-icons/AccountCircleOutline.svelte'
   import LogoutVariant from 'svelte-material-icons/LogoutVariant.svelte'
   import SidebarCollapse from './SidebarCollapse.svelte'
   import { Link, useLocation } from 'svelte-navigator'
   import { authHelper, authStore } from '../../utils/auth'
   import SidebarOrganization from './SidebarOrganization.svelte'
   import Logo from '../Logo.svelte'
   import { onMount } from 'svelte';
   import { gqlHelper } from '../../utils/graphQL';

   const location = useLocation();

   let sidebarCollapsed = false,
      smallScreen = false

   const minScreenSize = 992, //tablet standard
      screenSize = window.matchMedia(`(max-width: ${minScreenSize}px)`)

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

   export const setSidebarCollapse = (value: boolean) => {
      sidebarCollapsed = value;
   }

   function toggleSidebarCollapse() {
      sidebarCollapsed = !sidebarCollapsed
   }

   let fetchingState = '',
      organizations = []

   const getOrganizations = async () => {
      fetchingState = 'loading'

      organizations = await gqlHelper.queries
         .userOrganizationsWithRegisters()
         .catch(e => {
            fetchingState = 'error'
         })
         .finally(() => {
            fetchingState = ''
         })
   }

   onMount(async () => {
      getOrganizations();
   })
</script>

<div class="c-sidebar {sidebarCollapsed ? 'c-sidebar--collapsed' : ''} u-scrollbar-light">
   <Link to="/" class="c-sb-button c-sb-button--main  {sidebarCollapsed ? 'c-sb-button--collapsed' : ''}">
      {#if sidebarCollapsed}
         <div class="c-sb-button__icon">
            <Logo />
         </div>
      {:else}
         <div class="c-sb-button__text">
            KassAapje
         </div>
      {/if}
   </Link>

   <Link to="#" class="c-sb-button {sidebarCollapsed ? 'c-sb-button--collapsed' : ''}">
      <div class="c-sb-button__icon">
         <AccountCircleOutline />
      </div>

      <div class="c-sb-button__text">{$authStore.user.name || 'Onbekend'}</div>
   </Link>

   <a href="/" on:click={authHelper.signout} class="c-sb-button {sidebarCollapsed ? 'c-sb-button--collapsed' : ''}">
      <div class="c-sb-button__icon">
         <LogoutVariant />
      </div>

      <div class="c-sb-button__text">Uitloggen</div>
   </a>

   <div class="c-sidebar__organizations">
      {#if fetchingState == '' && organizations && organizations.length > 0}
         {#each organizations as organization}
            <SidebarOrganization {organization} />
         {/each}
      {/if}
   </div>

   {#if !smallScreen}
      <SidebarCollapse on:collapse={toggleSidebarCollapse} {sidebarCollapsed} />
   {/if}
</div>
