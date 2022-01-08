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
   import NoOrgPerms from '../pages/Auth/NoOrgPerms.svelte'
import CreateInvitation from '../pages/CreateInvitation.svelte';

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
      <RegisterSelector organization_id={$params.orgId} {isOwner} />
   </Route>
   <Route path="/:regId/*">
      <RegisterRoutes orgId={$params.orgId} />
   </Route>
   <Route path="/info">
      <OrganizationInfo organization_id={$params.orgId} {isOwner} />
   </Route>

   <Route path="/roles">
      {#if isOwner}
         <CreateInvitation organization_id={$params.orgId} />
      {:else}
         <NoOrgPerms />
      {/if}
   </Route>
   
   <Route path="/edit">
      {#if isOwner}
         <EditOrganization organization_id={$params.orgId} />
      {:else}
         <NoOrgPerms />
      {/if}
   </Route>
   <Route path="/new">
      {#if isOwner}
         <AddRegister organization_id={$params.orgId} />
      {:else}
         <NoOrgPerms />
      {/if}
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
