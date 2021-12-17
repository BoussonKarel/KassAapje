<script lang="ts">
  import CardList from '../../Cards/CardList.svelte'
  import Plus from 'svelte-material-icons/Plus.svelte'

  function addOrganisation(event) {
    console.log('clicked')
    console.log(event)
  }

  let orgsFound = true;

  // onMount(async () => {
  //   const res = query();
  // });
</script>

<div class="c-page">
  {#if orgsFound}
    <CardList />
  {:else}
    <div class="o-container-center">
      <h2>Geen verenigingen gevonden...</h2>

      <div on:click={addOrganisation} class="c-button-addcard">
        <div class="c-addcard-icon">
          <Plus />
        </div>
      </div>
    </div>
  {/if}
</div>
