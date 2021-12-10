<script lang="ts">
  import ArrowLeftThick from 'svelte-material-icons/ArrowLeftThick.svelte'
  import Settings from 'svelte-material-icons/Settings.svelte'
  import CardList from '../../Cards/cardlist.svelte'


</script>

<div>
  <div class="c-navigation">
    <div class="c-button-back c-navigation-back">
      <ArrowLeftThick />
    </div>

    <h1 class="c-navigation-title">
      Scouts Beselare
    </h1>
    <div class="c-navigation-settings">
      <Settings />
    </div>
  </div>
   
  <CardList />
</div>
