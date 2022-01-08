<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'
   import type { RegisterInput } from '../../../models/RegisterInput'
   import { gqlHelper } from '../../../utils/graphQL'

   import { useNavigate } from 'svelte-navigator'
   const navigate = useNavigate()

   import { onMount, prevent_default } from 'svelte/internal'
   import { authHelper } from '../../../utils/auth'
   import type { RegisterUpdateInput } from '../../../models/RegisterUpdateInput'
   import SectionLoading from '../../Loading/SectionLoading.svelte'

   import { formHelper } from '../../../utils/formHelper'

   const { DEFAULT_ERROR, validateNotEmpty } = formHelper()

   export let register_id

   let valid = false

   let values: RegisterUpdateInput = {
      register_id: register_id,
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

   let fetchingState = '',
      register = undefined

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
         let body: RegisterUpdateInput = values

         await gqlHelper.mutations
            .updateRegister(body)
            .catch(e => {
               errors.submit = `Er ging iets fout: ${e.message}`
               console.log(e)
            })
            .finally(() => {
               authHelper.refresh()
            })

         console.log('body', body)

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
      console.log('field', field)

      if (!validateNotEmpty(values[field])) {
         errors[field] = DEFAULT_ERROR.empty
      } else {
         errors[field] = null
      }

      console.log('errors', errors)

      if (!errors.name && !errors.description && !errors.color) {
         console.log('verwijder submit error')
         errors.submit = null
      }
   }

   const setRegisterInfo = async () => {
      values.register_id = register_id
      values.name = register.name
      values.description = register.description
      values.color = 'fff'
   }

   const getRegisterInfo = async () => {
      fetchingState = 'loading'

      register = await gqlHelper.queries
         .register(register_id)
         .catch(e => {
            fetchingState = 'error'
         })
         .finally(() => {
            fetchingState = ''
         })
      console.log('register', register)
      setRegisterInfo()
   }

   onMount(async () => {
      getRegisterInfo()
   })
</script>

<div class="c-page">
   {#if fetchingState === 'loading'}
      <SectionLoading />
   {:else if fetchingState === 'error'}
      Error getting register
   {:else if register}
      <NavigationBar title={'Kassa bewerken'} />

      <form class="c-form" name="EditRegister" on:submit|preventDefault={handleSubmit}>
         <div class="c-form-textinputs">
            <label class="c-form-label" for="Name"> Naam: *</label>

            <input
               class="c-form-textinput c-input {errors.name ? 'has-error' : ''}"
               type="text"
               name="name"
               bind:value={values.name}
               on:blur={handleInput}
            />
            <span class="c-form-error">
               {errors.name ? errors.name : ''}
            </span>
            <label class="c-form-label" for="Description"> Beschrijving: *</label>

            <textarea
               class="c-form-textinput c-input u-description {errors.description
                  ? 'has-error'
                  : ''}"
               name="description"
               id="desc"
               cols="30"
               rows="10"
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
            <button class="c-button"> Opslaan </button>
         </div>
      </form>
   {/if}
</div>
