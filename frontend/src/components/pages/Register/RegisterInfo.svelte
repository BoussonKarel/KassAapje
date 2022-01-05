<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'

   export let id;

   async function handleSubmit(event) {
      console.log('submitted')
      console.log(event)
   }
</script>

<div class="c-page">
   <div class="c-navigation">
      <NavigationBar title={id} />
   </div>
   <form class="c-form" name="AddOrganisation" on:submit|preventDefault={handleSubmit}>
      <div class="c-form-edit">
         <p class="c-form-edit-label">Naam:</p>
         <div class="c-form-edit-field">
            <p class="c-form-edit-field-output">Michiel De Roovere</p>
         </div>

         <p class="c-form-edit-label">Beschrijving:</p>
         <div class="c-form-edit-field">
            <p class="c-form-edit-field-output u-description">
               Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
               
            </p>
         </div>
      </div>
      <div class="c-form-altinputs">
         <div>Roles Overview placeholder</div>
         <button class="c-button-edit"> Bewerken </button>
      </div>
   </form>
</div>
