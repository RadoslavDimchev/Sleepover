import { html } from '../lib/lit-html.js';

import { submitHandler } from '../util.js';
import { register } from '../data/user.js';
import { showNotification } from './notify.js';


const registerTemplate = (onSubmit) => html`
<div class="container">
  <h2>Register</h2>
  <form @submit=${onSubmit}>
    <label>Email<span class="asterisk">*</span></label>
    <input type="text" name="email">
    <label>Username<span class="asterisk">*</span></label>
    <input type="text" name="username">
    <label>Password<span class="asterisk">*</span></label>
    <input type="password" name="password">
    <label>Repeat<span class="asterisk">*</span></label>
    <input type="password" name="repass">
    <button class="btn">Register</button>
  </form>
  <span>You already have an account?</span>
  <a href="/login">Sign in</a>
</div>`;

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