<script lang="ts">
   import { Route } from 'svelte-navigator'

   import { getPermissions, Role } from '../utils/auth'
   import OrganisationInfo from './pages/Organisation/organisationInfo.svelte'
   import RegisterOverview from './pages/Register/RegisterOverview.svelte'
   import { useParams } from 'svelte-navigator'
   import RegisterRoutes from './RegisterRoutes.svelte'

   const params = useParams()

   $: isUser = false
   $: isOwner = false

   const checkOrganizationPermission = async (organization_id: string) => {
      const perms = await getPermissions()
      isUser = perms.organizations.some(o => o.id === organization_id)
      isOwner = perms.organizations.some(o => o.id === organization_id && o.role === Role.OWNER)
      console.log(isUser)
   }

   $: checkOrganizationPermission($params.orgId)
</script>

{#if isUser}
   <!-- Check permission in organization -->
   <Route path="/">
      <OrganisationInfo id={$params.orgId} />
   </Route>
   <Route path="/registers">
      <RegisterOverview />
   </Route>
   <Route path="/:regId/*" let:params>
      <RegisterRoutes />
   </Route>
{:else}
   No permission.
{/if}
