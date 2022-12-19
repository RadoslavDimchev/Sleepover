import { html } from '../lib/lit-html.js';


export const navTemplate = (user) => html`
<nav>
  <a href="/">Home</a>
  <a href="/rooms">Rooms</a>
  ${user
    ? html`
  <a href="/host">Host</a>
  <a href="/my-rooms">My Rooms</a>
  <a href="/my-profile">My Profile</a>
  <a href="/logout">Logout</a>
  <span>Welcome, ${user.username}!</span>`
    : html`
  <a href="/login">Login</a>
  <a href="/register">Register</a>`
  }
</nav>`;