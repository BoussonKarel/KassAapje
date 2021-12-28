<script lang="ts">
   import './styles/screen.scss'
   import { Router, Route } from 'svelte-navigator'
   import Register from './components/pages/Auth/Register.svelte'
   import Login from './components/pages/Auth/Login.svelte'
   import Sidebar from './components/sidebar/Sidebar.svelte'
   import AddOrganisation from './components/pages/Organisation/AddOrganisation.svelte'
   import { onMount } from 'svelte'
   import { useNavigate } from 'svelte-navigator'
   import OrganizationRoutes from './components/OrganizationRoutes.svelte'
   import { getAuth } from 'firebase/auth'
   import { authStore, setAuthStore } from './utils/auth'
   import PageLoading from './components/Loading/PageLoading.svelte';
   import OrganizationSelector from './components/pages/Organisation/OrganizationSelector.svelte';

   onMount(() => {
      getAuth().onAuthStateChanged(async user => {
         if (user) {
            setAuthStore(user)
         } else {
            authStore.set(null)
         }
      })
   })

   const signOut = async () => {
      const navigate = useNavigate()
      await getAuth().signOut()
      navigate('/')
   }

   $: loading = false;
</script>

<main class="c-app">
   <PageLoading loading={loading}>
      <Router>
         {#if !$authStore}
            <Route>
               <Login />
            </Route>
            <Route path="/register">
               <Register />
            </Route>
            <!-- <Route path="/login">
            {(() => {
               const navigate = useNavigate()
               navigate('/')
            })()}
         </Route> -->
         {:else}
            <Sidebar />
            <Route path="/">
               <OrganizationSelector />
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
   </PageLoading>
</main>
