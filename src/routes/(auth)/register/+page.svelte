<script lang="ts">
    import { enhance } from '$app/forms';
  import type { ActionData } from './$types'

  export let form: ActionData
  export let data

</script>

<h1>Register</h1>

<form action="?/register" method="POST" use:enhance>
  <div>
    <label for="username">Username</label>
    <input type="username" name="username" id="username" min="3" max="15" required>
  </div>
  <div>
    <label for="fullname">Full Name</label>
    <input type="text" name="fullname" id="fullname" required>
  </div>
  <div>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" required>
  </div>
  <div>
    <label for="address">Address</label>
    <input type="text" name="address" id="address" required>
  </div>
  <div>
    <label for="phone">Phone Number</label>
    <input type="tel" name="phone" id="phone" required>
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" name="password" id="password" required>
  </div>

  {#if form?.invalid}
    <p>Something went wrong. Please try again.</p>
  {/if}

  
  {#if form?.email}
    <p>Email is already taken.</p>
  {/if}

  {#if form?.username}
    <p>Username is already taken.</p>
  {/if}

  <button type="submit">Register</button>
</form>
