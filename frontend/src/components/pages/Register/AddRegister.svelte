<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'
   import type { RegisterInput } from '../../../models/RegisterInput'
   import { gqlHelper } from '../../../utils/graphQL'

   import { useNavigate } from 'svelte-navigator'
   const navigate = useNavigate()

   import { formHelper } from '../../../utils/formHelper'

   const { DEFAULT_ERROR } = formHelper()

   import { prevent_default } from 'svelte/internal'
   import { authHelper } from '../../../utils/auth'

   export let organization_id

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
      let valid = true
      errors.submit = null

      let body: RegisterInput = values

      // await gqlHelper.mutations
      //    .addRegister(body)
      //    .catch(e => {
      //       console.log('failed')
      //       console.log(e)
      //    })
      //    .finally(() => {
      //       authHelper.refresh();
      //    })

      console.log(body)

      // navigate(-1)
   }
</script>

<div class="c-page">
   <div class="c-navigation">
      <NavigationBar title={'Kassa toevoegen'} />
   </div>

   <form class="c-form" name="AddOrganisation" on:submit|preventDefault={handleSubmit}>
      <div class="c-form-textinputs">
         <label class="c-form-label" for="Name"> Naam: *</label>
         <input
            class="c-form-textinput c-input {errors.name ? 'has-error' : ''}"
            type="text"
            name="Name"
            placeholder="Naam"
            bind:value={values.name}
         />
         <label class="c-form-label" for="Description"> Beschrijving: *</label>
         <textarea
            class="c-form-textinput c-input u-description {errors.description ? 'has-error' : ''}"
            name="Description"
            id="desc"
            cols="30"
            rows="10"
            placeholder="Beschrijving"
            bind:value={values.description}
         />
      </div>
      <p class="c-form__info">(*) Verplicht veld</p>
      <div class="c-form-altinputs">
         <button class="c-button-save"> Opslaan </button>
         <span class="c-form-error">
            {errors.submit
               ? errors.submit
               : ''}
         </span>
      </div>
   </form>
</div>
