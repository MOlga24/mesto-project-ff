import { deleteCard, getInitialCards } from "./cards";
import { confirmPopup } from "./index";
import { openModal, closeModal } from "./modal";
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
  //const id = item._id;
  const userId = '18224dc979a1237fbf3f98ed';

let likeNum = item.likes.length;

// else {likeNum = item.likes.length}; 
const likeButton = cardElement.querySelector(".card__like-button");
 const likeSpan = cardElement.querySelector(".like__num");
  likeSpan.textContent = likeNum; 
    likeButton.addEventListener("click", function () {
   
      likeCard(item, likeButton, item._id, userId); }  );
     
    const deleteButton = cardElement.querySelector(".card__delete-button");
if((item.hasOwnProperty('owner')&&(item.owner._id !== userId)))
    {deleteButton.remove()};
  deleteButton.addEventListener("click", function () {
    openModal(confirmPopup);
    document.forms.delete_card.addEventListener("submit", function()
   { closeModal(confirmPopup);
     removeCard(deleteButton, item._id);} )
  });
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", openImageModal);
  return cardElement;
}