<script lang=ts>

async function handleSubmit(event) {
    console.log('submitted')
    console.log(event)
  }

</script>

<div>
    <form class="c-form" name="AddOrganisation" on:submit|preventDefault={handleSubmit}>
        <div class="c-form-textinputs">            
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