const element = document.createElement('div');
element.className = 'overlay';
element.innerHTML = `
<div class="modal">
  <p></p>
  <button class="btn ok" id="modal-ok">OK</button>
  <button class="btn cancel" id="modal-cancel">Cancel</button>
</div>`;

element.querySelector('#modal-ok').addEventListener('click', () => onChoice(true));
element.querySelector('#modal-cancel').addEventListener('click', () => onChoice(false));

let callback = null;
let params = null;

function onChoice(choice) {
  element.remove();
  if (choice) {
    callback(...params);
  }
}

export function showModal(cb, message, ...pr) {
  callback = cb;
  params = pr;
  element.querySelector('p').textContent = 'Are you sure you want to ' + message;
  document.body.appendChild(element);
}