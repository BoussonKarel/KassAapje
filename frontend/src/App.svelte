<script lang="ts">
   import './styles/screen.scss'
   import { Router, Route } from "svelte-navigator";

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
   import ProductOverview from './components/pages/Product/ProductOverview.svelte'
   import AddProduct from './components/pages/Product/AddProduct.svelte'
   import { auth } from './utils/auth'

   let loggedIn = () => (auth.currentUser ? true : false)
   // let loggedIn = false
</script>

<main class="c-app">
   <Router>
      {#if !loggedIn}
         <Route path="/register">
            <Register />
         </Route>
         <Route path="/login">
            <Login />
         </Route>
      {:else}
         <Sidebar />
         <Route path="/">
            <OrganisationOverview />
         </Route>
         <Route path="/new">
            <AddOrganisation />
         </Route>
         <Route path="/:orgId/*" let:params>
            <!-- Check permission in organization -->
            <Route path="/">
               <OrganisationInfo id={params.orgId} />
            </Route>

            <Route path="/:regId/*">
               <!-- Check permission in register -->
               <Route path="/">
                  <OrderScreen />
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

   <!-- IS LOGGED IN -->

   <!--
            <Router path="/userid">
               <Route exact>
                  <UserInfo />
               </Route>
               <Route path="/edit">
                  <EditUser />
               </Route>
            </Router>

            <Route fallback>404 not found</Route>
         </Router>
      {/if}
   </Router> -->
</main>
