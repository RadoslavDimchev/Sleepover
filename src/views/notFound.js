import { html } from '../lib/lit-html.js';


const notFoundTemplate = () => html`
<h2>Oops!</h2>
<p>404 - PAGE NOT FOUND</p>
<p>Sorry, the page you're looking for doesn't exist.</p>
<a href="/">Go to Homepage</a>`;

export function notFoundView(ctx) {
  ctx.render(notFoundTemplate());
}