<script lang="ts">
   import { Route } from 'svelte-navigator'

   import { getPermissions, Role } from '../utils/auth'
   import { useParams } from 'svelte-navigator'
   import AddOrder from './pages/Order/AddOrder.svelte'
   import OrderOverview from './pages/Order/OrderOverview.svelte'
   import RegisterInfo from './pages/Register/RegisterInfo.svelte'
   import ProductOverview from './pages/Product/ProductOverview.svelte'
   import AddProduct from './pages/Product/AddProduct.svelte'

   const params = useParams()

   $: isUser = false
   $: isOwner = false

   const checkRegisterPermissions = async (register_id: string) => {
      const perms = await getPermissions()
      isUser = perms.registers.some(o => o.id === register_id)
      isOwner = perms.registers.some(o => o.id === register_id && o.role === Role.OWNER)
   }

   $: checkRegisterPermissions($params.regId)
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
   <Route path="/products/*">
      <Route path="/">
         <ProductOverview />
      </Route>
      <Route path="/add">
         <AddProduct />
      </Route>
   </Route>
{:else}
  No permission.
{/if}