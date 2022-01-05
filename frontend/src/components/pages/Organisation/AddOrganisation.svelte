<script lang="ts">
   import { useNavigate } from 'svelte-navigator'

   const navigate = useNavigate()
   import type { OrganizationInput } from 'src/models/OrganizationInput'

   import { gqlHelper } from '../../../utils/graphQL'

   import NavigationBar from '../../NavigationBar.svelte'

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
      let body: OrganizationInput = {
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
         .addOrganization(body)
         .catch(e => {
            console.log(e)
         })
         .finally(() => {
            console.log('org added')
            navigate('/')
         })
      console.log(body)
   }
</script>

<div class="c-page">
   <div class="c-navigation">
      <NavigationBar title={'Organisatie toevoegen'} />
   </div>

   <form class="c-form" name="AddOrganisation" on:submit|preventDefault={handleSubmit}>
      <div class="c-form-textinputs">
         <label class="c-form-label" for="Name"> Naam: </label>
         <input
            class="c-form-textinput"
            type="text"
            name="Name"
            placeholder="Naam"
            bind:value={name}
         />

         <label class="c-form-label" for="Website"> Website: </label>
         <input
            class="c-form-textinput"
            type="text"
            name="Website"
            placeholder="Website"
            bind:value={website}
         />

         <label class="c-form-label" for="Email"> Email: </label>
         <input
            class="c-form-textinput"
            type="text"
            name="Email"
            placeholder="Email"
            bind:value={email}
         />

         <div class="u-input-street">
            <div class="u-input-street-1">
               <label class="c-form-label" for="Straat"> Straat: </label>
               <input
                  class="c-form-textinput"
                  type="text"
                  name="Straat"
                  placeholder="Straat"
                  bind:value={street}
               />
            </div>
            <div class="u-input-street-2">
               <label class="c-form-label" for="Number"> Nr. </label>
               <input
                  class="c-form-textinput"
                  type="number"
                  name="Number"
                  placeholder="Nr."
                  bind:value={street_number}
               />
            </div>
            <div class="u-input-street-3">
               <label class="c-form-label" for="Box"> Bus: </label>
               <input
                  class="c-form-textinput"
                  type="text"
                  name="Box"
                  placeholder="Bus"
                  bind:value={box}
               />
            </div>
         </div>

         <label class="c-form-label" for="City"> Stad: </label>
         <input
            class="c-form-textinput"
            type="text"
            name="City"
            placeholder="Stad"
            bind:value={city}
         />

         <label class="c-form-label" for="Postal"> Postcode: </label>
         <input
            class="c-form-textinput"
            type="number"
            name="Postal"
            placeholder="Postcode"
            bind:value={zip}
         />

         <label class="c-form-label" for="Country"> Land: </label>
         <input
            class="c-form-textinput"
            type="text"
            name="Country"
            placeholder="Land"
            bind:value={country}
         />
      </div>
      <div class="c-form-altinputs">
         <button class="c-button-save u-button-disabled"> Opslaan </button>
      </div>
   </form>
</div>
