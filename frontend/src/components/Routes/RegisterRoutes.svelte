<script lang="ts">
   import { Route } from 'svelte-navigator'

   import { authStore } from '../../utils/auth'
   import { Role } from '../../models/Role'
   import { useParams } from 'svelte-navigator'
   import OrderOverview from '../pages/Order/OrderOverview.svelte'
   import RegisterInfo from '../pages/Register/RegisterInfo.svelte'
   import ProductOverview from '../pages/Product/ProductOverview.svelte'
   import AddEditProduct from '../pages/Product/AddEditProduct.svelte'
   import EditRegister from '../pages/Register/EditRegister.svelte'
   import OrderScreen from '../pages/Order/OrderScreen.svelte'
import CreateInvitation from '../pages/CreateInvitation.svelte';
import NoRegPerms from '../pages/Auth/NoRegPerms.svelte'

   const parentParams = useParams()
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

   $: checkRegisterPermissions(orgId, $parentParams.regId)
</script>

{#if isUser}
   <Route path="/">
      <OrderScreen register_id={$parentParams.regId} {isOwner} />
   </Route>
   <Route path="/info">
      <RegisterInfo register_id={$parentParams.regId} {isOwner} />
   </Route>

   {#if isOwner}
      <Route path="/roles">
         <CreateInvitation register_id={$parentParams.regId} />
      </Route>
      <Route path="/orders">
         <OrderOverview register_id={$parentParams.regId} />
      </Route>
      <Route path="/edit">
         <EditRegister register_id={$parentParams.regId} />
      </Route>
      <Route path="/products/*">
         <Route path="/">
            <ProductOverview register_id={$parentParams.regId} {isOwner} />
         </Route>
         <Route path="/add">
            <AddEditProduct register_id={$parentParams.regId} />
         </Route>
         <Route path="/:prodId/edit" let:params>
            <AddEditProduct register_id={$parentParams.regId} product_id={params.prodId} />
         </Route>
      </Route>
   {/if}
   <Route>
      <NoRegPerms/>
   </Route>
{:else}
<div class="c-page">
   <div class="o-container-center">
      <div class="c-bigcard c-bigcard--error">
         <div class="c-bigcard__text">Het lijkt erop dat je niet correct ingelogd bent.</div>
      </div>
   </div>
</div>
{/if}
