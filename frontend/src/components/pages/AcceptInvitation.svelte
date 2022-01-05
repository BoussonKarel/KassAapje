<script lang='ts'>
  import { gqlHelper } from "../../utils/graphQL";

  import { onMount } from "svelte";
  import Loading from "../Loading/Loading.svelte";
  import type { Invitation } from "../../models/Invitation";
  import { RoleHuman } from "../../models/Role";
  import { authStore } from "../../utils/auth";
  import { Link } from "svelte-navigator";

  export let invitation_id: string;

  let fetchingState = '',
    invitation: Invitation = undefined;

  const getInvitationDetails = async () => {
    fetchingState = 'loading'

      invitation = await gqlHelper.queries
         .invitation(invitation_id)
         .then(result => {
            fetchingState = ''
            console.log(result)
            return result;
         })
         .catch(() => {
            fetchingState = 'error'
         })
  };

  const acceptInvitation = async () => {
    if (invitation) {

    }
  }

  $: authorized = $authStore ? true : false;

  onMount(() => {
    getInvitationDetails();
  })
</script>

<div class="c-page {authorized ? '' : 'c-page--color'}">
  <div class="o-container-center">
    <div class="c-bigcard {fetchingState === 'error' ? 'c-bigcard--error' : ''}">
        {#if fetchingState === 'loading'}
          <Loading size={1} />
        {:else if invitation}
          <div class="c-bigcard__text">
            {#if invitation.organization}
              Je bent uitgenodigd voor de rol <strong>{RoleHuman[invitation.role]}</strong> in de vereniging <strong>{invitation.organization.name}</strong>.
            {:else if invitation.register}
              Je bent uitgenodigd voor de rol <strong>{RoleHuman[invitation.role]}</strong> in de kassa <strong>{invitation.register.name}</strong>.
            {/if}
          </div>

          {#if authorized}
            <div class="c-bigcard__buttons">
              <button on:click={acceptInvitation} class="c-button">
                Accepteren
              </button>
            </div>
          {:else}
            <div class="c-bigcard__buttons">
              <Link to="/?redirect={location.pathname}" class="c-button">
                INLOGGEN
              </Link>
              <Link to="/signup?redirect={location.pathname}" class="c-button">
                REGISTREREN
              </Link>
            </div>
          {/if}
        {:else}
          <div class="c-bigcard__text">
            {#if fetchingState === 'error'}
              Er ging iets fout bij het ophalen van de uitnodiging.
            {:else}
              Ongeldige uitnodiging.
            {/if}
          </div>
        {/if}
    </div>
  </div>
</div>