<script>
    import { enhance } from '$app/forms';

  export let data
</script>

<div class="header">
  <div class="items">
    <a href="/">Geek House</a>
    <a href="/">Home</a>
    <a href="/about">About us</a>
    <a>Games</a>
    <a>Shop</a>
    <a>Contact us</a>
  </div>
  {#if data.user}
    <div>
      <form action="/logout" method="POST" use:enhance>
        <button type="submit">Log out</button>      
      </form>
    </div>
  {:else}
    <div class="items">
      <a href="/login">Log in</a>
      <a href="/register">Register</a>
    </div>
  {/if}
</div>
<slot />

<style>
  .header {
    display: flex;
    margin: 16px 32px;
    justify-content: space-between;
  }
  .items {
    display: flex;
    gap: 16px;
  }
</style>
