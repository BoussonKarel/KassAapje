<script lang='ts'>
  import { gqlHelper } from "../../utils/graphQL";

  import { onMount } from "svelte";
  import Loading from "../Loading/Loading.svelte";
  import type { Invitation } from "../../models/Invitation";
  import { RoleHuman } from "../../models/Role";

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

  onMount(() => {
    getInvitationDetails();
  })
</script>

<div class="c-page">
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
          <button class="c-button">
            Accepteren
         </button>
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