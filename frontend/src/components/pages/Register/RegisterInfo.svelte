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
               tempor... invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
               vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
               sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
               consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
               dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
               dolores et ea rebum.
            </p>
         </div>

         <p class="c-form-edit-label">Kleur:</p>
         <div class="c-form-edit-field">
            <div class="c-form-edit-field-output">Current color bar</div>
         </div>
      </div>
      <div class="c-form-altinputs">
         <div>Roles Overview placeholder</div>
         <button class="c-button-edit"> Bewerken </button>
      </div>
   </form>
</div>
