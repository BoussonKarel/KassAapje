<script lang="ts">
  import './styles/screen.scss'
  import Sidebar from './components/sidebar.svelte'
  import OrganisationOverview from './components/pages/organisationOverview.svelte'
import AddOrganisation from './components/pages/AddOrganisation.svelte'
</script>

<main class="c-app">
  <aside class="c-sidebar">
    <Sidebar />
  </aside>
  <!-- <div class="c-organisation-overview">
    <OrganisationOverview />
  </div> -->
  <div class="c-organisation-add">
    <AddOrganisation/>
  </div>
  <div />
</main>
