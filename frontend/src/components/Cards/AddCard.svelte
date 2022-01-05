<script lang="ts">
   import Plus from 'svelte-material-icons/Plus.svelte'
   import { Link } from 'svelte-navigator'

   export let page
</script>

{#if page == 'organisations'}
   <Link to="/new" class="c-card c-addcard">
      <div class="c-addcard__icon">
         <Plus />
      </div>
   </Link>
{/if}
{#if page == 'registers'}
   <Link to=":orgid/new" class="c-card c-addcard">
      <div class="c-addcard__icon">
         <Plus />
      </div>
   </Link>
{/if}
