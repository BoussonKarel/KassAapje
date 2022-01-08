<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'

   import ArrowLeftThick from 'svelte-material-icons/ArrowLeftThick.svelte'
   import Pencil from 'svelte-material-icons/Pencil.svelte'

   async function handleSubmit(event) {
      console.log('submitted')
      console.log(event)
   }
</script>

<div class="c-page">
   <NavigationBar title={'user edit'} />

   <form class="c-form" name="AddOrganisation" on:submit|preventDefault={handleSubmit}>
      <div class="c-form-edit">
         <p class="c-form-edit-label">Naam:</p>
         <div class="c-form-edit-field">
            <p class="c-form-edit-field-output">Michiel De Roovere</p>
         </div>

         <p class="c-form-edit-label">Email:</p>
         <div class="c-form-edit-field">
            <p class="c-form-edit-field-output">michielderoovere@gmail.com</p>
         </div>
      </div>
      <div class="c-form-altinputs">
         <div>Afbeelding placeholder</div>
         <button class="c-button-edit"> Bewerken </button>
      </div>
   </form>
</div>
