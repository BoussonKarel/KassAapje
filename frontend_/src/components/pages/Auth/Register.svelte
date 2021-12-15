<script lang="ts">
  import { userAPI } from '../../../utils/userAPI'

  let name
  let email
  let password

  const submitRegister = () => {
      const submission = {
        password,
        email,
      }
      console.log(submission)
      userAPI.post.signup(submission)
    }
</script>

<div class="c-register-container">
  <div class="c-register">
    <div class="c-register-title">
      <p >Aanmelden</p>
    </div>
    
    <form action="register" class="c-register-form">
      <label class="c-form-label" for="name">Naam:</label>
      <input
        class="c-form-textinput"
        bind:value={name}
        type="text"
        name="name"
        id="name"
        placeholder="Kass Aapje"
      />
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
      <button class="c-button-save" on:click|preventDefault={submitRegister}> Registreren </button>
    </form>
  </div>
</div>


