<script lang="ts">
import { userAPI } from '../../../utils/userAPI'

  let name
  let email
  let password

  const submitRegister = () => {
    const submission = {
      name,
      password,
      email
      
    }
    console.log(submission);
    userAPI.post.signup(submission)

//     fetch('http://localhost:8888/signup', {method: 'POST', body: JSON.stringify(submission),headers: {"Content-type": "application/json; charset=UTF-8"}}).then(response => response.json())
// .then(json => console.log(json))
// .catch(err => console.log(err));

  }
</script>

<form action="register">
  <label for="name">Naam:</label>
  <input bind:value={name} type="text" name="name" id="name" />
  <label for="email">Email:</label>
  <input bind:value={email} type="text" name="email" id="email" />
  <label for="password">Wachtwoord:</label>
  <input bind:value={password} type="password" name="password" id="password" />

  <!-- <label for="confirm">Wachtwoord bevestigen</label>
    <input type="password" name="confirm" id="confirm"> -->

  <button on:click|preventDefault={submitRegister}> registreren </button>
</form>
