<script lang='ts'>
    import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  export let form: ActionData
</script>

<h1>Login</h1>

<form action="?/login" method="POST" use:enhance>
  <div>
    <label for="username">Username/Email</label>
    <input type="username" name="username" id="usernameOrEmail" required>
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" name="password" id="password" required>
  </div>

  {#if form?.credentials}
    <p>You have entered wrong credentials!</p>
  {/if}
  
  <button type="submit">Login</button>
</form>
