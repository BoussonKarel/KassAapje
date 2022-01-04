<script lang="ts">
   import { Route, Router } from 'svelte-navigator'
   import { onMount } from 'svelte'
   import { getAuth, signOut } from 'firebase/auth'
   import PageLoading from '../Loading/PageLoading.svelte';
   import { authHelper, authStore, setAuthStore } from '../../utils/auth';

   import Login from '../pages/Auth/Login.svelte'
   import Register from '../pages/Auth/Register.svelte'

   import OrganizationRoutes from './OrganizationRoutes.svelte'
   import AddOrganisation from '../pages/Organisation/AddOrganisation.svelte'
   import OrganizationSelector from '../pages/Organisation/OrganizationSelector.svelte'
   import Sidebar from '../sidebar/Sidebar.svelte'

   onMount(() => {
      getAuth().onAuthStateChanged(async user => {
         if (user) {
            setAuthStore(user)
         } else {
            authStore.set(null)
         }
      })
   })

   $: loading = false
</script>

<PageLoading {loading}>
   <Router>
      {#if $authStore == null}
         <Route>
            <Login />
         </Route>
         <Route path="/register">
            <Register />
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
         <Route path="/:orgId/*" let:params>
            <OrganizationRoutes />
         </Route>
      {/if}
   </Router>
</PageLoading>
