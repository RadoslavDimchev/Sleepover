import { html } from '../lib/lit-html.js';


export const navTemplate = (user, pathname) => html`
<nav>
  <a href="/">Home</a>
  <a href="/rooms">Rooms</a>
  <div>
    ${user
    ? html`
    <a href="/host">Host</a>
    <a href="/my-rooms">My Rooms</a>
    <a href="/my-profile">My Profile</a>
    <a href="/logout">Logout</a>
    <span>Welcome, ${user.username}!</span>`
    : html`
    <a href="/login">Login</a>
    <a href="/register">Register</a>`}
  </div>
</nav>`;

function setActive(pathname) {
  console.log(pathname);
  console.log(document.querySelector('header nav'));
}