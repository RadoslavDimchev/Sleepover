const container = document.createElement('div');
container.className = 'notification';
const span = document.createElement('span');
container.appendChild(span);

export function showNotification(message) {
  span.textContent = message;
  document.body.appendChild(container);

  setTimeout(() => container.remove(), 3000);
}