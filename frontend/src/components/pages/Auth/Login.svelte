<script lang="ts">
  import { Link } from 'svelte-navigator'
  import { auth } from '../../../utils/auth'
  import { formHelper } from '../../../utils/formHelper'

  const { validateEmail, DEFAULT_ERROR } = formHelper()

  DEFAULT_ERROR.password = "Wachtwoord te kort"
  const validatePassword = (value: string) => {
    if (value.length < 8) return false;
    return true;
  }

  let errors = {
    email: null,
    password: null,
    submit: null
  }

  let values: {email:string, password:string} = {
    email: '',
    password: '',
  }

  const handleSubmit = async () => {
    let valid = true
    errors.submit = null

    if (!validateEmail(values.email.trim())) {
      valid = false
      errors.email = DEFAULT_ERROR.email
    } else errors.email = null

    if (!validatePassword(values.password.trim())) {
      valid = false
      errors.password = DEFAULT_ERROR.password
    } else errors.password = null

    if (valid) {
      auth.signInWithEmailAndPassword(values.email, values.password).then((userCredential) => {
        console.log('Logged in')
      }).catch((error) => {
        errors.submit = `Er ging iets fout bij het inloggen: ${error.message}`;
      })
    }
  }

  const handleInput = e => {
    switch (e.target.name) {
      case 'email':
        if (!validateEmail(values.email.trim())) {
          errors.email = DEFAULT_ERROR.email
        } else errors.email = null
        break
      case 'password':
        if (!validatePassword(values.password.trim())) {
          errors.password = DEFAULT_ERROR.password
        } else errors.password = null
        break
      default:
        break
    }
  }
</script>

<div class="c-auth-holder">
  <div class="c-auth">
    <div class="c-auth__title">
      <p>Inloggen</p>
    </div>
  
    <form class="c-auth__form" on:submit|preventDefault={handleSubmit}>
      <div class="c-form-field">
        <label class="c-form-label" for="email">Email:</label>
        <input
          class="c-input {errors.email ? 'has-error' : ''}"
          bind:value={values.email}
          on:input={handleInput}
          type="text"
          name="email"
          id="email"
          placeholder="email@adres.com"
        />
        <span class="c-form-error">
          {errors.email ? errors.email : ''}
        </span>
      </div>
  
      <div class="c-form-field">
        <label class="c-form-label" for="password">Wachtwoord:</label>
        <input
          class="c-input {errors.password ? 'has-error' : ''}"
          bind:value={values.password}
          on:input={handleInput}
          type="password"
          name="password"
          id="password"
          placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
        />
        <span class="c-form-error">
          {errors.password ? errors.password : ''}
        </span>
      </div>
  
      <div class="c-form-field u-mb-0">
        <button class="c-form-submit">Inloggen</button>
        <span class="c-form-error">
          {errors.submit ? errors.submit : ''}
        </span>
      </div>
    </form>
    
    <div class="c-auth__switch">
      Nog geen account? <Link class="link" to="/register">Registreer</Link>
    </div>
  </div>  
</div>