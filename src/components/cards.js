import { config } from "./api";
import { render } from "./index";
// import { likeNum } from "./card";

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((res) => {
      console.log(res);
      const initialCards = Array.from(res);

      render(initialCards);
    })

    .catch((res) => {
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};
export function addNewCard(name, link, likeNum) {
  let userId = "18224dc979a1237fbf3f98ed";
  fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
      likes: likeNum,
    }),
  }).then((res) => res.json());
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
export function likeCard(item, likeButton, id, userId) {
  getInitialCards();

  let numLike = item.likes.length;
  if (numLike == 0) {
    addLikeCard(id);
    likeButton.nextElementSibling.textContent = numLike + 1;
    likeButton.classList.add("card__like-button_is-active");
  } else {
    const arrayLikes = Array.from(item.likes);
    const likes = arrayLikes.map((elem) => ({ _id: elem._id }));
    for (let el in likes) {
      if (likes[el]._id == userId) {
        deleteLikeCard(id);
        //  likeButton.nextElementSibling.textContent = numLike - 1;
        likeButton.classList.remove("card__like-button_is-active");
      } else {
        addLikeCard(id);
        // likeButton.nextElementSibling.textContent = numLike + 1;
        likeButton.classList.add("card__like-button_is-active");
      }
    }
  }

  getInitialCards();
}

export function addLikeCard(id) {
  fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
    
  }).then((response) => {
    return response.json();
  });

  // if (((res.likes[0]._id) !== userId))
}
export function deleteLikeCard(id) {
  fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((response) => {
    return response.json();
  });
}
