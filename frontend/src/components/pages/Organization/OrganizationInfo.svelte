<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'
   import { onMount } from 'svelte'
   import { gqlHelper } from '../../../utils/graphQL'
   import { Link } from 'svelte-navigator'
   import Login from '../Auth/Login.svelte'
   import { authStore, Role } from '../../../utils/auth'

   export let id
   export let isOwner

   let fetchingState = '',
      organization = undefined

   const getOrganizationInfo = async () => {
      fetchingState = 'loading'

      organization = await gqlHelper.queries
         .organization(id)
         .catch(e => {
            fetchingState = 'error'
         })
         .finally(() => {
            fetchingState = ''
         })
      console.log(organization)
   }

   onMount(async () => {
      getOrganizationInfo()
   })
</script>

<div class="c-page">
   {#if fetchingState === 'loading'}
      Loading
   {:else if fetchingState === 'error'}
      Error getting organization
   {:else if organization}
      <NavigationBar title={organization.name} />

      <form class="c-form" name="OrganisationInfo">
         <div class="c-form-edit">
            <p class="c-form-edit-label">Naam:</p>
            <div class="c-form-edit-field">
               <p class="c-form-edit-field-output">{organization.name}</p>
            </div>

            <p class="c-form-edit-label">Website:</p>
            <div class="c-form-edit-field">
               <p class="c-form-edit-field-output">{organization.website}</p>
            </div>

            <p class="c-form-edit-label">Email:</p>
            <div class="c-form-edit-field">
               <p class="c-form-edit-field-output">{organization.email}</p>
            </div>

            <p class="c-form-edit-label">Straat:</p>
            <div class="c-form-edit-field">
               <p class="c-form-edit-field-output">
                  {#if organization.box}
                     {`${organization.street}
                     ${organization.street_number}${organization.box}
                     `}
                  {:else}
                     {`${organization.street}
                     ${organization.street_number}
                     `}
                  {/if}
               </p>
            </div>

            <p class="c-form-edit-label">Stad:</p>
            <div class="c-form-edit-field">
               <p class="c-form-edit-field-output">{organization.city}</p>
            </div>

            <p class="c-form-edit-label">Postcode:</p>
            <div class="c-form-edit-field">
               <p class="c-form-edit-field-output">{organization.zip}</p>
            </div>

            <p class="c-form-edit-label">Land:</p>
            <div class="c-form-edit-field">
               <p class="c-form-edit-field-output">{organization.country}</p>
            </div>
         </div>
         <div class="c-form-altinputs">
            {#if isOwner}
               <Link to="/{id}/edit">
                  <button class="c-button"> Bewerken </button>
               </Link>
            {/if}
         </div>
      </form>
   {/if}
</div>
