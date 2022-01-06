<script lang="ts">
   import { Route } from 'svelte-navigator'

   import { authStore, Role } from '../../utils/auth'
   import { useParams } from 'svelte-navigator'
   import OrderOverview from '../pages/Order/OrderOverview.svelte'
   import RegisterInfo from '../pages/Register/RegisterInfo.svelte'
   import ProductOverview from '../pages/Product/ProductOverview.svelte'
   import AddProduct from '../pages/Product/AddProduct.svelte'
   import EditRegister from '../pages/Register/EditRegister.svelte'
   import OrderScreen from '../pages/Order/OrderScreen.svelte'

   const params = useParams()
   export let orgId: string

   $: isUser = false
   $: isOwner = false

   const checkRegisterPermissions = async (organization_id: string, register_id: string) => {
      const perms = $authStore.roles
      isOwner =
         perms.registers.some(o => o.id === register_id && o.role === Role.OWNER) || // Owner in register
         perms.organizations.some(o => o.id === organization_id && o.role === Role.OWNER) // Owner in organization

      isUser = isOwner || perms.registers.some(o => o.id === register_id)
   }

   $: checkRegisterPermissions(orgId, $params.regId)
</script>

{#if isUser}
   <Route path="/">
      <OrderScreen />
   </Route>
   <Route path="/orders">
      <OrderOverview />
   </Route>
   <Route path="/info">
      <RegisterInfo id={$params.regId} {orgId} />
   </Route>

   {#if isOwner}
      <Route path="/edit">
         <EditRegister register_id={$params.regId} />
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
      You don't have permission to work in the register catalogue.
   {/if}
{:else}
   <div class="c-page">
      <div class="o-container-center">
         <div class="c-bigcard c-bigcard--error">
            <div class="c-bigcard__text">You don't have permission to work in this register.</div>
         </div>
      </div>
   </div>
{/if}
