import { html } from '../lib/lit-html.js';


const homeTemplate = () => html`
<div class="container">
  <h1>Welcome to Sleepover!</h1>
  <p>Find accommodation in many locations across the world! <a href="/rooms">Browse catalog</a></p>
  <p>Have a room to offer? <a href="/host">Add now</a></p>
</div>`;

export function homeView(ctx) {
  ctx.render(homeTemplate());
}