import { clearUserData, getUserData } from '../util.js';


const host = 'https://parseapi.back4app.com';
const appKey = 'mc7XQKRmitaSnCMYLCqds7zu1hINqzEEZepTcluC';
const apiKey = 'InP17T25lSgot2Iwj5c6xeNmmFaQehJie8okTVvL';

async function request(method, url = '/', data) {
  const optinos = {
    method,
    headers: {
      'X-Parse-Application-Id': appKey,
      'X-Parse-JavaScript-Key': apiKey
    }
  };

  if (data !== undefined) {
    optinos.headers['Content-Type'] = 'application/json';
    optinos.body = JSON.stringify(data);
  }

  const userData = getUserData();
  if (userData) {
    optinos.headers['X-Parse-Session-Token'] = userData.sessionToken;
  }

  try {
    const response = await fetch(host + url, optinos);

    if (response.status === 204) {
      return response;
    }

    const result = await response.json();
    
    if (!response.ok) {
      if (response.status === 403) {
        clearUserData();
      }
      throw new Error(result.message || result.error);
    }

    return result;

  } catch (error) {
    alert(error.message);
    throw error;
  }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');