<script lang="ts">
  import AccountCircleOutline from 'svelte-material-icons/AccountCircleOutline.svelte'
  import LogoutVariant from 'svelte-material-icons/LogoutVariant.svelte'
  import ArrowCollapseLeft from 'svelte-material-icons/ArrowCollapseLeft.svelte'
  import ChevronDown from 'svelte-material-icons/ChevronDown.svelte'
  import SidebarOrganizations from './SidebarOrganizations.svelte'
  import { Link } from 'svelte-navigator'
  import { authStore } from '../../utils/auth'

  let sidebarCollapsed = false
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

  function toggleSidebarCollapse() {
     sidebarCollapsed = !sidebarCollapsed

     console.log('collapsed sidebar')
     console.log(sidebarCollapsed)
  }
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
     class="c-sb-button {sidebarCollapsed ? 'c-sb-button--collapsed' : ''}"
  >
     <div class="c-sb-button__icon">
        <AccountCircleOutline />
     </div>

     <div class="c-sb-button__text">{$authStore.user.name || 'Onbekend'}</div>
  </Link>

  <Link
     to="/signout"
     class="c-sb-button {sidebarCollapsed ? 'c-sb-button--collapsed' : ''}"
  >
     <div class="c-sb-button__icon">
        <LogoutVariant />
     </div>

     <div class="c-sb-button__text">Uitloggen</div>
  </Link>
  
  <SidebarOrganizations />

  {#if !smallScreen}
     <div
        on:click={toggleSidebarCollapse}
        class="c-sb-button c-sb-button--bottom {sidebarCollapsed ? 'c-sb-button--collapsed' : ''}"
     >
        <div class="c-sb-button__icon {sidebarCollapsed ? 'u-flip' : ''}">
           <ArrowCollapseLeft />
        </div>

        <div class="c-sb-button__text u-collapsible">Inklappen</div>
     </div>
  {/if}
</div>
