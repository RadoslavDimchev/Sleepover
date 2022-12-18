import page from './lib/page.mjs';
import { hasUser, isOwner } from './middlewares/guards.js';
import { preloadRoom } from './middlewares/preload.js';
import { addRender } from './middlewares/render.js';
import { addSession } from './middlewares/session.js';
import { addUserNav } from './middlewares/userNav.js';
import { getUserData } from './util.js';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { logoutAction } from './views/logout.js';
import { navTemplate } from './views/nav.js';
import { notFoundView } from './views/notFound.js';
import { registerView } from './views/register.js';


page(addRender(document.querySelector('main'), document.querySelector('header')));
page(addSession(getUserData));
page(addUserNav(navTemplate));

page('/', homeView);
page('/rooms', catalogView);
page('/rooms/:id', preloadRoom('id', 'rooms'), detailsView);
page('/host', hasUser(), createView);
page('/edit/:id', preloadRoom('id', 'rooms'), isOwner(), editView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutAction);
page('*', notFoundView);

page.start();