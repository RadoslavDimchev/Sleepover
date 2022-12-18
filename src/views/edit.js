import { html } from '../lib/lit-html.js';

import * as roomService from '../data/room.js';
import { submitHandler } from '../util.js';
import { showNotification } from './notify.js';


const editTemplate = (room, onSubmit) => html`
<h2>Edit Room</h2>
<form @submit=${onSubmit}>
  <label>Name: <input type="text" name="name" .value=${room.name}></label>
  <label>Location: <input type="text" name="location" .value=${room.location}></label>
  <label>Beds: <input type="number" name="beds" .value=${room.beds}></label>
  <label>Price: <input type="number" name="price" .value=${room.price}></label>
  <label>More Infomation / Amenities: <textarea type="text" name="info" .value=${room.info.join('\n')}></textarea></label>
  <label>Open for booking: <input type="checkbox" name="openForBooking" .checked=${room.openForBooking}></label>
  <button>Save Changes</button>
</form>`;

export function editView(ctx) {
  const id = ctx.params.id;
  ctx.render(editTemplate(ctx.data, submitHandler(onSubmit)));

  async function onSubmit({ name, beds, location, price, info, openForBooking }, form) {
    beds = parseInt(beds);
    price = parseFloat(price);
    info = info.split('\n');
    openForBooking = Boolean(openForBooking);

    if (!name || !location || Number.isNaN(beds) || Number.isNaN(price)) {
      return showNotification('All fields are required!');
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