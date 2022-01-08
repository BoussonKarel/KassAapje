<script lang='ts'>
  import { onMount } from "svelte";
  import Loading from "../Loading/Loading.svelte";
  import {Role, RoleHuman} from '../../models/Role'
  import { gqlHelper } from "../../utils/graphQL";
import type { Invitation } from "../../models/Invitation";
import { formatHelper } from "../../utils/formatHelper";
import NavigationBar from "../NavigationBar.svelte";

  export let register_id = undefined;
  export let organization_id = undefined;

  let fetchingState: string = '',
    invitation: Invitation = undefined,
    invitationURL: string = '';

  let selectedRole: Role = undefined;

  const handleSelect = (e) => {
    selectedRole = e.target.value;
  }

  const createInvitation = () => {
    if (Object.values(Role).some(r => r === selectedRole)) {
      fetchingState = 'loading';

      const newInvitation: Invitation = {
        role: selectedRole
      }

      if (organization_id) newInvitation.organization_id = organization_id;
      else if (register_id) newInvitation.register_id = register_id;

      gqlHelper.mutations.createInvitation(newInvitation).then(result => {
        invitation = result;
        invitationURL = `${location.origin}/invitation/${invitation.invitation_id}`;
        fetchingState = '';
      }).catch((e) => {
        fetchingState = 'error'
      })
    }
  }

  const copyURL = () => {
    navigator.clipboard.writeText(invitationURL);
  }
</script>

<div class="c-page">
  <NavigationBar title="Uitnodiging aanmaken" />
  <div class="o-container-center">
    <div class="c-bigcard {fetchingState === 'error' ? 'c-bigcard--error' : ''}">
        {#if fetchingState === 'loading'}
          <Loading size={1} />
        {:else if invitation}
        <div class="c-bigcard__text">
          Stuur deze link naar de persoon die je wil uitnodigen voor de rol <strong>{RoleHuman[selectedRole]}</strong>
        </div>
        <span on:click={copyURL} style="user-select: all" class="c-input c-bigcard__input" name="URL" type="text">
          {invitationURL}
        </span>
        <div class="c-bigcard__text">
          Deze uitnodiging is geldig tot {formatHelper.dateTime(invitation.expiration_date)}
        </div>
        <div class="bigcard__buttons">
          <button on:click={copyURL} class="c-button">
            Link kopiëren
          </button>
        </div>
        {:else}
          <div class="c-bigcard__text">
            Maak een uitnodiging aan voor deze {organization_id ? 'vereniging' : register_id ? 'kassa' : ''}.
          </div>
          <div class="c-bigcard__buttons">
            <select on:input={handleSelect} name="" id="" value={selectedRole}>
              {#each Object.values(Role) as r}
                <option value={r}>{RoleHuman[r]}</option>
              {/each}
            </select>
            <button class="c-button" on:click={createInvitation}>
              Aanmaken
            </button>
          </div>
        {/if}
    </div>
  </div>
</div>