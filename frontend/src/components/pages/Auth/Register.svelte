<script lang="ts">
  import { authHelper } from '../../../utils/auth'
  import type { SignupEntity } from '../../../models/SignupEntity'
  import { formHelper } from '../../../utils/formHelper'
  import {Link} from 'yrv'

  const { validateEmail, validateUsername, validatePassword, DEFAULT_ERROR } = formHelper()

  let errors = {
    name: null,
    email: null,
    password: null,
    submit: null
  }

  let values: SignupEntity = {
    name: '',
    email: '',
    password: '',
  }

  let valid = false

  const handleSubmit = async () => {
    valid = true

    if (!validateEmail(values.email.trim())) {
      valid = false
      errors.email = DEFAULT_ERROR.email
    } else errors.email = null

    if (!validateUsername(values.name.trim())) {
      valid = false
      errors.name = DEFAULT_ERROR.username
    } else errors.name = null

    if (!validatePassword(values.password.trim())) {
      valid = false
      errors.password = DEFAULT_ERROR.password
    } else errors.password = null

    if (valid)
      await authHelper.signup(values).then((e) => {
        // NEXT STEP??
      }).catch((e) => {
        errors.submit = e.message;
      })
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
      case 'name':
        if (!validateUsername(values.name.trim())) {
          errors.name = DEFAULT_ERROR.username
        } else errors.name = null
        break
      default:
        break
    }
  }
</script>

<div class="c-auth-holder">
  <div class="c-auth">
    <div class="c-auth__title">
      <p>Registreren</p>
    </div>
  
    <form class="c-auth__form" on:submit|preventDefault={handleSubmit}>
      <div class="c-form-field">
        <label class="c-form-label" for="name">Naam:</label>
        <input
          class="c-input {errors.name ? 'has-error' : ''}"
          bind:value={values.name}
          on:input={handleInput}
          type="text"
          name="name"
          id="name"
          placeholder="Gebruikersnaam"
        />
        <span class="c-form-error">
          {errors.name ? errors.name : ''}
        </span>
      </div>
  
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
        <button class="c-form-submit">Registreren</button>
        <span class="c-form-error">
          {errors.submit ? errors.submit : ''}
        </span>
      </div>
    </form>
    
    <div class="c-auth__switch">
      Al een account? <Link class="link" href="/login">Log in</Link>
    </div>
  </div>  
</div>