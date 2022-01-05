<script lang="ts">
   import { authStore } from '../../utils/auth'

   import { onMount } from 'svelte'

   import Settings from 'svelte-material-icons/Settings.svelte'
   import Star from 'svelte-material-icons/Star.svelte'
   import { Link } from 'svelte-navigator'

   export let register
</script>

<Link to={register.register_id} class="c-card-link">
   <div class="c-card c-registercard">
      <div class="c-registercard__upper">
         <Link to="{register.register_id}/info">
            <div class="c-registercard__icon-cog">
               <Settings />
            </div>
         </Link>

         <span class="c-registercard__title">{register.name}</span>
      </div>

      <div class="c-registercard__info">
         <div class="c-registercard__info--desc">{register.description}</div>
         <div class="c-registercard__info--org">{register.organization.name}</div>
      </div>
   </div>
</Link>
