import { html } from '../lib/lit-html.js';


const profileTemplate = (userData) => html`
<div>
  <p>Username: ${userData.username}</p>
  <p>Email: ${userData.email}</p>
  <a href="my-rooms">View My Rooms</a>
</div>`;

export function profileView(ctx) {
  ctx.render(profileTemplate(ctx.user));
}