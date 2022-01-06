<script lang="ts">
   import { useNavigate } from 'svelte-navigator'

   const navigate = useNavigate()
   import type { OrganizationInput } from 'src/models/OrganizationInput'

   import { gqlHelper } from '../../../utils/graphQL'

   import NavigationBar from '../../NavigationBar.svelte'
   import { authHelper } from '../../../utils/auth'

   import { formHelper } from '../../../utils/formHelper'

   const { DEFAULT_ERROR, validateNotEmpty, validateEmail, validateNumber } = formHelper()

   // INPUTS
   let valid = false

   let values: OrganizationInput = {
      name: '',
      street: '',
      street_number: null,
      box: '',
      zip: null,
      city: '',
      country: '',
      website: '',
      logo: 'empty',
      color: '#fff',
      email: '',
   }

   let errors = {
      name: null,
      street: null,
      street_number: null,
      zip: null,
      city: null,
      country: null,
      website: null,
      logo: null,
      color: null,
      email: null,
      submit: null,
   }

   async function handleSubmit() {
      for (let field in values) {
         if (field == 'zip' || field == 'street_number') {
            console.log('nummer getarget')
            if (!validateNumber(values[field])) {
               errors[field] = DEFAULT_ERROR.number
            } else {
               errors[field] = null
            }
         } else if (field == 'email') {
            if (!validateEmail(values[field])) {
               errors[field] = DEFAULT_ERROR.email
            } else {
               errors[field] = null
            }
         } else if(field == 'box'){
            errors[field] = null
         }else{
            if (!validateNotEmpty(values[field])) {
               errors[field] = DEFAULT_ERROR.empty
            } else {
               errors[field] = null
            }
         }
      }

      if (noErrors()) {
         valid = true
      } else {
         valid = false
         console.log("hier loopt er iets mis")
         console.log("errors", errors)
         errors.submit = `Niet alle velden zijn ingevuld, vul aan en probeer opnieuw.`
      }

      if (valid) {
         let body: OrganizationInput = values

         await gqlHelper.mutations
            .addOrganization(body)
            .catch(e => {
               console.log(e)
            })
            .finally(() => {
               authHelper.refresh()
            })
         console.log(body)
         navigate('/')
      }
   }

   const noErrors = () => {
      for (var error in errors) {
         if (errors[error] !== null && errors[error] !== '') return false
      }
      return true
   }

   const handleInput = e => {
      var field: string = e.target.name

      if (field == 'zip' || field == 'street_number') {
         console.log('nummer getarget')
         if (!validateNumber(values[field])) {
            errors[field] = DEFAULT_ERROR.number
         } else {
            errors[field] = null
         }
      } else if (field == 'email') {
         if (!validateEmail(values[field])) {
            errors[field] = DEFAULT_ERROR.email
         } else {
            errors[field] = null
         }
      } else {
         if (!validateNotEmpty(values[field])) {
            errors[field] = DEFAULT_ERROR.empty
         } else {
            errors[field] = null
         }
      }

      if (
         !errors.name &&
         !errors.street &&
         !errors.street_number &&
         !errors.zip &&
         !errors.city &&
         !errors.country &&
         !errors.website &&
         !errors.logo &&
         !errors.color &&
         !errors.email
      ) {
         console.log('alle errors weggewerkt')
         errors.submit = null
      }
   }
</script>

<div class="c-page">
   <div class="c-navigation">
      <NavigationBar title={'Organisatie toevoegen'} />
   </div>

   <form class="c-form" name="AddOrganisation" on:submit|preventDefault={handleSubmit}>
      <div class="c-form-textinputs">
         <label class="c-form-label" for="name"> Naam: * </label>

         <input
            class="c-form-textinput c-input {errors.name ? 'has-error' : ''}"
            type="text"
            name="name"
            placeholder="Naam"
            bind:value={values.name}
            on:blur={handleInput}
         />
         <span class="c-form-error">
            {errors.name ? errors.name : ''}
         </span>

         <label class="c-form-label" for="website"> Website: * </label>

         <input
            class="c-form-textinput c-input {errors.website ? 'has-error' : ''}"
            type="text"
            name="website"
            placeholder="Website"
            bind:value={values.website}
            on:blur={handleInput}
         />
         <span class="c-form-error">
            {errors.website ? errors.website : ''}
         </span>

         <label class="c-form-label" for="email"> Email: * </label>

         <input
            class="c-form-textinput c-input {errors.email ? 'has-error' : ''}"
            type="text"
            name="email"
            placeholder="Email"
            bind:value={values.email}
            on:blur={handleInput}
         />
         <span class="c-form-error">
            {errors.email ? errors.email : ''}
         </span>

         <div class="u-input-street">
            <div class="u-input-street-1">
               <label class="c-form-label" for="street"> Straat: * </label>

               <input
                  class="c-form-textinput c-input {errors.street ? 'has-error' : ''}"
                  type="text"
                  name="street"
                  placeholder="Straat"
                  bind:value={values.street}
                  on:blur={handleInput}
               />
               <span class="c-form-error">
                  {errors.street ? errors.street : ''}
               </span>
            </div>
            <div class="u-input-street-2">
               <label class="c-form-label" for="street_number"> Nr. * </label>

               <input
                  class="c-form-textinput c-input {errors.street_number ? 'has-error' : ''}"
                  type="number"
                  name="street_number"
                  placeholder="Nr."
                  bind:value={values.street_number}
                  on:blur={handleInput}
               />
               <span class="c-form-error">
                  {errors.street_number ? errors.street_number : ''}
               </span>
            </div>
            <div class="u-input-street-3">
               <label class="c-form-label" for="box"> Bus: </label>
               <input
                  class="c-form-textinput c-input"
                  type="text"
                  name="box"
                  placeholder="Bus"
                  bind:value={values.box}
               />
            </div>
         </div>

         <label class="c-form-label" for="city"> Stad: * </label>

         <input
            class="c-form-textinput c-input {errors.city ? 'has-error' : ''}"
            type="text"
            name="city"
            placeholder="Stad"
            bind:value={values.city}
            on:blur={handleInput}
         />
         <span class="c-form-error">
            {errors.city ? errors.city : ''}
         </span>

         <label class="c-form-label" for="zip"> Postcode: * </label>

         <input
            class="c-form-textinput c-input {errors.zip ? 'has-error' : ''}"
            type="number"
            name="zip"
            placeholder="Postcode"
            bind:value={values.zip}
            on:blur={handleInput}
         />
         <span class="c-form-error">
            {errors.zip ? errors.zip : ''}
         </span>

         <label class="c-form-label" for="country"> Land: * </label>

         <input
            class="c-form-textinput c-input {errors.country ? 'has-error' : ''}"
            type="text"
            name="country"
            placeholder="Land"
            bind:value={values.country}
            on:blur={handleInput}
         />
         <span class="c-form-error">
            {errors.country ? errors.country : ''}
         </span>
      </div>

      <p class="c-form__info">(*) Verplicht veld</p>

      <div class="c-form-altinputs">
         <span class="c-form-error">
            {errors.submit ? errors.submit : ''}
         </span>
         <button class="c-button-save"> Opslaan </button>
      </div>
   </form>
</div>
