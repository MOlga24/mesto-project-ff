// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import { initialCards } from "../scripts/cards";
import {likeCard, removeCard} from "../scripts/cards";
import "../pages/index.css"; 
import "../images/avatar.jpg";
import { openModal, closeModal, closeModalEdit, openModalEdit, OpenImageModal, closeImageModal } from "../scripts/modal";
export const modal = document.querySelector(".popup_type_new-card");
export const modalOpener = document.querySelector(".profile__add-button");
export const modalCloser = modal.querySelector(".popup__close");
export const modalForm = modal.querySelector(".popup__form");
export const formElement = document.forms.edit_profile;
export const modalEdit = document.querySelector(".popup_type_edit");
const container = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
export const modalEditOpener = document.querySelector(".profile__edit-button");
export let  initialCardsCopy = initialCards;
const modalEditCloser = modalEdit.querySelector(".popup__close");
let elementsArray = document.querySelectorAll(".popup");
export var modalImage = document.querySelector('.popup_type_image');
function createCard(item, removeCard, likeCard, OpenImageModal) {
  const cardImage = cardTemplate.querySelector(".card__image");
  cardImage.setAttribute("alt", item.name);
  cardImage.setAttribute("src", item.link);
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__title").textContent = item.name;
  cardElement.querySelector(".card__like-button").addEventListener("click", likeCard);
  // cardElement
  //   .querySelector(".card__like-button")
  //   .addEventListener("click", function (evt) {
  //     evt.target.classList.toggle("card__like-button_is-active");
  //   });
  const deleteButoon = cardElement.querySelector(".card__delete-button");
  deleteButoon.addEventListener("click", function () {
  removeCard(deleteButoon);
  });

const cardImg = cardElement.querySelector(".card__image");
var modalImage = document.querySelector('.popup_type_image');
cardImg.addEventListener("click", OpenImageModal);
modalImage.classList.add("popup_is-animated");
   return cardElement;
}

var modalImage = document.querySelector('.popup_type_image');


// function likeCard()
// {evt.target.classList.toggle("card__like-button_is-active");};
// function removeCard(deleteButoon) {
//   const listItem = deleteButoon.closest(".card");
//   listItem.remove();
// }

export function render(initialCards) {
  container.innerHTML = " ";
  initialCards.forEach(function (item) {
    container.append(createCard(item, removeCard, likeCard, OpenImageModal));
    
  });
  
}
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    document.querySelectorAll(".popup").forEach((modal) => {
      if (modal.classList.contains("popup_is-opened"))
        modal.classList.remove("popup_is-opened");
    });
  }
});

// function close_mod(evt){

//   if (evt.currentTarget === evt.target) {
//     document.querySelectorAll(".popup").forEach((popup) => {
//       if ((popup).classList.contains("popup_is-opened"))
//         (popup).classList.remove("popup_is-opened");
//     });
//   }
// }

modalOpener.addEventListener("click", openModal);
modalEditOpener.addEventListener("click", openModalEdit);
modalEditCloser.addEventListener("click", closeModalEdit);
// function openModal() {
//   popup.classList.add("popup_is-animated");
//   popup.classList.add("popup_is-opened");
//   popupCloser.addEventListener("click", close);
//   popupForm.addEventListener("submit", addCard);
// }

modalEditOpener.addEventListener("click", openModalEdit);

elementsArray.forEach(function (elem) {
   elem.addEventListener("click", function (evt) {
 
    if (evt.currentTarget === evt.target) {
      document.querySelectorAll(".popup").forEach((modal) => {
       
         if (modal.classList.contains("popup_is-opened"))
          modal.classList.remove("popup_is-opened");
      });
    }
   
  });
});

// modalCloser.addEventListener("click", closeModal);
  export function addCard(event) {
  const name = modal.querySelector(".popup__input_type_card-name").value;
  const link = modal.querySelector(".popup__input_type_url").value;
  event.preventDefault();
  initialCardsCopy.unshift({ name, link });
  closeModal();
  
}

render(initialCards);

function editProfile(nameInput, jobInput) { 
  const profileInfo = document.querySelector(".profile__info");
   const editElement = profileInfo.cloneNode(true);
   
  editElement.querySelector(".profile__title").textContent = nameInput.value;
 editElement.querySelector(".profile__description").textContent = jobInput.value;

   profileInfo.replaceWith(editElement);
  
   const modalEditOpener = document.querySelector(".profile__edit-button");
   modalEditOpener.addEventListener("click", openModalEdit);
   formElement.reset();
   closeModalEdit();
  
}
//  function setSubmitButtonState(isFormValid) {if (isFormValid) {
//   editSaveButton.removeAttribute('disabled');
//   editSaveButton.classList.remove('input__btn_disabled');}
//   else {editSaveButton.setAttribute('disabled', true);
//     editSaveButton.classList.add('input__btn_disabled');}};
export function handleFormSubmit(evt) { 
  const nameInput = formElement.elements.name;
  const jobInput = formElement.elements.description;
   editProfile(nameInput, jobInput);
  // formElement.reset();
  evt.preventDefault();
  //setSubmitButtonState(false);
}
// formElement.addEventListener("input", function () {
//   const isValid = nameInput.value.length > 0 && jobInput.value.length > 0;
//   setSubmitButtonState(isValid);
// });
// export function closeModal() {
//   modal.classList.remove("popup_is-opened");
//   render(initialCardsCopy);
// };