<script lang="ts">
   import AccountCircleOutline from 'svelte-material-icons/AccountCircleOutline.svelte'
   import LogoutVariant from 'svelte-material-icons/LogoutVariant.svelte'
   import SidebarCollapse from './SidebarCollapse.svelte'
   import { Link } from 'svelte-navigator'
   import { authStore } from '../../utils/auth'
   import SidebarOrganizations from './SidebarOrganizations.svelte'
   import Logo from '../Logo.svelte'

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

   function toggleSidebarCollapse() {
      sidebarCollapsed = !sidebarCollapsed

      console.log('collapsed sidebar')
      console.log(sidebarCollapsed)
   }
</script>

<div class="c-sidebar {sidebarCollapsed ? 'c-sidebar--collapsed' : ''}">
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

   <Link to="/signout" class="c-sb-button {sidebarCollapsed ? 'c-sb-button--collapsed' : ''}">
      <div class="c-sb-button__icon">
         <LogoutVariant />
      </div>

      <div class="c-sb-button__text">Uitloggen</div>
   </Link>

   <SidebarOrganizations />

   {#if !smallScreen}
      <SidebarCollapse on:collapse={toggleSidebarCollapse} {sidebarCollapsed} />
   {/if}
</div>
