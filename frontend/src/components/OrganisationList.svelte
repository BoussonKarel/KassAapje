<script lang="ts">
   import OrganisationListItem from './OrganisationListItem.svelte'

   export let orgsCollapse
</script>

<ul class="c-sidebar__orglist--list {orgsCollapse ? 'u-hidden' : ''}">
   <OrganisationListItem />
   <OrganisationListItem />
   <OrganisationListItem />
   <OrganisationListItem />
   <OrganisationListItem />
   <OrganisationListItem />




</ul>
