<script lang="ts">
  import AccountCircleOutline from 'svelte-material-icons/AccountCircleOutline.svelte'
  import LogoutVariant from 'svelte-material-icons/LogoutVariant.svelte'
  import ChevronUp from 'svelte-material-icons/ChevronUp.svelte'
  import ChevronDown from 'svelte-material-icons/ChevronDown.svelte'
  import ArrowCollapseLeft from 'svelte-material-icons/ArrowCollapseLeft.svelte'
  import ArrowCollapseRight from 'svelte-material-icons/ArrowCollapseRight.svelte'
  import ArrowCollapse from 'svelte-material-icons/ArrowCollapse.svelte'
</script>

<div class="c-sidebar">
  <div class="c-sidebar-title">KassAapje</div>

  <div class="c-sidebar-profile">
    <div class="c-sidebar-profile-icon">
      <AccountCircleOutline />
    </div>
    <div class="c-sidebar-profile-name">Michiel</div>
  </div>

  <div class="c-sidebar-logout">
    <div class="c-sidebar-logout-icon">
      <LogoutVariant />
    </div>
    <div class="c-sidebar-logout-text">Uitloggen</div>
  </div>

  <div class="c-sidebar-organisations">
    <div class="c-sidebar-organisations-title">
      <div class="c-sidebar-organisations-title-text">Verenigingen</div>
      <div class="c-sidebar-organisations-title-icon">
        <ChevronDown />
      </div>
    </div>

    <ul class="c-sidebar-organisations-list">
      <div class="c-sidebar-organisations-list-title">
        <li class="c-sidebar-organisations-list-title-text">Scouts Beselare</li>
        <div class="c-sidebar-organisations-list-title-icon">
          <ChevronDown />
        </div>
      </div>

      <ul>
        <li class="c-sidebar-organisations-list-item">Kerstmarkt</li>
        <li class="c-sidebar-organisations-list-item">Pasta Avond</li>
        <li class="c-sidebar-organisations-list-item">Lorem</li>
        <li class="c-sidebar-organisations-list-item">Ipsum</li>
      </ul>
      <div class="c-sidebar-organisations-list-title">
        <li class="c-sidebar-organisations-list-title-text">De Kouter</li>
        <div class="c-sidebar-organisations-list-title-icon">
          <ChevronDown />
        </div>
      </div>

      <ul>
        <li class="c-sidebar-organisations-list-item">Blikkefeest</li>
        <li class="c-sidebar-organisations-list-item">Girls Night</li>
        <li class="c-sidebar-organisations-list-item">Tea Day</li>
      </ul>
    </ul>

    <div class="c-sidebar-collapse">
      <div class="c-sidebar-collapse-icon">
        <ArrowCollapseRight />
      </div>
      <div class="c-sidebar-collapse-text">Verkleinen</div>
    </div>
  </div>
</div>
