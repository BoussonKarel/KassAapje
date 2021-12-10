<script lang=ts>
import ArrowLeftThick from "svelte-material-icons/ArrowLeftThick.svelte";

async function handleSubmit(event) {
    console.log('submitted')
    console.log(event)
  }

  async function handleBackButton(event) {
    console.log('BackButton')
    console.log(event)
  }

</script>

<div>
    <div on:click={handleBackButton} class="c-button-back">
      <ArrowLeftThick />
    </div>
  
    <form class="c-form" name="AddOrganisation" on:submit|preventDefault={handleSubmit}>
        <div class="c-form-textinputs">
            <label class="c-form-label" for="FirstName"> Voornaam: </label>
            <input class="c-form-textinput" type="text" name="FirstName" placeholder="Voornaam" />
            
            <label class="c-form-label" for="Name"> Naam: </label>
            <input class="c-form-textinput" type="text" name="Name" placeholder="Naam" />
            
            <label class="c-form-label" for="Email"> Email: </label>
            <input class="c-form-textinput" type="text" name="Email" placeholder="Email" />


          </div>
      <div class="c-form-altinputs">
  
          <div>
              Afbeelding placeholder
          </div>
        <button class="c-button-save"> Opslaan </button>
      </div>
    </form>
  </div>