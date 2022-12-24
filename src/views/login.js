import { html } from '../lib/lit-html.js';

import { submitHandler } from '../util.js';
import { login } from '../data/user.js';
import { showNotification } from './notify.js';


const loginTemplate = (onSubmit) => html`
<div class="container">
  <h2>Login</h2>
  <form @submit=${onSubmit}>
    <label>Email<span class="asterisk">*</span></label>
    <input type="text" name="email">
    <label>Password<span class="asterisk">*</span></label>
    <input type="password" name="password">
    <button class="btn">Login</button>
  </form>
  <span>You don't have an account yet?</span>
  <a href="/register">Sign up</a>
</div>`;

export function loginView(ctx) {
  ctx.render(loginTemplate(submitHandler(onLogin)));

  async function onLogin({ email, password }) {
    if (!email || !password) {
      return showNotification('All fields are required!');
    }

    await login(email, password);
    ctx.page.redirect('/rooms');
  }
}