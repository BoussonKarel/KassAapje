<script lang='ts'>
import { onMount } from "svelte";


  export let invitation_id;

  let fetchingState = '',
    invitation = undefined;

  const getInvitationDetails = async () => {

  };

  onMount(() => {
    getInvitationDetails();
  })
</script>

<div class="c-page">
  <div class="o-container-center">
    <div class="c-bigcard">
      <div class="c-bigcard__text">
        Je bent uitgenodigd voor de rol <strong>Admin</strong> in de vereniging {invitation_id}
      </div>
    </div>
  </div>
</div>