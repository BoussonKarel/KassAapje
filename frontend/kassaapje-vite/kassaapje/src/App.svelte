<script lang="ts">
  import './styles/screen.scss'
  import Sidebar from './components/sidebar.svelte'
  import OrganisationOverview from './components/pages/organisationOverview.svelte'
  import AddOrganisation from './components/pages/AddOrganisation.svelte'
  import EditOrganisation from './components/pages/EditOrganisation.svelte'
  import RegisterOverview from './components/pages/RegisterOverview.svelte'
  import UserOverview from './components/pages/UserOverview.svelte'
  import EditUser from './components/pages/EditUser.svelte'
</script>

<main class="c-app">
  <Sidebar />
  <div class="c-page">
    <!-- <OrganisationOverview /> -->
    <!-- <AddOrganisation/> -->
    <!-- <EditOrganisation /> -->

    <!-- <RegisterOverview/> -->

    <!-- <UserOverview /> -->
    <EditUser/>
  </div>
  <div />
</main>
