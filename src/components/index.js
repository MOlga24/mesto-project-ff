import { initialCards, likeCard, removeCard } from "./cards";
import "../pages/index.css";
import "../images/avatar.jpg";
import { closed, openModal } from "./modal";
export const modal = document.querySelector(".popup");
export const modalAdd = document.querySelector(".popup_type_new-card");
export const modalOpener = document.querySelector(".profile__add-button");
export const modalEdit = document.querySelector(".popup_type_edit");
const container = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
export const modalEditOpener = document.querySelector(".profile__edit-button");
export let initialCardsCopy = initialCards;
let modalImage = document.querySelector(".popup_type_image");
export const modalImg = modalImage.querySelector(".popup__image");

function createCard(item, removeCard, likeCard, OpenImageModal) {
  const cardImage = cardTemplate.querySelector(".card__image");
  cardImage.setAttribute("alt", item.name);
  cardImage.setAttribute("src", item.link);
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__title").textContent = item.name;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);
  const deleteButoon = cardElement.querySelector(".card__delete-button");
  deleteButoon.addEventListener("click", function () {
    removeCard(deleteButoon);
  });
  const cardImg = cardElement.querySelector(".card__image");
  //const modalImage = document.querySelector(".popup_type_image");
  cardImg.addEventListener("click", OpenImageModal);
  modalImage.classList.add("popup_is-animated");
  return cardElement;
}
document.forms.edit_profile.addEventListener("submit", handleFormSubmit);
document.forms.new_place.addEventListener("submit", addCard);
document.addEventListener("click", sortModal);
function sortModal(evt) {
  if (evt.target === modalOpener) {
    openModal(modalAdd);
  }
  if (evt.target === modalEditOpener) {
    openModal(modalEdit);
  }
}
function OpenImageModal() {
  modalImage.classList.add("popup_is-opened");
  var modalImg = modalImage.querySelector(".popup__image");
  var captionText = modalImage.querySelector(".popup__caption");
  var span = modalImage.querySelector(".popup__close");
  modalImage.style.display = "flex";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
  span.addEventListener("click", function () {
    closed(modalImage);
  });
}
export function render(initialCards) {
  container.innerHTML = " ";
  initialCards.forEach(function (item) {
    container.append(createCard(item, removeCard, likeCard, OpenImageModal));
  });
}

export function addCard(event) {
  const name = modalAdd.querySelector(".popup__input_type_card-name").value;
  const link = modalAdd.querySelector(".popup__input_type_url").value;
  event.preventDefault();
  initialCardsCopy.unshift({ name, link });
  closed(modalAdd);
}

render(initialCards);

function editProfile(nameInput, jobInput) {
  const profileInfo = document.querySelector(".profile__info");
  const editElement = profileInfo.cloneNode(true);
  editElement.querySelector(".profile__title").textContent = nameInput.value;
  editElement.querySelector(".profile__description").textContent =
    jobInput.value;
  const modalEditOpener = editElement.querySelector(".profile__edit-button");
  modalEditOpener.addEventListener("click", function () {
    openModal(modalEdit);
  });
  profileInfo.replaceWith(editElement);
  document.forms.edit_profile.reset();
}

export function handleFormSubmit(evt) {
  const nameInput = document.forms.edit_profile.elements.name;
  const jobInput = document.forms.edit_profile.elements.description;
  editProfile(nameInput, jobInput);

  evt.preventDefault();

  closed(modalEdit);
}
