<script lang="ts">
   import { Route, Router, useParams } from 'svelte-navigator'
   import { onMount } from 'svelte'
   import { getAuth } from 'firebase/auth'
   import { authHelper, authStore, setAuthStore } from '../../utils/auth'

   import Login from '../pages/Auth/Login.svelte'
   import Register from '../pages/Auth/Register.svelte'

   import OrganizationRoutes from './OrganizationRoutes.svelte'
   import AddOrganisation from '../pages/Organization/AddOrganization.svelte'
   import OrganizationSelector from '../pages/Organization/OrganizationSelector.svelte'
   import Sidebar from '../sidebar/Sidebar.svelte'
   import AcceptInvitation from '../pages/AcceptInvitation.svelte'
   import ForgotPassword from '../pages/Auth/ForgotPassword.svelte';

   const updateAuthStore = async user => {
      if (user) {
         setAuthStore(user)
      } else {
         authStore.set(null)
      }
   }

   onMount(() => {
      getAuth().onAuthStateChanged((u) => {
         updateAuthStore(u)
      })
      getAuth().onIdTokenChanged((u) => {
         updateAuthStore(u)
      })
   })
</script>

<Router>
   {#if $authStore == null}
      <Route>
         <Login />
      </Route>
      <Route path="/register">
         <Register />
      </Route>
      <Route path="/forgotpassword">
         <ForgotPassword />
      </Route>
   {:else}
      <Sidebar />
      
      <Route path="/">
         <OrganizationSelector />
      </Route>
      <Route path="/new">
         <AddOrganisation />
      </Route>
      <Route path="/signout">
         {() => authHelper.signout()}
      </Route>
      <Route path="/:orgId/*">
         <OrganizationRoutes />
      </Route>
   {/if}
   <Route path="/invitation/:invId" let:params>
      <AcceptInvitation invitation_id={params.invId} />
   </Route>
</Router>
