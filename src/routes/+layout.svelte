<script>
  import { enhance } from '$app/forms';
  import { setupLocalization, LOCALES } from '$lib/locale/i18n'
  import { setContext } from 'svelte';

  export let data

	const locale = setupLocalization(data.locale);
	setContext('locale', locale);
</script>

<div class="header">
  <div class="items">
    <a href="/">Geek House</a>
    <a href="/about">{$locale('nav.about')}</a>
    <a href="/">Games</a>
    <a href="/">Shop</a>
    <a href="/">Contact us</a>
  </div>
    {#if data.locale == 'en'}
      <button on:click={ () => {
        locale.changeLocale(LOCALES.SERBIAN);
        data.locale = 'rs';
      }}
      >EN</button>
    {:else}
      <button on:click={ () => {
        locale.changeLocale(LOCALES.ENGLISH);
        data.locale = 'en';
      }}
      >RS</button>
    {/if}

    <div>
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
