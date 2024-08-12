// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import { initialCards } from "../scripts/cards";

import "../pages/index.css"; // добавьте импорт главного файла стилей
import "../images/avatar.jpg";
// import { addLocale } from "core-js";

const container = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const popup = document.querySelector(".popup_type_new-card");
const formElement = document.forms.edit_profile;
const popupEdit = document.querySelector(".popup_type_edit");
const popupEditCloser = popupEdit.querySelector(".popup__close");
//const addButton = document.querySelector(".profile__add-button");
//const editSaveButton = formElement.querySelector(".popup__button");
const popupForm = popup.querySelector(".popup__form");
//const profileInfo = document.querySelector(".profile__info");
//const saveButton = popupForm.querySelector(".popup__button");
const popupOpener = document.querySelector(".profile__add-button");
const popupCloser = popup.querySelector(".popup__close");
const popupEditOpener = document.querySelector(".profile__edit-button");
let initialCardsCopy = initialCards;
// for (let elem of initialCards) {
//   initialCardsCopy.push(elem);
//  }
function createCard(item, removeCard, likeCard, OpenImagePopup) {
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
cardImg.addEventListener("click", OpenImagePopup);
  // const cardImg = cardElement.querySelector('img');
  // cardImage.addEventListener("click", OpenImagePopup(cardImg));
   return cardElement;
}


function OpenImagePopup(){ 
 
  var modal = document.querySelector('.popup_type_image');
  // modal.classList.add(".places__item");
var modalImg = modal.querySelector(".popup__image");
var captionText = modal.querySelector(".popup__caption");
var span = modal.querySelector(".popup__close");
  modal.style.display = "flex";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
  span.addEventListener("click",   function() { 
    modal.style.display = "none";
});
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") 
  {modal.style.display = "none";};
});
modal.addEventListener("click", function (evt) {
if (evt.currentTarget === evt.target){modal.style.display = "none";};});
}
function likeCard()
{evt.target.classList.toggle("card__like-button_is-active");};
function removeCard(deleteButoon) {
  const listItem = deleteButoon.closest(".card");
  listItem.remove();
}

function render(initialCards) {
  container.innerHTML = " ";
  initialCards.forEach(function (item) {
    container.append(createCard(item, removeCard, likeCard, OpenImagePopup));
    
  });
  
}
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    document.querySelectorAll(".popup").forEach((popup) => {
      if (popup.classList.contains("popup_is-opened"))
        popup.classList.remove("popup_is-opened");
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

popupOpener.addEventListener("click", openPopapAndLockScroll);
popupEditOpener.addEventListener("click", openPopapEdit);
popupEditCloser.addEventListener("click", closeEdit);
function openPopapAndLockScroll() {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  popupCloser.addEventListener("click", close);
  popupForm.addEventListener("submit", addCard);
}
let elementsArray = document.querySelectorAll(".popup");
popupEditOpener.addEventListener("click", openPopapEdit);
elementsArray.forEach(function (elem) {
   elem.addEventListener("click", function (evt) {
    if (evt.currentTarget === evt.target) {
      document.querySelectorAll(".popup").forEach((popup) => {
       
         if (popup.classList.contains("popup_is-opened"))
          popup.classList.remove("popup_is-opened");
      });
    }
   
  });
});
function openPopapEdit() {
  popupEditOpener.addEventListener("click", openPopapEdit);
  popupEdit.classList.add("popup_is-animated");
  popupEdit.classList.add("popup_is-opened");

  formElement.addEventListener("submit", handleFormSubmit);
  
}

function addCard(event) {
  const name = popupForm.querySelector(".popup__input_type_card-name").value;
  const link = popupForm.querySelector(".popup__input_type_url").value;

  event.preventDefault();
  initialCardsCopy.unshift({ name, link });

  close();
}
// function returnScroll() {
//   document.body.classList.remove('scroll-lock');
// }
function closeEdit() {
  popupEdit.classList.remove("popup_is-opened");
 
  // returnScroll();
}

function close() {
  popup.classList.remove("popup_is-opened");
  render(initialCardsCopy);

  // returnScroll();
}

render(initialCards);


// formElement.addEventListener("submit", handleFormSubmit);

function editProfile(nameInput, jobInput) { 
  const profileInfo = document.querySelector(".profile__info");
   const editElement = profileInfo.cloneNode(true);
   
  editElement.querySelector(".profile__title").textContent = nameInput.value;
 editElement.querySelector(".profile__description").textContent = jobInput.value;

   profileInfo.replaceWith(editElement);
  
   const popupEditOpener = document.querySelector(".profile__edit-button");
   popupEditOpener.addEventListener("click", openPopapEdit);
   formElement.reset();
   closeEdit();
  
}
//  function setSubmitButtonState(isFormValid) {if (isFormValid) {
//   editSaveButton.removeAttribute('disabled');
//   editSaveButton.classList.remove('input__btn_disabled');}
//   else {editSaveButton.setAttribute('disabled', true);
//     editSaveButton.classList.add('input__btn_disabled');}};
function handleFormSubmit(evt) { 
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
