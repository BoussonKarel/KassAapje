<script lang="ts">
   import { Link } from 'svelte-navigator'

   export let organization
</script>

<Link class="c-card-link" to={`/${organization.organization_id}`}>
  <div class="c-card c-organisationcard">
      <p class="c-organisationcard__title">{organization.name}</p>
   </div>
</Link>