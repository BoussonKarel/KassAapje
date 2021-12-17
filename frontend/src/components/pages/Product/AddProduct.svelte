<script lang="ts">
   import NavigationBar from '../../NavigationBar.svelte'

   async function handleSubmit(event) {
    console.log('submitted')
    console.log(event)
  }
</script>

<div class="c-page">
   <div class="c-navigation">
      <NavigationBar title={"Order toevoegen"} />
   </div>
   <form class="c-form" name="AddOrganisation" on:submit|preventDefault={handleSubmit}>
    <div class="c-form-textinputs">
      <label class="c-form-label" for="Name"> Naam: </label>
      <input class="c-form-textinput" type="text" name="Name" placeholder="Naam" />
      <label class="c-form-label" for="Website"> Hoeveelheid: </label>
      <input class="c-form-numberinput" type="number" name="Website" placeholder=1 />

      <button class="c-button-save"> Opslaan </button>
    </div>
    
     

     

     
    
  </form>
</div>
