import { html } from '../lib/lit-html.js';

import { submitHandler } from '../util.js';
import { register } from '../data/user.js';
import { showNotification } from './notify.js';


const registerTemplate = (onSubmit) => html`
<h2>Register</h2>
<form @submit=${onSubmit}>
  <label>Email <input type="text" name="email"></label>
  <label>Username <input type="text" name="username"></label>
  <label>Password <input type="password" name="password"></label>
  <label>Repeat <input type="password" name="repass"></label>
  <button>Register</button>
</form>
<span>You already have an account?</span>
<a href="/login">Sign in</a>`;

export function registerView(ctx) {
  ctx.render(registerTemplate(submitHandler(onRegister)));

  async function onRegister({ email, username, password, repass }) {
    if (!email || !username || !password) {
      return showNotification('All fields are required!');
    }
    if (password !== repass) {
      return showNotification('Passwords don\'t match!');
    }

    await register(email, username, password);
    ctx.page.redirect('/rooms');
  }
}