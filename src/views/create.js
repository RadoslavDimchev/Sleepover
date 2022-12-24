import { html } from '../lib/lit-html.js';

import * as roomService from '../data/room.js';
import { submitHandler } from '../util.js';
import { showNotification } from './notify.js';


const createTemplate = (onSubmit) => html`
<div class="container">
  <h2>Host Room</h2>
  <form @submit=${onSubmit}>
    <label>Name<span class="asterisk">*</span></label>
    <input type="text" name="name" placeholder="Name">
    <label>Location<span class="asterisk">*</span></label>
    <input type="text" name="location" placeholder="Location">
    <label>Beds<span class="asterisk">*</span></label>
    <input type="number" name="beds" placeholder="Beds">
    <label>Price<span class="asterisk">*</span></label>
    <input type="number" name="price" placeholder="Price">
    <label>More Infomation / Amenities</label>
    <textarea type="text" name="info" placeholder="Additional information"></textarea>
    <button class="btn">Create Room</button>
  </form>
</div>`;

export function createView(ctx) {
  ctx.render(createTemplate(submitHandler(onSubmit)));

  async function onSubmit({ name, beds, location, price, info }, form) {
    beds = parseInt(beds);
    price = parseFloat(price);
    info = info.split('\n');

    if (!name || !location || Number.isNaN(beds) || Number.isNaN(price)) {
      return showNotification('Fill all required fields!');
    }

    const userId = ctx.user?.objectId;

    try {
      form.querySelector('button').setAttribute('disabled', true);

      const result = await roomService.create({ name, location, beds, price, info }, userId);
      ctx.page.redirect('/rooms/' + result.objectId);

    } catch (error) {
      showNotification(error.message);
    } finally {
      form.querySelector('button').removeAttribute('disabled');
    }
  }
}