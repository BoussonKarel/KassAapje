<script lang="ts">
  import './styles/screen.scss'
  import Sidebar from './components/sidebar.svelte'
  import OrganisationOverview from './components/pages/Organisation/organisationOverview.svelte'
  import AddOrganisation from './components/pages/Organisation/AddOrganisation.svelte'
  import OrganisationInfo from './components/pages/Organisation/OrganisationInfo.svelte'
  import RegisterOverview from './components/pages/Register/RegisterOverview.svelte'
  import AddRegister from './components/pages/Register/AddRegister.svelte'
  import RegisterInfo from './components/pages/Register/RegisterInfo.svelte'
  import UserInfo from './components/pages/User/UserInfo.svelte'
  import EditUser from './components/pages/User/EditUser.svelte'
import NavigationBar from './components/navigationBar.svelte'
</script>

<main class="c-app">
  <Sidebar />
  
  
  <div class="c-page">
    <div class="c-navigation">
      <NavigationBar/>
    </div>
    <!-- <OrganisationOverview /> -->
    <!-- <AddOrganisation/> -->
    <!-- <OrganisationInfo /> -->

    <!-- <RegisterOverview/> -->
    <!-- <AddRegister /> -->
    <!-- <RegisterInfo/> -->

    <!-- <UserInfo /> -->
    <!-- <EditUser/> -->
  </div>
  <div />
</main>
