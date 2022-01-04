<script lang="ts">
  import Settings from 'svelte-material-icons/Settings.svelte'
  import Star from 'svelte-material-icons/Star.svelte'
import { Link } from 'svelte-navigator';
</script>

<Link to="#" class="c-card-link">
  <div class="c-card c-registercard">
    <div class="c-registercard__upper">
      <div class="c-registercard__icon-cog">
        <Settings />
      </div>
  
      <span class="c-registercard__title">kerstmarkt</span>
    </div>
  
    <div class="c-registercard__info">
      <div class="c-registercard__info--desc">Kassa voor de kerstmarkt 2021</div>
      <div class="c-registercard__info--org">Scouts Beselare</div>
      <div class="c-registercard__info--admin">
        <div class="c-registercard__icon-star">
          <Star />
        </div>
        <div class="c-registercard__info--admin-name">Michiel De Roovere</div>
      </div>
    </div>
  </div>
</Link>