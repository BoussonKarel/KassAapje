<script lang="ts">
  import CardList from '../../cardlist.svelte'
  import ArrowLeftThick from 'svelte-material-icons/ArrowLeftThick.svelte'
  import Plus from 'svelte-material-icons/Plus.svelte'
  import AddOrganisation from './AddOrganisation.svelte'

  function addOrganisation(event) {
    console.log('clicked')
    console.log(event)
  }

  let orgsFound = true;
</script>

<div>
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
