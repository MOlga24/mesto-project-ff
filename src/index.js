import { initialCards } from "../scripts/cards";
import { likeCard, removeCard } from "../scripts/cards";
import "../pages/index.css";
import "../images/avatar.jpg";
import {
  sortModal,
  closed,
  OpenImageModal,
  closeImageModal,
  openModal,
} from "../scripts/modal";
export const modal = document.querySelector(".popup");
export const modalAdd = document.querySelector(".popup_type_new-card");
export const modalOpener = document.querySelector(".profile__add-button");
export const modalEdit = document.querySelector(".popup_type_edit");
const container = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
export const modalEditOpener = document.querySelector(".profile__edit-button");
export let initialCardsCopy = initialCards;
export const modalImage = document.querySelector(".popup_type_image");
export const modalImg = modalImage.querySelector(".popup__image");

let elementsArray = document.querySelectorAll(".popup");

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
  const modalImage = document.querySelector(".popup_type_image");
  cardImg.addEventListener("click", OpenImageModal);
  modalImage.classList.add("popup_is-animated");
  return cardElement;
}
document.addEventListener("click", sortModal);

export function render(initialCards) {
  container.innerHTML = " ";
  initialCards.forEach(function (item) {
    container.append(createCard(item, removeCard, likeCard, OpenImageModal));
  });
}
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    document.querySelectorAll(".popup").forEach((modal) => {
      //  if (modal.classList.contains("popup_is-opened"))
      //     modal.classList.remove("popup_is-opened");
      closed(modal);
    });
  }
});

elementsArray.forEach(function (elem) {
  elem.addEventListener("click", function (evt) {
    if (evt.currentTarget === evt.target) {
      document.querySelectorAll(".popup").forEach((modal) => {
        closed(modal);
      });
    }
  });
});

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
