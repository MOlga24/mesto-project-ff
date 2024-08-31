import {deleteCard} from "./cards"
const cardTemplate = document.querySelector("#card-template").content;
export let likeNum = 0;


export function removeCard(deleteButton, id) {
  const listItem = deleteButton.closest(".card");
 
  deleteCard(id, listItem);
}

export function createCard(item, removeCard, likeCard, openImageModal) {
  let cardImage = cardTemplate.querySelector(".card__image");
  cardImage.setAttribute("alt", item.name);
  cardImage.setAttribute("src", item.link);
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__title").textContent = item.name;
  const id = item._id;
if (item.likes.length < 1) {likeNum = 0}
else {likeNum = item.likes.length};
const likeButton = cardElement.querySelector(".card__like-button");
 const likeSpan = cardElement.querySelector(".like__num");
    likeButton.addEventListener("click", function () {likeCard(likeButton, likeSpan, item._id)});
     cardElement.querySelector(".like__num").textContent = likeNum; 
    
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    removeCard(deleteButton, item._id);
  });
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", openImageModal);
  return cardElement;
}