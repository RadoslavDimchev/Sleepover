import { clearUserData, setUserData } from '../util.js';
import { post } from './api.js';


export async function register(email, username, password) {
  const { sessionToken, objectId } = await post('/users', { email, username, password });

  setUserData({
    email,
    username,
    sessionToken,
    objectId
  });
}

export async function login(email, password) {
  const {username, sessionToken, objectId} = await post('/login', { email, password });

  setUserData({
    email,
    username,
    sessionToken,
    objectId
  });
}

export function logout() {
  clearUserData();
}