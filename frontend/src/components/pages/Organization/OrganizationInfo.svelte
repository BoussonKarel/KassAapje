<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'
   import { onMount } from 'svelte'
   import { gqlHelper } from '../../../utils/graphQL'
   import { Link } from 'svelte-navigator'
   import SectionLoading from '../../Loading/SectionLoading.svelte'
   import type { Organization } from '../../../models/Organization';

   export let organization_id: string
   export let isOwner: boolean

   let fetchingState = '',
      organization : Organization = undefined

   const getOrganizationInfo = async () => {
      fetchingState = 'loading'

      organization = await gqlHelper.queries
         .organization(organization_id)
         .catch(e => {
            fetchingState = 'error'
         })
         .finally(() => {
            fetchingState = ''
         })
   }

   onMount(async () => {
      getOrganizationInfo()
   })
</script>

<div class="c-page">
   {#if fetchingState === 'loading'}
      <SectionLoading/>
   {:else if fetchingState === 'error'}
      Error getting organization
   {:else if organization}
      <NavigationBar title={organization.name} />

      <div class="c-dashboard">
         <!-- <div class="c-dashboard__actions">
            <Link to="../" class="c-button c-button--action">
               <Store />
               Kassa's
            </Link>
         </div> -->
         <div class="c-dashboard__info c-info">
            <div class="c-info__section">
               <div class="c-info__label">Naam</div>
               <div class="c-info__value">{organization.name}</div>
               <div class="c-info__label">E-mailadres</div>
               <div class="c-info__value">{organization.email}</div>
               <div class="c-info__label">Website</div>
               <div class="c-info__value">{organization.website}</div>

               <div class="c-info__label">Adres</div>
               <div class="c-info__value">
                  {organization.street} {organization.street_number} {organization.box ? organization.box : ''}, {organization.zip} {organization.city}, {organization.country}
               </div>
            </div>
            {#if isOwner}
            <div class="c-info__edit">
               <Link class="c-button" to="../edit">
                  Bewerken
               </Link>
            </div>
            {/if}
         </div>
      </div>
   {/if}
</div>
