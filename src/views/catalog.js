import { html } from '../lib/lit-html.js';
import { classMap } from '../lib/directives/class-map.js';
import { repeat } from '../lib/directives/repeat.js';

import * as roomService from '../data/room.js';


const catalogTemplate = (list, ctx) => html`
<h2>${ctx.pathname === '/my-rooms' && ctx.user ? 'My Rooms' : 'Available Rooms'}</h2>
${list}`;

const listTemplate = (rooms) => html`
<section>
  ${rooms.length === 0 ? html`<p>There are no rooms</p>` :  repeat(rooms, r => r.objectId, roomCard)}
</section>`;

const roomCard = (room) => html`
<article class=${classMap({ 'room-card': true, 'own-room' : room.isOwner })}>
  <h3>${room.name}</h3>
  <p>Location: ${room.location}</p>
  <p>Beds: ${room.beds}</p>
  <p>Price: ${room.price} lv.</p>
  <p><a class="action" href=${'/rooms/' + room.objectId}>View Details</a></p>
  <p>Hosted by ${room.owner.username}</p>
</article>`;

export async function catalogView(ctx) {
  ctx.render(catalogTemplate(html`<p>Loading &hellip;</p>`, ctx));

  const {results: rooms} = await loadData(ctx);
  rooms.forEach(r => r.isOwner = r.owner.objectId === ctx.user?.objectId);

  ctx.render(catalogTemplate(listTemplate(rooms), ctx));
}

async function loadData(ctx) {
  if(ctx.pathname === '/my-rooms' && ctx.user) {
    return await roomService.getAllMy(ctx.user.objectId);
  } else {
    return await roomService.getAll(ctx.user?.objectId);
  }
}