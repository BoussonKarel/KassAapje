<script lang="ts">
   import { Route } from 'svelte-navigator'

   import { authStore, Role } from '../../utils/auth'
   import OrganizationInfo from '../pages/Organization/OrganizationInfo.svelte'
   import EditOrganization from '../pages/Organization/EditOrganization.svelte'
   import RegisterSelector from '../pages/Register/RegisterSelector.svelte'
   import { useParams } from 'svelte-navigator'
   import RegisterRoutes from './RegisterRoutes.svelte'
   import AddRegister from '../pages/Register/AddRegister.svelte'

   const params = useParams()

   $: isUser = false
   $: isOwner = false

   const checkOrganizationPermission = async (organization_id: string) => {
      const perms = $authStore.roles
      isUser = perms.organizations.some(o => o.id === organization_id)
      isOwner = perms.organizations.some(o => o.id === organization_id && o.role === Role.OWNER)
      console.log(isUser)
   }

   $: checkOrganizationPermission($params.orgId)
</script>

{#if isUser}
   <!-- Check permission in organization -->
   <Route path="/">
      <RegisterSelector organization_id={$params.orgId} />
   </Route>
   <Route path="/info">
      <OrganizationInfo id={$params.orgId} />
   </Route>
   {#if isOwner}
      <Route path="/edit">
         <EditOrganization  id={$params.orgId} />
      </Route>
      <Route path="/new">
         <AddRegister organization_id={$params.orgId} />
      </Route>
   {:else}
      No owner perms to edit organization
   {/if}
   <Route path="/:regId/*">
      <RegisterRoutes orgId={$params.orgId} />
   </Route>
{:else}
   You don't have permission to work in this organization.
{/if}
