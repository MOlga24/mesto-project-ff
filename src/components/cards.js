import { config } from "./api";
import { render } from "./index";
import { likeNum } from "./card";

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((result) => {
      console.log(result);
      const initialCards = Array.from(result);
      // let likeNum = result.likes.length;

      render(initialCards);
    })
    .catch((res) => {
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};
export function addNewCard(name, link, likeNum) {
  fetch("https://nomoreparties.co/v1/wff-cohort-22/cards", {
    method: "POST",
    headers: {
      authorization: "3bdecd97-cc83-4e5e-ac8d-e22694049ffd",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
      likes: likeNum,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res[link]);
    });
}
export function deleteCard(id, listItem) {
  fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: "3bdecd97-cc83-4e5e-ac8d-e22694049ffd",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
  listItem.remove();
}
export function likeCard(likeButton, likeSpan, id) {
  let likeNum = 1;

  addLikeCard(likeButton, likeSpan, id);
}

export function addLikeCard(likeButton, likeSpan, id) {
  fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: {
      authorization: "3bdecd97-cc83-4e5e-ac8d-e22694049ffd",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      console.log(res);
    });
  likeButton.nextElementSibling.textContent -= likeButton.classList.toggle(
    "card__like-button_is-active"
  )
    ? -1
    : 1;
}
