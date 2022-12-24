import { html } from '../lib/lit-html.js';


const notFoundTemplate = () => html`
<div class="container">
  <h2>Oops!</h2>
  <p>404 - PAGE NOT FOUND</p>
  <p>Sorry, the page you're looking for doesn't exist.</p>
  <a href="/" class="btn not-found" >Go to Homepage</a>
</div>`;

export function notFoundView(ctx) {
  ctx.render(notFoundTemplate());
}