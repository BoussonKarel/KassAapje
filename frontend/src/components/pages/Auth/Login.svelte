<script lang="ts">
  import { userAPI } from '../../../utils/userAPI'

  let email
  let password

  const submitLogin = () => {
    const submission = {
      name,
      password,
      email,
    }
    console.log(submission)
  }
</script>

<div class="c-register-container">
  <div class="c-register">
    <div class="c-register-title">
        <p >Inloggen</p>
      </div>
    <form action="register" class="c-register-form">
      <label class="c-form-label" for="email">Email:</label>
      <input
        class="c-form-textinput"
        bind:value={email}
        type="text"
        name="email"
        id="email"
        placeholder="email@adres.com"
      />
      <label class="c-form-label" for="password">Wachtwoord:</label>
      <input
        class="c-form-textinput"
        bind:value={password}
        type="password"
        name="password"
        id="password"
        placeholder="Wachtwoord"
      />
      <button class="c-button-save" on:click|preventDefault={submitLogin}> Inloggen </button>

      <a href="url">Wachtwoord vergeten?</a>
    </form>
  </div>
</div>
