import { editProfile } from "./index";
export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-22",
  headers: {
    authorization: "3bdecd97-cc83-4e5e-ac8d-e22694049ffd",
    "Content-Type": "application/json",
  },
};
export const firstPromise = await fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
});
const data = await firstPromise.json();
export const initialCards = Array.from(data);
export function getProfileInfo(nameInput, jobInput) {
  fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
    .then((res) => res.json())
    .then((profile) => {
      document
        .querySelector(".profile__image")
        .setAttribute("style", `background-image: url(${profile.avatar})`);
      nameInput = profile.name;
      jobInput = profile.about;
      editProfile(nameInput, jobInput);
    });
}

export function editProfileInfo(nameInput, jobInput) {
  fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput,
      about: jobInput,
    }),
  }).then((res) => res.json());
}
export function editAvatarInfo(avatarka) {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarka,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      avatarka = data.avatar;
    })
    .then(
      document
        .querySelector(".profile__image")
        .setAttribute("style", `background-image: url(${avatarka})`)
    );
}
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
export function addLike(id, likeButton) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  });
}
export function deleteLike(id, likeButton) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });
}
