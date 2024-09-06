import { removeCard, createCard } from "./card";
import { addNewCard, initialCards } from "./api";
import { likeCard } from "./card";
import "../pages/index.css";
import "../images/avatar.jpg";
import { closeModal, openModal, closePopupByOverlay } from "./modal";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./validation";
import { getProfileInfo, editProfileInfo, editAvatarInfo } from "./api";
export const modalAdd = document.querySelector(".popup_type_new-card");
export const modalOpener = document.querySelector(".profile__add-button");
export const modalEdit = document.querySelector(".popup_type_edit");
const container = document.querySelector(".places__list");
export const modals = document.querySelectorAll(".popup");
export const modalEditOpener = document.querySelector(".profile__edit-button");
const modalImage = document.querySelector(".popup_type_image");
const modalCardImg = modalImage.querySelector(".popup__image");
const profileInfo = document.querySelector(".profile__info");
export const confirmPopup = document.querySelector(".popup_delete_image");
const profileImageEdit = document.querySelector(".profile__image");
const updateAvatarForm = document.querySelector(".popup_edit_image");

getProfileInfo();

document.forms.edit_profile.addEventListener("submit", handleEditForm);

document.forms.new_place.addEventListener("submit", addCard);

document.addEventListener("click", onModalOpenCLick);

profileImageEdit.addEventListener("click", function () {
  document.forms.popup_edit_image.reset();
  updateAvatarForm.querySelector(".button").textContent = "Сохранить";
  openModal(updateAvatarForm);
});

document.forms.popup_edit_image.addEventListener("submit", function () {
  updateAvatarForm.querySelector(".button").textContent = "Сохранение...";
  const avatarka = document.querySelector(".ava_link").value;
  editAvatarInfo(avatarka);
  closeModal(updateAvatarForm);
});

modals.forEach(function (elem) {
  elem.querySelector(".popup__close").addEventListener("click", function () {
  closeModal(elem);
  });
});

modals.forEach(function (elem) {
  elem.addEventListener("click", closePopupByOverlay);
});

function onModalOpenCLick(evt) {
  if (evt.target === modalOpener) {
    document.forms.new_place.reset();
    clearValidation();
    modalAdd.querySelector(".button").textContent = "Сохранить";
    openModal(modalAdd);
  }
  if (evt.target === modalEditOpener) {
    clearValidation();
    document.querySelector(".popup__input_type_name").value =
      profileInfo.querySelector(".profile__title").textContent;
    document.querySelector(".popup__input_type_description").value =
      profileInfo.querySelector(".profile__description").textContent;
    modalEdit.querySelector(".button").textContent = "Сохранить";
    openModal(modalEdit);
  }
}

export function openImageModal() {
  openModal(modalImage);
  const captionText = modalImage.querySelector(".popup__caption");
  modalCardImg.src = this.src;
  captionText.textContent = this.alt;
}

export function render(initialCards) {
  container.textContent = " ";
  initialCards.forEach(function (item) {
    container.append(createCard(item, removeCard, likeCard, openImageModal));
  });
}

export function addCard() {
  this.querySelector(".button").textContent = "Сохранение...";
  const name = modalAdd.querySelector(".popup__input_type_card-name").value;
  const link = modalAdd.querySelector(".popup__input_type_url").value;
  event.preventDefault();
  addNewCard(name, link)
    .then((response) => response.json())
    .then((data) =>
      container.prepend(createCard(data, removeCard, likeCard, openImageModal))
    );
  closeModal(modalAdd);
}

export function editProfile(nameInput, jobInput) {
  profileInfo.querySelector(".profile__title").textContent = nameInput;
  profileInfo.querySelector(".profile__description").textContent = jobInput;
  editProfileInfo(nameInput, jobInput);
}

function handleEditForm(evt) {
  this.querySelector(".button").textContent = "Сохранение...";
  const nameInput = document.forms.edit_profile.elements.name.value;
  const jobInput = document.forms.edit_profile.elements.description.value;
  editProfile(nameInput, jobInput);
  evt.preventDefault();
  closeModal(modalEdit);
  document.forms.edit_profile.reset();
  this.querySelector(".button").classList.add(".popup__button_disabled");
}
render(initialCards);
enableValidation(validationConfig);
