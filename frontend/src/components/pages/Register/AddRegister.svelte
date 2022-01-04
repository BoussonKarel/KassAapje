<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'

   import { prevent_default } from 'svelte/internal'

   let color = '#fff'

   $: console.log(`change detected: ${color}`)

   async function handleSubmit(event) {
      console.log('submitted')
      console.log(event)
   }
</script>

<div class="c-page">
   <div class="c-navigation">
      <NavigationBar title={"Kassa toevoegen"} settings={false} />
   </div>

   <form class="c-form" name="AddOrganisation" on:submit|preventDefault={handleSubmit}>
      <div class="c-form-textinputs">
         <label class="c-form-label" for="Name"> Naam: </label>
         <input class="c-form-textinput" type="text" name="Name" placeholder="Naam" />
         <label class="c-form-label" for="Description"> Beschrijving: </label>
         <input
            class="c-form-textinput"
            type="text"
            name="Description"
            placeholder="Beschrijving"
         />

         <div>
            <label class="c-form-label" for="Color"> Kleur:</label>
            <div>Color picker placeholder</div>
         </div>
      </div>
      <div class="c-form-altinputs">
         <div>Roles Assignment Placeholder</div>

         <button class="c-button-save"> Opslaan </button>
      </div>
   </form>
</div>
