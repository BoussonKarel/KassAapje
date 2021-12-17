<script lang="ts">
   import './styles/screen.scss'
   import { Router, Route, navigate } from 'svelte-navigator'
   import Register from './components/pages/Auth/Register.svelte'
   import Login from './components/pages/Auth/Login.svelte'
   import Sidebar from './components/Sidebar.svelte'
   import OrganisationOverview from './components/pages/Organisation/OrganisationOverview.svelte'
   import AddOrganisation from './components/pages/Organisation/AddOrganisation.svelte'
   import OrganisationInfo from './components/pages/Organisation/organisationInfo.svelte'
   import OrderOverview from './components/pages/Order/OrderOverview.svelte'
   import RegisterInfo from './components/pages/Register/RegisterInfo.svelte'
   import ProductOverview from './components/pages/Product/ProductOverview.svelte'
   import AddProduct from './components/pages/Product/AddProduct.svelte'
   import RegisterOverview from './components/pages/Register/RegisterOverview.svelte'
   import AddOrder from './components/pages/Order/AddOrder.svelte'
   import { onMount } from 'svelte'
   import { useNavigate } from "svelte-navigator";
   import { getAuth, onAuthStateChanged } from '@firebase/auth'
   import { authStore } from './stores/authStore'

   onMount(() => {
      onAuthStateChanged(getAuth(), user => {
         authStore.set({
            isLoggedIn: user != null,
            user,
         })
      })
   })

   const signOut = async () => {
      const navigate = useNavigate();
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
               const navigate = useNavigate();
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
            <!-- Check permission in organization -->
            <Route path="/">
               <OrganisationInfo id={params.orgId} />
            </Route>
            <Route path="/registers">
               <RegisterOverview />
            </Route>

            <Route path="/:regId/*">
               <!-- Check permission in register -->
               <Route path="/">
                  <AddOrder />
               </Route>
               <Route path="/orders">
                  <OrderOverview />
               </Route>
               <Route path="/info">
                  <RegisterInfo id={params.regId} />
               </Route>
               <Route path="/products/*">
                  <Route path="/">
                     <ProductOverview />
                  </Route>
                  <Route path="/add">
                     <AddProduct />
                  </Route>
               </Route>
            </Route>
         </Route>
      {/if}
   </Router>
</main>
