<script lang="ts">
  import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { formHelper } from "../../../utils/formHelper";
  import { Link } from "svelte-navigator";

  const { validateEmail, DEFAULT_ERROR } = formHelper()

  let requested = false;

  let errors = {
    email: null,
    submit: null
  }

  let values: {email:string} = {
    email: '',
  }
  const handleSubmit = async () => {
    let valid = true
    errors.submit = null

    if (!validateEmail(values.email.trim())) {
      valid = false
      errors.email = DEFAULT_ERROR.email
    } else errors.email = null

    if (valid) {
      sendPasswordResetEmail(getAuth(), "bousson.karel@gmail.com").then(() => requested = true)
    }
    
  }

  const handleInput = e => {
    switch (e.target.name) {
      case 'email':
        if (!validateEmail(values.email.trim())) {
          errors.email = DEFAULT_ERROR.email
        } else errors.email = null
        break
      default:
        break
    }
  }
</script>

<div class="c-page c-page--color">
  <div class="c-auth">
    <div class="c-auth__title">
      <p>Wachtwoord vergeten</p>
    </div>

    {#if requested}
      <div class="c-auth__message">
        Er is een wachtwoord reset link naar je e-mail verstuurd.
      </div>
    {:else}
    <form class="c-auth__form" on:submit|preventDefault={handleSubmit}>
      <div class="c-form-field">
        <label class="c-form-label" for="email">Email:</label>
        <input
          class="c-input {errors.email ? 'has-error' : ''}"
          bind:value={values.email}
          on:blur={handleInput}
          type="text"
          name="email"
          id="email"
          placeholder="email@adres.com"
        />
        <span class="c-form-error">
          {errors.email ? errors.email : ''}
        </span>
      </div>
  
      <div class="c-form-field u-mb-0">
        <button class="c-button c-button--submit">Aanvragen</button>
        <span class="c-form-error">
          {errors.submit ? errors.submit : ''}
        </span>
      </div>
    </form>
    {/if}

    <div class="c-auth__switch">
      <Link class="link" to="/">Terug naar login</Link>
    </div>
  </div>  
</div>