<script lang="ts">
  import NavigationBar from '../../NavigationBar.svelte'
  import ChromaPicker from 'svelte-chroma-picker'
  import { onMount, prevent_default } from 'svelte/internal'

  let color = '#fff'

  $: {
    console.log(`change detected: ${color}`)
  }

  async function handleSubmit(event) {
    console.log('submitted')
    console.log(event)
  }

  function changeColor(event) {
    console.log('fix color change')
    console.log(event)
  }
</script>

<div class="c-page">
  <div class="c-navigation">
    <NavigationBar title={"Nieuwe organisatie"} />
  </div>

  <form class="c-form" name="AddOrganisation" on:submit|preventDefault={handleSubmit}>
    <div class="c-form-textinputs">
      <label class="c-form-label" for="Name"> Naam: </label>
      <input class="c-form-textinput" type="text" name="Name" placeholder="Naam" />
      <label class="c-form-label" for="Website"> Website: </label>
      <input class="c-form-textinput" type="text" name="Website" placeholder="Website" />
      <label class="c-form-label" for="Email"> Email: </label>
      <input class="c-form-textinput" type="text" name="Email" placeholder="Email" />
      <div class="u-input-street">
        <div class="u-input-street-1">
          <label class="c-form-label" for="Straat"> Straat: </label>
          <input class="c-form-textinput" type="text" name="Straat" placeholder="Straat" />
        </div>
        <div class="u-input-street-2">
          <label class="c-form-label" for="Number"> Nr. </label>
          <input class="c-form-textinput" type="text" name="Number" placeholder="Nr." />
        </div>
      </div>

      <label class="c-form-label" for="City"> Stad: </label>
      <input class="c-form-textinput" type="text" name="City" placeholder="Stad" />
      <label class="c-form-label" for="Postal"> Postcode: </label>
      <input class="c-form-textinput" type="text" name="Postal" placeholder="Postcode" />
      <label class="c-form-label" for="Country"> Land: </label>
      <input class="c-form-textinput" type="text" name="Country" placeholder="Land" />
    </div>
    <div class="c-form-altinputs">
      <div>image processing tool placeholder</div>

      <div>
        <label class="c-form-label" for="Color"> Kleur:</label>

        <div class="c-colorpicker">
          <ChromaPicker bind:color />
          <div class="c-colorpicker-bar" />
        </div>
      </div>

      <button class="c-button-save"> Opslaan </button>
    </div>
  </form>
</div>
