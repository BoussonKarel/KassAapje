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
  import OrderScreen from './components/pages/Order/OrderScreen.svelte'
  import Register from './components/pages/Auth/Register.svelte'

  import { auth } from './components/Auth/Firebase'
</script>

<main class="c-app">
  
  <!-- <Sidebar />

  <div class="c-page">
    <div class="c-navigation">
      <NavigationBar />
      <div class="c-button-manage">
        Beheren
      </div>
    </div>
    <OrganisationOverview />
    <AddOrganisation/>
    <OrganisationInfo />

    <RegisterOverview/>
    <AddRegister />
    <RegisterInfo/>

    <UserInfo />
    <EditUser/>

    <OrderScreen />
  </div>
  <div /> -->

  <Register/>
</main>
