import { removeCard, createCard } from "./card";
import { likeCard, getInitialCards, addNewCard } from "./cards";
import "../pages/index.css";
import "../images/avatar.jpg";
import { closeModal, openModal, closePopupByOverlay } from "./modal";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./validation";
import { getProfileInfo, editProfileInfo } from "./api";
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

document.forms.edit_profile.addEventListener("submit", handleEditForm);

document.forms.new_place.addEventListener("submit", addCard);

document.addEventListener("click", onModalOpenCLick);

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
    openModal(modalAdd);
  }
  if (evt.target === modalEditOpener) {
    clearValidation();
    document.querySelector(".popup__input_type_name").value =
      profileInfo.querySelector(".profile__title").textContent;
    document.querySelector(".popup__input_type_description").value =
      profileInfo.querySelector(".profile__description").textContent;

    openModal(modalEdit);
  }
}

function openImageModal() {
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

export function addCard(event) {
  const name = modalAdd.querySelector(".popup__input_type_card-name").value;
  const link = modalAdd.querySelector(".popup__input_type_url").value;
  let likes = "";
//  let owner_id = '18224dc979a1237fbf3f98ed';
  

  event.preventDefault();
  addNewCard(name, link, likes) ;
 
  const newCard = createCard(
    { name, link, likes},
    removeCard,
    likeCard,
    openImageModal
  );
  container.prepend(newCard);
  closeModal(modalAdd);
}

getInitialCards();

getProfileInfo();

export function editProfile(nameInput, jobInput) {
  profileInfo.querySelector(".profile__title").textContent = nameInput;
  profileInfo.querySelector(".profile__description").textContent = jobInput;
  editProfileInfo(nameInput, jobInput);
}

function handleEditForm(evt) {
  const nameInput = document.forms.edit_profile.elements.name.value;
  const jobInput = document.forms.edit_profile.elements.description.value;
  editProfile(nameInput, jobInput);

  evt.preventDefault();
  closeModal(modalEdit);
}

enableValidation(validationConfig);
