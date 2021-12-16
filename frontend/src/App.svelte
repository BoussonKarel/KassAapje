<script lang="ts">
  import './styles/screen.scss'

  import { Route, Router } from 'svelte-routing'

  import Login from './components/pages/Auth/Login.svelte'
  import Register from './components/pages/Auth/Register.svelte'
  import OrganisationOverview from './components/pages/Organisation/OrganisationOverview.svelte'
  import OrganisationInfo from './components/pages/Organisation/organisationInfo.svelte'
  import Sidebar from './components/Sidebar.svelte'
  import UserInfo from './components/pages/User/UserInfo.svelte'
  import EditUser from './components/pages/User/EditUser.svelte'
  import AddOrganisation from './components/pages/Organisation/AddOrganisation.svelte'
  import RegisterOverview from './components/pages/Register/RegisterOverview.svelte'
  import AddRegister from './components/pages/Register/AddRegister.svelte'
  import RegisterInfo from './components/pages/Register/RegisterInfo.svelte'
  import OrderScreen from './components/pages/Order/OrderScreen.svelte'

  export let url = ''
  let isAuthenticated = true
</script>

<Router {url}>
  <main class="c-app">
    {#if isAuthenticated}
      <Sidebar />
      <Route path="/">
        <OrganisationOverview />
      </Route>
      <Route path="/organisation/add">
        <AddOrganisation />
      </Route>
      <Route path="/orgid/info">
        <OrganisationInfo />
      </Route>
      <Route path="/orgid">
        <RegisterOverview />
      </Route>
      <Route path="/orgid/register/add">
        <AddRegister />
      </Route>
      <Route path="/orgid/registerid/info">
        <RegisterInfo />
      </Route>
      <Route path="/orgid/registerid">
        <OrderScreen />
      </Route>

      <Route path="/userid/">
        <UserInfo />
      </Route>
      <Route path="/userid/edit">
        <EditUser />
      </Route>
    {:else}
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    {/if}
  </main>
</Router>
