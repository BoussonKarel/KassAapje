<script lang="ts">
   import './styles/screen.scss'
   import { Router, Route } from 'svelte-navigator'
   import Register from './components/pages/Auth/Register.svelte'
   import Login from './components/pages/Auth/Login.svelte'
   import Sidebar from './components/Sidebar.svelte'
   import OrganisationOverview from './components/pages/Organisation/OrganisationOverview.svelte'
   import AddOrganisation from './components/pages/Organisation/AddOrganisation.svelte'
   import { onMount } from 'svelte'
   import { useNavigate } from 'svelte-navigator'
   import { authStore } from './stores/authStore'
   import OrganizationRoutes from './components/OrganizationRoutes.svelte';
   import { getAuth, onAuthStateChanged } from 'firebase/auth';

   onMount(() => {
      onAuthStateChanged(getAuth(), user => {
         authStore.set({
            isLoggedIn: user != null,
            user,
         })
      })
   })

   const signOut = async () => {
      const navigate = useNavigate()
      await getAuth().signOut()
      navigate('/')
   }

   $: loggedIn = $authStore.isLoggedIn
</script>

<main class="c-app">
   <Router>
      {#if !loggedIn}
         <Route>
            <Login />
         </Route>
         <Route path="/register">
            <Register />
         </Route>
         <Route path="/login">
            {(() => {
               const navigate = useNavigate()
               navigate('/')
            })()}
         </Route>
      {:else}
         <Sidebar />
         <Route path="/">
            <OrganisationOverview />
         </Route>
         <Route path="/new">
            <AddOrganisation />
         </Route>
         <Route path="/signout">
            {signOut()}
         </Route>
         <Route path="/:orgId/*" let:params>
            <OrganizationRoutes />
         </Route>
      {/if}
   </Router>
</main>
