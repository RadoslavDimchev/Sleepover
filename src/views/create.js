import { html } from '../lib/lit-html.js';

import * as roomService from '../data/room.js';
import { submitHandler } from '../util.js';


const createTemplate = (onSubmit) => html`
<h2>Host Room</h2>
<form @submit=${onSubmit}>
  <label>Name: <input type="text" name="name"></label>
  <label>Location: <input type="text" name="location"></label>
  <label>Beds: <input type="number" name="beds"></label>
  <label>Price: <input type="number" name="price"></label>
  <label>More Infomation / Amenities: <textarea type="text" name="info"></textarea></label>
  <button>Create Room</button>
</form>`;

export function createView(ctx) {
  ctx.render(createTemplate(submitHandler(onSubmit)));

  async function onSubmit({ name, beds, location, price, info }, form) {
    beds = parseInt(beds);
    price = parseFloat(price);
    info = info.split('\n');

    if (!name || !location || Number.isNaN(beds) || Number.isNaN(price)) {
      return alert('All fields are required!');
    }

    const userId = ctx.user?.objectId;

    try {
      form.querySelector('button').setAttribute('disabled', true);

      const result = await roomService.create({ name, location, beds, price, info }, userId);
      ctx.page.redirect('/rooms/' + result.objectId);

    } catch (error) {
      alert(error.message);
    } finally {
      form.querySelector('button').removeAttribute('disabled');
    }
  }
}