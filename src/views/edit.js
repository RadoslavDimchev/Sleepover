import { html } from '../lib/lit-html.js';

import * as roomService from '../data/room.js';
import { submitHandler } from '../util.js';
import { showNotification } from './notify.js';


const editTemplate = (room, onSubmit) => html`
<div class="container">
  <h2>Edit Room</h2>
  <form @submit=${onSubmit}>
    <label>Name<span class="asterisk">*</span></label>
    <input type="text" name="name" .value=${room.name}>
    <label>Location<span class="asterisk">*</span></label>
    <input type="text" name="location" .value=${room.location}>
    <label>Beds<span class="asterisk">*</span></label>
    <input type="number" name="beds" .value=${room.beds}>
    <label>Price<span class="asterisk">*</span></label>
    <input type="number" name="price" .value=${room.price}>
    <label>More Infomation / Amenities</label>
    <textarea type="text" name="info" .value=${room.info.join('\n')}></textarea>
    <label>Open for booking:</label>
    <input class="booking-check" type="checkbox" name="openForBooking" .checked=${room.openForBooking}>
    <button class="btn">Save Changes</button>
  </form>
</div>`;

export function editView(ctx) {
  const id = ctx.params.id;
  ctx.render(editTemplate(ctx.data, submitHandler(onSubmit)));

  async function onSubmit({ name, beds, location, price, info, openForBooking }, form) {
    beds = parseInt(beds);
    price = parseFloat(price);
    info = info.split('\n');
    openForBooking = Boolean(openForBooking);

    if (!name || !location || Number.isNaN(beds) || Number.isNaN(price)) {
      return showNotification('Fill all required fields!');
    }

    const userId = ctx.user.objectId;

    try {
      form.querySelector('button').setAttribute('disabled', true);

      await roomService.update(id, { name, location, beds, price, openForBooking, info }, userId);
      ctx.page.redirect('/rooms/' + id);

    } catch (error) {
      showNotification(error.message);
    } finally {
      form.querySelector('button').removeAttribute('disabled');
    }
  }
}