<script lang="ts">
   import './styles/screen.scss'

   import { Router, Route, Link, router } from 'yrv'

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

   let isAuthenticated = true
</script>

<Router path="/">
   <main class="c-app">
      {#if isAuthenticated}
         <Sidebar />
         <Route exact>
            <OrganisationOverview />
         </Route>
         <Route path="/add-organisation">
            <AddOrganisation />
         </Route>

         <Router path="/orgid">
            <Route exact>
               <RegisterOverview />
            </Route>
            <Route path="/info">
               <OrganisationInfo />
            </Route>
            <Route path="/add-register">
               <AddRegister />
            </Route>

            <Route path="/registerid">
               <Route exact>
                  <OrderScreen />
               </Route>
               <Route path="/info">
                  <RegisterInfo />
               </Route>
               <Route path="/products">
                  <ProductOverview />
               </Route>
               <Route path="/add-product">
                  <AddProduct />
               </Route>
            </Route>
         </Router>

         <Router path="/userid">
            <Route exact>
               <UserInfo />
            </Route>
            <Route path="/edit">
               <EditUser />
            </Route>
         </Router>
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
