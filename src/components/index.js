import { likeCard, removeCard, createCard } from "./card";
import { initialCards } from "./cards";
import "../pages/index.css";
import "../images/avatar.jpg";
import { closeModal, openModal, closePopupByOverlay } from "./modal";

export const modalAdd = document.querySelector(".popup_type_new-card");
export const modalOpener = document.querySelector(".profile__add-button");
export const modalEdit = document.querySelector(".popup_type_edit");
const container = document.querySelector(".places__list");
export const modals = document.querySelectorAll(".popup");
export const modalEditOpener = document.querySelector(".profile__edit-button");
const modalImage = document.querySelector(".popup_type_image");
const modalCardImg = modalImage.querySelector(".popup__image");
const profileInfo = document.querySelector(".profile__info");

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
    openModal(modalAdd);
  }
  if (evt.target === modalEditOpener) {
    document.querySelector(".popup__input_type_name").placeholder =
      profileInfo.querySelector(".profile__title").textContent;
    document.querySelector(".popup__input_type_description").placeholder =
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
  event.preventDefault();
  const newCard = createCard(
    { name, link },
    removeCard,
    likeCard,
    openImageModal
  );
  container.prepend(newCard);
  closeModal(modalAdd);
  document.forms.new_place.reset();
}

render(initialCards);

function editProfile(nameInput, jobInput) {
  profileInfo.querySelector(".profile__title").textContent = nameInput.value;
  profileInfo.querySelector(".profile__description").textContent =
    jobInput.value;
}
document.forms.edit_profile.reset();
export function handleEditForm(evt) {
  const nameInput = document.forms.edit_profile.elements.name;
  const jobInput = document.forms.edit_profile.elements.description;
  editProfile(nameInput, jobInput);
  evt.preventDefault();
  closeModal(modalEdit);
}
