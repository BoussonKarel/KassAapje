<script lang="ts">
  import NavigationBar from '../../NavigationBar.svelte'

  // INPUTS
  let name;
  let street;
  let street_number;
  let zip;
  let city;
  let country;
  let website;
  let logo = '';
  let email;


  async function handleSubmit(event) {
    console.log('submitted')
    let body = {
        name: name,
        street: street,
        street_number: street_number,
        zip: zip,
        city: city,
        country: country,
        website: website,
        logo: logo,
        color: "#AABBDD",
        email: email
    }
    console.log(body)
    console.log(event)
  }
</script>

<div class="c-page">
  <div class="c-navigation">
    <NavigationBar title={"Organisatie toevoegen"} settings={false} />
  </div>

  <form class="c-form" name="AddOrganisation" on:submit|preventDefault={handleSubmit}>
    <div class="c-form-textinputs">
      <label class="c-form-label" for="Name"> Naam: </label>
      <input class="c-form-textinput" type="text" name="Name" placeholder="Naam" bind:value={name} />

      <label class="c-form-label" for="Website"> Website: </label>
      <input class="c-form-textinput" type="text" name="Website" placeholder="Website" bind:value={website} />

      <label class="c-form-label" for="Email"> Email: </label>
      <input class="c-form-textinput" type="text" name="Email" placeholder="Email" bind:value={email}/>

      <div class="u-input-street">
        <div class="u-input-street-1">
          <label class="c-form-label" for="Straat"> Straat: </label>
          <input class="c-form-textinput" type="text" name="Straat" placeholder="Straat" bind:value={street} />

        </div>
        <div class="u-input-street-2">
          <label class="c-form-label" for="Number"> Nr. </label>
          <input class="c-form-textinput" type="text" name="Number" placeholder="Nr." bind:value={street_number} />

        </div>
      </div>

      <label class="c-form-label" for="City"> Stad: </label>
      <input class="c-form-textinput" type="text" name="City" placeholder="Stad" bind:value={city} />

      <label class="c-form-label" for="Postal"> Postcode: </label>
      <input class="c-form-textinput" type="text" name="Postal" placeholder="Postcode" bind:value={zip} />

      <label class="c-form-label" for="Country"> Land: </label>
      <input class="c-form-textinput" type="text" name="Country" placeholder="Land" bind:value={country} />

    </div>
    <div class="c-form-altinputs">
      <button class="c-button-save u-button-disabled"> Opslaan </button>
    </div>
  </form>
</div>
