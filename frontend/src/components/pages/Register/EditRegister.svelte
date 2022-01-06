<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'
   import type { RegisterInput } from '../../../models/RegisterInput'
   import { gqlHelper } from '../../../utils/graphQL'

   import { useNavigate } from 'svelte-navigator'
   const navigate = useNavigate()

   import { onMount, prevent_default } from 'svelte/internal'
   import { authHelper } from '../../../utils/auth'
   import type { RegisterUpdateInput } from '../../../models/RegisterUpdateInput'

   export let id

   let name
   let desc
   let color = '#fff'

   let fetchingState = '',
      register = undefined

   async function handleSubmit(event) {
      let body: RegisterUpdateInput = {
         register_id: id,
         name: name,
         description: desc,
         color: color,
      }

      await gqlHelper.mutations
         .updateRegister(body)
         .catch(e => {
            console.log('failed')
            console.log(e)
         })
         .finally(() => {
            authHelper.refresh()
         })
      console.log(body)
      navigate(-1)
   }

   const setRegisterInfo = async () => {
      name = register.name
      desc = register.description
      color = register.description
   }

   const getRegisterInfo = async () => {
      fetchingState = 'loading'

      register = await gqlHelper.queries
         .register(id)
         .catch(e => {
            fetchingState = 'error'
         })
         .finally(() => {
            fetchingState = ''
         })
      console.log(register)
      setRegisterInfo()
   }

   onMount(async () => {
      getRegisterInfo()
   })
</script>

<div class="c-page">
   <div class="c-navigation">
      <NavigationBar title={'Kassa bewerken'} />
   </div>

   <form class="c-form" name="AddOrganisation" on:submit|preventDefault={handleSubmit}>
      <div class="c-form-textinputs">
         <label class="c-form-label" for="Name"> Naam: *</label>
         <input class="c-form-textinput" type="text" name="Name" bind:value={name} />
         <label class="c-form-label" for="Description"> Beschrijving: *</label>
         <textarea
            class="c-form-textinput u-description"
            name="Description"
            id="desc"
            cols="30"
            rows="10"
            bind:value={desc}
         />
      </div>

      <p class="c-form__info">(*) Verplicht veld</p>

      <div class="c-form-altinputs">
         <div>Roles Assignment Placeholder</div>

         <button class="c-button-save"> Opslaan </button>
      </div>
   </form>
</div>
