import { html, nothing } from '../lib/lit-html.js';
import { repeat } from '../lib/directives/repeat.js';

import * as roomService from '../data/room.js';
import * as reservationService from '../data/reservation.js';

import { submitHandler } from '../util.js';
import { showModal } from './modal.js';


const detailsTemplate = (room, userId, onDelete, onBook, onConfirm, onRemove) => html`
<h2>${room.name}</h2>
<p>Location: ${room.location}</p>
<p>Beds: ${room.beds}</p>
<p>Price: ${room.price} lv.</p>
<p>More Infomation / Amenities:</p>
${room.info.length === 0 ? html`<p>There are no information or amenities</p>` : html`<ul>${room.info.map(informationTemplate)}</ul>`}
${userId && !room.isOwner ? reservationForm(onBook) : nothing}
${room.isOwner ? ownerTemplate(room, onDelete) : nothing}
${userId ? reservationsTemplate(room, userId, onConfirm, onRemove) : nothing}`;

const informationTemplate = (info) => html`<li>${info}</li>`;

const reservationForm = (onSubmit) => html`
<form @submit=${onSubmit}>
  <label>From <input type="date" name="startDate"></label>
  <label>To <input type="date" name="endDate"></label>
  <button>Request reservation</button>
</form>`;

const ownerTemplate = (room, onDelete) => html`
<a href='/edit/${room.objectId}'>Edit</a>
<a href='javascript:void(0)' @click=${() => showModal(onDelete, 'take down this offer?')}>Delete</a>`;

const reservationCard = (res, userId, onConfirm, onRemove) => html`
<li>
  From ${res.startDate.toISOString().slice(0, 10)} To ${res.endDate.toISOString().slice(0, 10)} By ${res.owner.objectId === userId ? 'You' : res.owner.username}
  ${res.host.objectId === userId && !res.isConfirmed
    ? html`
      <button @click=${(e) => onConfirm(e, res)}>Confirm</button>
      <button @click=${(e) => showModal(onRemove, 'remove this reservation?', e, res.objectId)}>Remove</button>` 
    : !res.isConfirmed 
      ? html`<button @click=${(e) => showModal(onRemove, 'remove this reservation?', e, res.objectId)}>Remove</button>` 
      : nothing}
</li>`;

const reservationsTemplate = (room, userId, onConfirm, onRemove) => html`
<h3>Confirmed Reservations</h3>
${room.confirmedRes.length === 0
  ? html`<p>There are no confirmed reservations</p>`
  : html`<ul>${repeat(room.confirmedRes, r => r.objectId, (r) => reservationCard(r, userId, onConfirm, onRemove))}</ul>`} 
      
<h3>Pending Reservations</h3>
${room.pendingRes.length === 0
  ? html`<p>There are no pending reservations</p>`
  : html`<ul>${repeat(room.pendingRes, r => r.objectId, (r) => reservationCard(r, userId, onConfirm, onRemove))}</ul>`}
`;

export async function detailsView(ctx) {
  const id = ctx.params.id;
  const room = ctx.data;

  const user = ctx.user;
  room.isOwner = room.owner.objectId === ctx.user?.objectId;
  room.confirmedRes = [];
  room.pendingRes = [];

  if (user) {
    const [confirmed, pending] = await Promise.all([
      await reservationService.getByRoomId(id, true),
      await reservationService.getByRoomId(id, false)
    ]); 
    room.confirmedRes = confirmed.results;
    room.pendingRes = pending.results;
  }

  ctx.render(detailsTemplate(ctx.data, user?.objectId, onDelete, submitHandler(onBook), onConfirm, onRemove));

  async function onDelete() {
    await roomService.deleteById(id);
    ctx.page.redirect('/rooms');
  }

  async function onBook({ startDate, endDate }, form) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    if (isNaN(startDate)) {
      return alert('Invalid starting date!');
    }
    if (isNaN(endDate)) {
      return alert('Invalid ending date!');
    }
    if (startDate >= endDate) {
      return alert('Ending date must be after starting date!');
    }

    const reservationData = {
      startDate,
      endDate,
      room: id,
      host: ctx.data.owner.objectId
    };

    form.querySelector('button').setAttribute('disabled', true);
    await reservationService.create(reservationData, ctx.user.objectId);
    form.querySelector('button').removeAttribute('disabled');
    
    ctx.page.redirect('/rooms/' + id);
  }

  async function onConfirm(e, res) {
    e.target.setAttribute('disabled', true);

    await reservationService.update(
      res.objectId, 
      {
        objectId: res.objectId,
        startDate: res.startDate,
        endDate: res.endDate,
        room: res.room,
        host: res.host,
        isConfirmed: true
      }, 
      res.owner.objectId
    );

    e.target.removeAttribute('disabled');
    ctx.page.redirect('/rooms/' + id);
  }

  async function onRemove(e, resId) {
    e.target.setAttribute('disabled', true);
    e.target.parentElement.querySelector('button').setAttribute('disabled', true);
    
    await reservationService.deleteById(resId);
    ctx.page.redirect('/rooms/' + id);
  }
}