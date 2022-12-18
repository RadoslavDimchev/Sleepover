import { html } from '../lib/lit-html.js';

import { submitHandler } from '../util.js';
import { login } from '../data/user.js';
import { showNotification } from './notify.js';


const loginTemplate = (onSubmit) => html`
<h2>Login</h2>
<form @submit=${onSubmit}>
  <label>Email <input type="text" name="email"></label>
  <label>Password <input type="password" name="password"></label>
  <button>Login</button>
</form>
<span>You don't have an account yet?</span> 
<a href="/register">Sign up</a>`;

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