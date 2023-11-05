import { BASE_URL } from "./constants";

export const checkRequestResult = async (res) => {
  if (res.ok) {
    return res.json();
  }
  let text = await new Response(res.body).text();

  return Promise.reject(`Ошибка: ${res.status}, ${JSON.parse(text).message}`);
}

export const getUser = (id, first_name, last_name) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, first_name, last_name })
  })
    .then((res) => {
      return checkRequestResult(res);
    })
}

export const updateUserBalance = (id, balance) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, balance })
  })
    .then((res) => {
      return checkRequestResult(res);
    })
}

