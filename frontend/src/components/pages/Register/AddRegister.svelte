<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'
   import type { RegisterInput } from '../../../models/RegisterInput'
   import { gqlHelper } from '../../../utils/graphQL'

   import { useNavigate } from 'svelte-navigator'
   const navigate = useNavigate()

   import { prevent_default } from 'svelte/internal'

   export let organization_id

   let name;
   let desc;
   let color = '#fff'

   async function handleSubmit(event) {
      let body : RegisterInput = {
         organization_id: organization_id,
         name: name,
         description: desc,
         color: color
      }

      await gqlHelper.mutations
         .addRegister(body)
         .catch(e => {
            console.log('failed')
            console.log(e)
         })
         .finally(() => {
            console.log('register added')
            navigate('/')
         })
      console.log('submitted')
      console.log(body)
      navigate(-1)
   }

</script>

<div class="c-page">
   <div class="c-navigation">
      <NavigationBar title={"Kassa toevoegen"} settings={false} />
   </div>

   <form class="c-form" name="AddOrganisation" on:submit|preventDefault={handleSubmit}>
      <div class="c-form-textinputs">
         <label class="c-form-label" for="Name"> Naam: </label>
         <input class="c-form-textinput" type="text" name="Name" placeholder="Naam" bind:value={name} />
         <label class="c-form-label" for="Description"> Beschrijving: </label>
         <textarea class="c-form-textinput u-description" name="Description" id="desc" cols="30" rows="10" placeholder="Beschrijving" bind:value={desc}></textarea>

      </div>
      <div class="c-form-altinputs">
         <div>Roles Assignment Placeholder</div>

         <button class="c-button-save"> Opslaan </button>
      </div>
   </form>
</div>
