import { html } from '../lib/lit-html.js';


export const navTemplate = (user) => html`
<nav>
  <a href="/">Home</a>
  <a href="/rooms">Rooms</a>
  <div>
    ${user
    ? html`
    <span>Welcome, ${user.username}!</span>
    <a href="/host">Host</a>
    <a href="/my-profile">My Profile</a>
    <a href="/logout">Logout</a>`
    : html`
    <a href="/login">Login</a>
    <a href="/register">Register</a>`}
  </div>
</nav>`;