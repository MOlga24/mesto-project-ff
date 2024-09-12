import { addLike, deleteLike } from "./api";
const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  item,
  deleteMyCard,
  likeCard,
  openImageModal,
  userId
) {
  const cardImage = cardTemplate.querySelector(".card__image");
  cardImage.setAttribute("alt", item.name);
  cardImage.setAttribute("src", item.link);
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__title").textContent = item.name;
  const id = item._id;
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeSpan = cardElement.querySelector(".like__num");

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (item.owner._id !== userId) {
    deleteButton.remove();
  }

  deleteButton.addEventListener("click", function () {
    deleteMyCard(cardElement, id);
  });
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", openImageModal);
  if (hasLike(item, userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeSpan.textContent = item.likes.length;
  likeButton.addEventListener("click", function () {
    likeCard(item, likeButton, userId, likeSpan);
  });

  return cardElement;
}
export function deleteCard(cardElement) {
  cardElement.remove();
}
export function likeCard(item, likeButton, userId, likeSpan) {
  if (hasLike(item, userId)) {
    deleteLike(item._id)
      .then((data) => {
        item.likes = data.likes;
        likeSpan.textContent = data.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  } else {
    addLike(item._id)
      .then((data) => {
        item.likes = data.likes;
        likeSpan.textContent = data.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  }
  return item.likes;
}

function hasLike(item, userId) {
  const arrayLikes = Array.from(item.likes);
  const likes = arrayLikes.map((elem) => ({ _id: elem._id }));
  if (likes.find((el) => el._id === userId)) return true;
}
