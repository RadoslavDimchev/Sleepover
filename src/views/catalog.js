import { html } from '../lib/lit-html.js';
import { classMap } from '../lib/directives/class-map.js';
import { repeat } from '../lib/directives/repeat.js';

import * as roomService from '../data/room.js';


const catalogTemplate = (list, ctx) => html`
${ctx.pathname === '/my-profile'
  ? html`
  <div class="container move">
    <h2>My Profile</h2>
    <p>Username: ${ctx.user.username}</p>
    <p>Email: ${ctx.user.email}</p>
  </div>
  <div class="container">
  <h2>My Rooms</h2>
  </div>`
  : html`<div class="container"><h2>Available Rooms</h2></div>`}
${list}`;

const listTemplate = (rooms, userId) => html`
<section>
  ${rooms.length === 0 
    ? html`<div class="container"><p class="no-rooms">There are no rooms</p></div>` 
    : repeat(rooms, r => r.objectId, (r) => roomCard(r, userId))}
</section>`;

const roomCard = (room, userId) => html`
<article class=${classMap({ 'room-card': true, 'own-room' : room.isOwner })}>
  <h3>${room.name}</h3>
  <p>Location: ${room.location}</p>
  <p>Beds: ${room.beds}</p>
  <p>Price: ${room.price} lv.</p>
  <p><a class="btn view-btn" href=${'/rooms/' + room.objectId}>View Details</a></p>
  <p class="host">Hosted by ${room.owner.objectId === userId ? 'You' : room.owner.username}</p>
</article>`;

export async function catalogView(ctx) {
  ctx.render(catalogTemplate(html`<img src='/assets/spinner.gif' class="spinner">`, ctx));

  const {results: rooms} = await loadData(ctx);
  rooms.forEach(r => r.isOwner = r.owner.objectId === ctx.user?.objectId);

  ctx.render(catalogTemplate(listTemplate(rooms, ctx.user?.objectId), ctx));
}

async function loadData(ctx) {
  if(ctx.pathname === '/my-profile') {
    return await roomService.getAllMy(ctx.user.objectId);
  } else {
    return await roomService.getAll(ctx.user?.objectId);
  }
}