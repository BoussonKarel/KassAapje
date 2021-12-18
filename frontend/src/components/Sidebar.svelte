<script lang="ts">
   import AccountCircleOutline from 'svelte-material-icons/AccountCircleOutline.svelte'
   import LogoutVariant from 'svelte-material-icons/LogoutVariant.svelte'
   import ChevronUp from 'svelte-material-icons/ChevronUp.svelte'
   import OrganisationList from './OrganisationList.svelte'

   let sidebarCollapse = false
   let orgsCollapse = false

   async function handleProfileClick(event) {
      console.log('Profile Click')
      console.log(event)
   }
   async function handleLogoutClick(event) {
      console.log('Logout Click')
      console.log(event)
   }
   function toggleOrgsCollapse() {
      orgsCollapse = !orgsCollapse

      console.log('collapsed all orgs')

      console.log(orgsCollapse)
   }
</script>

<div class="c-sidebar">
   <div class="c-sidebar__title">KassAapje</div>

   <div on:click={handleProfileClick} class="c-sidebar__profile">
      <div class="c-sidebar__profile--icon">
         <AccountCircleOutline />
      </div>
      <div class="c-sidebar__profile--name">Michiel</div>
   </div>

   <div on:click={handleLogoutClick} class="c-sidebar__logout">
      <div class="c-sidebar__logout--icon">
         <LogoutVariant />
      </div>
      <div class="c-sidebar__logout--text u-collapsible">Uitloggen</div>
   </div>

   <div class="c-sidebar__orglist">
      <div on:click={toggleOrgsCollapse} class="c-sidebar__orglist--title">
         <div class="c-sidebar__orglist--title-text">Verenigingen</div>
         <div class="c-sidebar__orglist--title-chevron {orgsCollapse ? 'u-flip' : ''}">
            <ChevronUp />
         </div>
      </div>

      <OrganisationList {orgsCollapse} />
   </div>
</div>
