import { addOwner, encodeObject, filterRelation } from '../util.js';
import { del, get, post, put } from './api.js';


const endpoints = {
  rooms: `/classes/Room?where=${encodeObject({ openForBooking: true })}&include=owner`,
  roomsWithUser: (userId) => `/classes/Room?where=${encodeObject({ $or: [{ openForBooking: true }, filterRelation('owner', '_User', userId)] })}&include=owner`,
  room: '/classes/Room/'
};

export async function getAll(userId) {
  if (userId) {
    return get(endpoints.roomsWithUser(userId));
  } else {
    return get(endpoints.rooms);
  }
}

export async function getById(id) {
  return get(endpoints.room + id);
}

export async function create(data, userId) {
  return post(endpoints.rooms, addOwner(data, userId));
}

export async function update(id, data, userId) {
  return put(endpoints.room + id, addOwner(data, userId));
}

export async function deleteById(id) {
  return del(endpoints.room + id);
}