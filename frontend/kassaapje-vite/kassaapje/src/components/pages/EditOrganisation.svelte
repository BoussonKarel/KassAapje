<script lang="ts">
  import ChromaPicker from 'svelte-chroma-picker'
  import { prevent_default } from 'svelte/internal'
  import ArrowLeftThick from 'svelte-material-icons/ArrowLeftThick.svelte'
  import Pencil from 'svelte-material-icons/Pencil.svelte'

  let color = '#fff'

  $: console.log(`change detected: ${color}`)

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
    <div class="c-form-edit">
      
      <p class="c-form-edit-label">Naam:</p>
      <div class="c-form-edit-field">
        <p class="c-form-edit-field-output">Scouts Beselare</p>
        <div class="c-form-edit-field-icon">
          <Pencil />
        </div>
      </div>

      <p class="c-form-edit-label">Website:</p>
      <div class="c-form-edit-field">
        <p class="c-form-edit-field-output">www.scoutsbeselare.be</p>
        <div class="c-form-edit-field-icon">
          <Pencil />
        </div>
      </div>

      <p class="c-form-edit-label">Email:</p>
      <div class="c-form-edit-field">
        <p class="c-form-edit-field-output">scoutsbeselare@gmail.com</p>
        <div class="c-form-edit-field-icon">
          <Pencil />
        </div>
      </div>

      <p class="c-form-edit-label">Straat:</p>
      <div class="c-form-edit-field">
        <p class="c-form-edit-field-output">Oude Kortrijkstraat 46</p>
        <div class="c-form-edit-field-icon">
          <Pencil />
        </div>
      </div>

      <p class="c-form-edit-label">Stad:</p>
      <div class="c-form-edit-field">
        <p class="c-form-edit-field-output">Beselare</p>
        <div class="c-form-edit-field-icon">
          <Pencil />
        </div>
      </div>

      <p class="c-form-edit-label">Postcode:</p>
      <div class="c-form-edit-field">
        <p class="c-form-edit-field-output">8980</p>
        <div class="c-form-edit-field-icon">
          <Pencil />
        </div>
      </div>
      

      <p class="c-form-edit-label">Land:</p>
      <div class="c-form-edit-field">
        <p class="c-form-edit-field-output">Belgïe</p>
        <div class="c-form-edit-field-icon">
          <Pencil />
        </div>
      </div>
    </div>
    <div class="c-form-altinputs">
      <div>image processing tool placeholder</div>

      <div>
        <label class="c-form-label" for="Color"> Kleur:</label>

        <ChromaPicker bind:color />
        <div>Current color bar</div>
      </div>

      <button class="c-button-save"> Opslaan </button>
    </div>
  </form>
</div>
