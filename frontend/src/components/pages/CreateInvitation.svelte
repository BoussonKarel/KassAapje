<script lang='ts'>
  import { gqlHelper } from "../../utils/graphQL";

  import { onMount } from "svelte";
  import Loading from "../Loading/Loading.svelte";
  import type { Invitation } from "../../models/Invitation";
  import { RoleHuman } from "../../models/Role";
  import { authHelper, authStore } from "../../utils/auth";
  import { Link } from "svelte-navigator";

  export let register_id = undefined;
  export let organization_id = undefined;

  let fetchingState = '';

  onMount(() => {
  })
</script>

<div class="c-page">
  <div class="o-container-center">
    <div class="c-bigcard {fetchingState === 'error' ? 'c-bigcard--error' : ''}">
        {#if fetchingState === 'loading'}
          <Loading size={1} />
        {:else if fetchingState === 'created'}
          <div class="c-bigcard__text">
            Je hebt een uitnodiging aangemaakt
          </div>
          <div class="c-bigcard__buttons">
            <Link to="/" class="c-button">
              Terug naar home
            </Link>
          </div>
        {:else}
          <div class="c-bigcard__text">
              Je bent uitgenodigd voor de rol <strong>xx</strong>.
          </div>
        {/if}
    </div>
  </div>
</div>