<script lang="ts">
   import { Route } from 'svelte-navigator'

   import { authStore, Role } from '../../utils/auth'
   import { useParams } from 'svelte-navigator'
   import AddOrder from '../pages/Order/AddOrder.svelte'
   import OrderOverview from '../pages/Order/OrderOverview.svelte'
   import RegisterInfo from '../pages/Register/RegisterInfo.svelte'
   import ProductOverview from '../pages/Product/ProductOverview.svelte'
   import AddProduct from '../pages/Product/AddProduct.svelte'

   const params = useParams()

   $: isUser = false
   $: isOwner = false

   const checkRegisterPermissions = async (organization_id: string, register_id: string) => {
      const perms = $authStore.roles;
      isOwner = perms.registers.some(o => o.id === register_id && o.role === Role.OWNER) // Owner in register
         || perms.organizations.some(o => o.id === organization_id && o.role === Role.OWNER) // Owner in organization

         
      isUser = isOwner || perms.registers.some(o => o.id === register_id)
      console.log($params)
   }

   $: checkRegisterPermissions($params.orgId, $params.regId)
</script>

{#if isUser}
   <Route path="/">
      <AddOrder />
   </Route>
   <Route path="/orders">
      <OrderOverview />
   </Route>
   <Route path="/info">
      <RegisterInfo id={$params.regId} />
   </Route>
   {#if isOwner}
      <Route path="/products/*">
         <Route path="/">
            <ProductOverview />
         </Route>
         <Route path="/add">
            <AddProduct />
         </Route>
      </Route>
   {:else}
   You don't have permission to work in the register catalogue.
   {/if}
{:else}
   You don't have permission to work in this register.
{/if}
