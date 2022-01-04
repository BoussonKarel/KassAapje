<script lang="ts">
   import Plus from 'svelte-material-icons/Plus.svelte'
   import { Link } from 'svelte-navigator'

   export let page

   const handleAddCard = () => {
      if (page == 'organisations') {
         console.log('clicked organisations')
      } else if (page == 'registers') {
         console.log('clicked registers')
      }
   }
</script>

{#if page == 'organisations'}
   <Link to="/new" class="c-card c-addcard">
      <div class="c-addcard__icon">
         <Plus />
      </div>
   </Link>
{/if}
{#if page == 'registers'}
   <Link to="/new" class="c-card c-addcard">
      <div class="c-addcard__icon">
         <Plus />
      </div>
   </Link>
{/if}
