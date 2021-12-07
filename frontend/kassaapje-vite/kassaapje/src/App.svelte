<script lang="ts">
  import './styles/screen.scss'
  import Sidebar from './components/sidebar.svelte'
  import OrganisationOverview from './components/pages/organisationOverview.svelte'
  import AddOrganisation from './components/pages/AddOrganisation.svelte'
  import EditOrganisation from './components/pages/EditOrganisation.svelte'
</script>

<main class="c-app">
    <Sidebar />
  <div class="c-page">
    <!-- <OrganisationOverview /> -->

    <!-- <AddOrganisation/> -->

    <EditOrganisation />
  </div>
  <div />
</main>
