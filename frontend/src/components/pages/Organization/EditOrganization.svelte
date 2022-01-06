<script lang="ts">
   import { useNavigate } from 'svelte-navigator'

   const navigate = useNavigate()
   import type { OrganizationUpdateInput } from '../../../models/OrganizationUpdateInput'

   import { gqlHelper } from '../../../utils/graphQL'

   import NavigationBar from '../../NavigationBar.svelte'
   import { identity, onMount } from 'svelte/internal'

   export let id

   let fetchingState = '',
      organization = undefined

   // INPUTS
   let name
   let street
   let street_number
   let box
   let zip
   let city
   let country
   let website
   let logo = 'empty'
   let email

   async function handleSubmit() {
      let body: OrganizationUpdateInput = {
         organization_id: id,
         name: name,
         street: street,
         street_number: street_number,
         box: box,
         zip: zip,
         city: city,
         country: country,
         website: website,
         logo: logo,
         color: '#AABBDD',
         email: email,
      }

      await gqlHelper.mutations
         .updateOrganization(body)
         .catch(e => {
            console.log(e)
         })
         .finally(() => {
            console.log('org updated')
            navigate(`/${id}/info`)
         })
      console.log(body)
   }

   const setOrganizationInfo = async () => {
      name = organization.name
      website = organization.website
      email = organization.email
      street = organization.street
      street_number = organization.street_number
      box = organization.box
      city = organization.city
      zip = organization.zip
      country = organization.country
   }

   const getOrganizationInfo = async () => {
      organization = await gqlHelper.queries
         .organization(id)
         .catch(e => {
            fetchingState = 'error'
         })
         .finally(() => {
            fetchingState = ''
         })
      console.log(organization)
      setOrganizationInfo()
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
      <div class="c-navigation">
         <NavigationBar title={'Organisatie bewerken'} />
      </div>

      <form class="c-form" name="AddOrganisation" on:submit|preventDefault={handleSubmit}>
         <div class="c-form-textinputs">
            <label class="c-form-label" for="Name"> Naam: * </label>
            <input class="c-form-textinput" type="text" name="Name" bind:value={name} />

            <label class="c-form-label" for="Website"> Website: * </label>
            <input class="c-form-textinput" type="text" name="Website" bind:value={website} />

            <label class="c-form-label" for="Email"> Email: * </label>
            <input class="c-form-textinput" type="text" name="Email" bind:value={email} />

            <div class="u-input-street">
               <div class="u-input-street-1">
                  <label class="c-form-label" for="Straat"> Straat: *</label>
                  <input class="c-form-textinput" type="text" name="Straat" bind:value={street} />
               </div>
               <div class="u-input-street-2">
                  <label class="c-form-label" for="Number"> Nr. *</label>
                  <input
                     class="c-form-textinput"
                     type="number"
                     name="Number"
                     bind:value={street_number}
                  />
               </div>
               <div class="u-input-street-3">
                  <label class="c-form-label" for="Box"> Bus: </label>
                  <input class="c-form-textinput" type="text" name="Box" bind:value={box} />
               </div>
            </div>

            <label class="c-form-label" for="City"> Stad: *</label>
            <input class="c-form-textinput" type="text" name="City" bind:value={city} />

            <label class="c-form-label" for="Postal"> Postcode: *</label>
            <input class="c-form-textinput" type="number" name="Postal" bind:value={zip} />

            <label class="c-form-label" for="Country"> Land: *</label>
            <input class="c-form-textinput" type="text" name="Country" bind:value={country} />
         </div>

         <p class="c-form__info">(*) Verplicht veld</p>

         <div class="c-form-altinputs">
            <button class="c-button-save u-button-disabled"> Opslaan </button>
         </div>
      </form>
   {/if}
</div>
