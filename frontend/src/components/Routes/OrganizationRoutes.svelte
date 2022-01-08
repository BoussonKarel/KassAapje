<script lang="ts">
   import { Route } from 'svelte-navigator'

   import { authStore } from '../../utils/auth'
   import { Role } from '../../models/Role'
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
   }

   $: checkOrganizationPermission($params.orgId)
</script>

{#if isUser}
   <!-- Check permission in organization -->
   <Route path="/">
      <RegisterSelector organization_id={$params.orgId} />
   </Route>
   <Route path="/:regId/*">
      <RegisterRoutes orgId={$params.orgId} />
   </Route>
   {#if isOwner}
      <Route path="/info">
         <OrganizationInfo id={$params.orgId} {isOwner} />
      </Route>
      <Route path="/edit">
         <EditOrganization organization_id={$params.orgId} />
      </Route>
      <Route path="/new">
         <AddRegister organization_id={$params.orgId} />
      </Route>
   {/if}
{:else}
   <div class="c-page">
      <div class="o-container-center">
         <div class="c-bigcard c-bigcard--error">
            <div class="c-bigcard__text">
               You don't have permission to work in this organization.
            </div>
         </div>
      </div>
   </div>
{/if}
