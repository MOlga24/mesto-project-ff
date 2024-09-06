import { config } from "./api";
export const firstPromise = await fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
});
const data = await firstPromise.json();
export const initialCards = Array.from(data);

export function addNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: "3bdecd97-cc83-4e5e-ac8d-e22694049ffd",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
}
export function deleteCard(id, listItem) {
  fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
  listItem.remove();
}
export function likeCard(item, likeButton) {
  likeButton.nextElementSibling.textContent = item.length;
}
export function addLikeCard(id, likeButton) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  });
}
export function deleteLikeCard(id, likeButton) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });
}
