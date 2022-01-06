<script lang="ts">
   import type { ProductInput } from '../../../models/ProductInput'
   import { gqlHelper } from '../../../utils/graphQL'
   import { useNavigate } from 'svelte-navigator'
   const navigate = useNavigate()
   import { prevent_default } from 'svelte/internal'
   import { authHelper } from '../../../utils/auth'

   import NavigationBar from '../../NavigationBar.svelte'

   import { formHelper } from '../../../utils/formHelper'

   const { DEFAULT_ERROR, validateNotEmpty, validateEmail, validateNumber } = formHelper()

   // INPUTS
   let valid = false

   export let register_id

   let values: ProductInput = {
      register_id: register_id,
      name: '',
      price: null,
      stock_quantity: null,
   }

   let errors = {
      name: null,
      price: null,
      stock_quantity: null,
      submit: null,
   }

   async function handleSubmit() {
      for (let field in values) {
         if (field == 'price' || field == 'stock_quantity') {
            console.log('nummer getarget')
            if (!validateNumber(values[field])) {
               errors[field] = DEFAULT_ERROR.number
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
      }

      if (noErrors()) {
         valid = true
      } else {
         valid = false
         console.log('errors', errors)
         errors.submit = DEFAULT_ERROR.submit
      }

      if (valid) {
         let body: ProductInput = values

         await gqlHelper.mutations
            .addProduct(body)
            .catch(e => {
               errors.submit = `Er ging iets fout: ${e.message}`
               console.log(e)
            })
            .finally(() => {
               authHelper.refresh()
            })

         console.log(body)

         navigate(-1)
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

      if (field == 'price' || field == 'stock_quantity') {
         console.log('nummer getarget')
         if (!validateNumber(values[field])) {
            errors[field] = DEFAULT_ERROR.number
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

      if (!errors.name && !errors.price && !errors.stock_quantity) {
         console.log('alle errors weggewerkt')
         errors.submit = null
      }
   }
</script>

<div class="c-page">
   <div class="c-navigation">
      <NavigationBar title={'Product toevoegen'} />
   </div>
   <form class="c-form" name="AddOrganisation" on:submit|preventDefault={handleSubmit}>
      <div class="c-form-textinputs">
         <label class="c-form-label" for="name"> Naam: *</label>
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

         <label class="c-form-label" for="price"> Prijs: *</label>
         <input
            class="c-form-numberinput c-input {errors.price ? 'has-error' : ''}"
            type="number"
            name="price"
            placeholder="1"
            bind:value={values.price}
            on:blur={handleInput}
         />
         <span class="c-form-error">
            {errors.price ? errors.price : ''}
         </span>

         <label class="c-form-label" for="stock_quantity"> Hoeveelheid: *</label>
         <input
            class="c-form-numberinput c-input {errors.stock_quantity ? 'has-error' : ''}"
            type="number"
            name="stock_quantity"
            placeholder="1"
            bind:value={values.stock_quantity}
            on:blur={handleInput}
         />

         <span class="c-form-error">
            {errors.stock_quantity ? errors.stock_quantity : ''}
         </span>

         <p class="c-form__info">(*) Verplicht veld</p>

         <span class="c-form-error">
            {errors.submit ? errors.submit : ''}
         </span>

         <button class="c-button-save"> Opslaan </button>
      </div>
   </form>
</div>
