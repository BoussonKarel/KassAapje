<script lang="ts">
  import Settings from 'svelte-material-icons/Settings.svelte'
  import Star from 'svelte-material-icons/Star.svelte'
  import { Link } from 'svelte-navigator';

  export let register;
</script>

<Link to="/{register.organization.organization_id}/{register.register_id}" class="c-card-link">
  <div class="c-card c-registercard">
    <div class="c-registercard__upper">
      <div class="c-registercard__icon-cog">
        <Settings />
      </div>
  
      <span class="c-registercard__title">{register.name}</span>
    </div>
  
    <div class="c-registercard__info">
      <div class="c-registercard__info--desc">{register.description}</div>
      <div class="c-registercard__info--org">{register.organization.name}</div>
      <div class="c-registercard__info--admin">
        <div class="c-registercard__icon-star">
          <Star />
        </div>
        <div class="c-registercard__info--admin-name">Michiel De Roovere</div>
      </div>
    </div>
  </div>
</Link>