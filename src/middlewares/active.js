export function setActive() {
  return function (ctx, next) {
    [...document.querySelectorAll('nav a')]
      .forEach(e => e.pathname === ctx.pathname
        ? e.classList.add('active')
        : e.classList.remove('active'));

    next();
  };
}