import { deleteCard, addLike, deleteLike } from "./api";
import { confirmPopup } from "./index";
import { openModal, closeModal } from "./modal";
const cardTemplate = document.querySelector("#card-template").content;


export function createCard(item, removeCard, likeCard, openImageModal) {
  let cardImage = cardTemplate.querySelector(".card__image");
  cardImage.setAttribute("alt", item.name);
  cardImage.setAttribute("src", item.link);
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__title").textContent = item.name;
  const id = item._id;
  const userId = "18224dc979a1237fbf3f98ed";
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeSpan = cardElement.querySelector(".like__num");
  likeSpan.textContent = item.likes.length;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (item.hasOwnProperty("owner") && item.owner._id !== userId) {
    deleteButton.remove();
  }
  deleteButton.addEventListener("click", function () {
    openModal(confirmPopup);
    document.forms.delete_card.addEventListener("submit", function () {
      closeModal(confirmPopup);
      removeCard(deleteButton, id);
    });
  });
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", openImageModal);
  likeButton.addEventListener("click", function () {
    hasLike(item);
    if (hasLike(item)) {
      deleteLike(item._id, likeButton)
        .then((response) => response.json())
        .then((data) => {
          item.likes = data.likes;
          likeCard(data.likes, likeButton);
        });
      likeButton.classList.remove("card__like-button_is-active");
    } else {
      addLike(item._id, likeButton)
        .then((response) => response.json())
        .then((data) => {
          item.likes = data.likes;
          likeCard(data.likes, likeButton);
        });
      likeButton.classList.add("card__like-button_is-active");
    }
  });
  return cardElement;
}

export function removeCard(deleteButton, id) {
  const listItem = deleteButton.closest(".card");
  deleteCard(id, listItem);

}

export function likeCard(item, likeButton) {
  likeButton.nextElementSibling.textContent = item.length;

}

function hasLike(item) {
  const userId = "18224dc979a1237fbf3f98ed";
  const arrayLikes = Array.from(item.likes);
  const likes = arrayLikes.map((elem) => ({ _id: elem._id }));
  if (likes.find((el) => el._id === userId)) 
  return true;

}
