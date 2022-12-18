import { encodeObject, filterRelation, addOwner, createPointer, encodeDate } from '../util.js';
import { del, get, post, put } from './api.js';


const endpoints = {
  reservationsByRoomId: (roomId, isConfirmed) => `/classes/Reservation?where={"$and": [${encodeObject(filterRelation('room', 'Room', roomId))}, ${encodeObject({ isConfirmed })}]}&include=owner`,
  reservations: '/classes/Reservation',
  reservation: '/classes/Reservation/'
};

export async function getByRoomId(roomId, isConfirmed) {
  const data = await get(endpoints.reservationsByRoomId(roomId, isConfirmed));
  data.results.forEach(r => {
    r.startDate = new Date(r.startDate.iso);
    r.endDate = new Date(r.endDate.iso);
  });
  return data;
}

export async function create(resData, userId) {
  resData = addOwner(resData, userId);
  resData.startDate = encodeDate(resData.startDate);
  resData.endDate = encodeDate(resData.endDate);
  resData.room = createPointer('Room', resData.room);
  resData.host = createPointer('_User', resData.host);

  return post(endpoints.reservations, resData);
}

export async function update(id, resData, ownerId) {
  resData = addOwner(resData, ownerId);
  resData.startDate = encodeDate(resData.startDate);
  resData.endDate = encodeDate(resData.endDate);

  return put(endpoints.reservation + id, resData);
}

export async function deleteById(id) {
  return del(endpoints.reservation + id);
}