import { editProfile } from "./index";
export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-22",
  headers: {
    authorization: "3bdecd97-cc83-4e5e-ac8d-e22694049ffd",
    "Content-Type": "application/json",
  },
};
const handleResponse = (response) => {
  if (response.ok) 
    {return response.json();
     
  }
}


export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    })
    .then(handleResponse) 
}

export function getProfileInfo() {
 return fetch(`${config.baseUrl}/users/me`, { 
    headers: config.headers })
    .then(handleResponse)
   
}

 export function editProfileInfo(nameInput, jobInput) {
  fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput,
      about: jobInput,
    }),
  })
   .then(handleResponse)
  .catch((err) => console.log(err));
}

export function editAvatarInfo(avatarka) {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarka,
    }),
  })
  .then(handleResponse)
    .then((data) => {
      avatarka = data.avatar;
    })
    .then(
      document
        .querySelector(".profile__image")
        .setAttribute("style", `background-image: url(${avatarka})`)
    ) 
    .catch((err) => console.log(err));
}

export function addNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
  .then(handleResponse)
 
}

export function deleteCard(id) {
  fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(handleResponse)
    .catch((err) => console.log(err));
}

export function addLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  });
}

export function deleteLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .catch((err) => console.log(err));
}
