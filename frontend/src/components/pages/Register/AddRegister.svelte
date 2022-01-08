<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'
   import type { RegisterInput } from '../../../models/RegisterInput'
   import { gqlHelper } from '../../../utils/graphQL'

   import { useNavigate } from 'svelte-navigator'
   const navigate = useNavigate()

   import { formHelper } from '../../../utils/formHelper'

   const { DEFAULT_ERROR, validateNotEmpty } = formHelper()
   import { refresh } from '../../../utils/refresh';

   export let organization_id

   let valid = false

   let values: RegisterInput = {
      organization_id: organization_id,
      name: '',
      description: '',
      color: '#fff',
   }

   let errors = {
      name: null,
      description: null,
      color: null,
      submit: null,
   }

   async function handleSubmit(event) {
      for (let value in values) {
         const input = values[value]
         if (!validateNotEmpty(input)) {
            errors[value] = DEFAULT_ERROR.empty
         }
      }

      if (noErrors()) {
         valid = true
      } else {
         valid = false
         errors.submit = DEFAULT_ERROR.submit
      }

      if (valid) {
         let body: RegisterInput = values

         await gqlHelper.mutations
            .addRegister(body)
            .catch(e => {
               errors.submit = `Er ging iets fout: ${e.message}`
            })
            .finally(() => {
               refresh();
               navigate('../')
            })
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

      if (!validateNotEmpty(values[field].trim())) {
         errors[field] = DEFAULT_ERROR.empty
      } else {
         errors[field] = null
      }

      if (!errors.name && !errors.description && !errors.color) {
         errors.submit = null
      }
   }
</script>

<div class="c-page">
   <NavigationBar title={'Kassa toevoegen'} />

   <form class="c-form" name="AddOrganisation" on:submit|preventDefault={handleSubmit}>
      <div class="c-form-textinputs">
         <label class="c-form-label" for="Name"> Naam: *</label>

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

         <label class="c-form-label" for="Description"> Beschrijving: *</label>

         <textarea
            class="c-form-textinput c-input u-description {errors.description ? 'has-error' : ''}"
            name="description"
            id="desc"
            cols="30"
            rows="10"
            placeholder="Beschrijving"
            bind:value={values.description}
            on:blur={handleInput}
         />
         <span class="c-form-error">
            {errors.description ? errors.description : ''}
         </span>
      </div>
      <p class="c-form__info">(*) Verplicht veld</p>
      <span class="c-form-error">
         {errors.submit ? errors.submit : ''}
      </span>
      <div class="c-form-altinputs">
         <button class="c-button "> Opslaan </button>
      </div>
   </form>
</div>
