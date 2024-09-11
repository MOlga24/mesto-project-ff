import { createCard } from "./card";
import { addNewCard, getCards, deleteCard } from "./api";
import { likeCard } from "./card";
import "../pages/index.css";
import "../images/avatar.jpg";
import { closeModal, openModal, closePopupByOverlay } from "./modal";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./validation";
import { renderLoading } from "./utils";
import { getProfileInfo, editProfileInfo, editAvatarInfo } from "./api";
const modalAdd = document.querySelector(".popup_type_new-card");
const modalAddOpener = document.querySelector(".profile__add-button");
const modalEdit = document.querySelector(".popup_type_edit");
const container = document.querySelector(".places__list");
const modals = document.querySelectorAll(".popup");
const modalEditOpener = document.querySelector(".profile__edit-button");
const modalImage = document.querySelector(".popup_type_image");
const modalCardImg = modalImage.querySelector(".popup__image");
const profileInfo = document.querySelector(".profile__info");
const confirmPopup = document.querySelector(".popup_delete_image");
const profileImageEdit = document.querySelector(".profile__image");
const updateAvatarForm = document.querySelector(".popup_edit_image");
const formEditProfile = document.forms.edit_profile;
const formAddCard = document.forms.new_place;
const formEditAvatar = document.forms.popup_edit_image;
const formDeleteCard = document.forms.delete_card;
const avatarLink = document.querySelector(".ava_link");
const profileName = document.querySelector(".popup__input_type_name");
const profileDesctiption = document.querySelector(
  ".popup__input_type_description"
);
const editCardName = modalAdd.querySelector(".popup__input_type_card-name");
const editCardUrl = modalAdd.querySelector(".popup__input_type_url");
const promises = [getProfileInfo(), getCards()];
const editProfileName = profileInfo.querySelector(".profile__title");
const editProfileDescription = profileInfo.querySelector(
  ".profile__description"
);
let userId;
formEditProfile.addEventListener("submit", handleEditForm);

formAddCard.addEventListener("submit", addCard);

formEditAvatar.addEventListener("submit", function (evt) {
  renderLoading(updateAvatarForm);
  evt.preventDefault();
  const avatarka = avatarLink.value;
  editAvatarInfo(avatarka)
    .then(
      document
        .querySelector(".profile__image")
        .setAttribute("style", `background-image: url(${avatarka})`)
    )
    .then(() => {
      closeModal(updateAvatarForm);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(updateAvatarForm);
    });
});

modals.forEach(function (elem) {
  elem.querySelector(".popup__close").addEventListener("click", function () {
    closeModal(elem);
  });
});

modals.forEach(function (elem) {
  elem.addEventListener("click", closePopupByOverlay);
});
modalAddOpener.addEventListener("click", function () {
  formAddCard.reset();
  clearValidation(validationConfig, formAddCard);
  openModal(modalAdd);
});

modalEditOpener.addEventListener("click", function () {
  clearValidation(validationConfig, formEditProfile);
  profileName.value = editProfileName.textContent;
  profileDesctiption.value = editProfileDescription.textContent;
  openModal(modalEdit);
});
profileImageEdit.addEventListener("click", function () {
  formEditAvatar.reset();
  clearValidation(validationConfig, formEditAvatar);
  openModal(updateAvatarForm);
});

export function openImageModal() {
  openModal(modalImage);
  const captionText = modalImage.querySelector(".popup__caption");
  modalCardImg.src = this.src;
  captionText.textContent = this.alt;
  modalCardImg.alt = this.alt;
}

export function renderInitialCards(initialCards, userId) {
  container.textContent = " ";
  initialCards.forEach(function (item) {
    container.append(
      createCard(item, deleteMyCard, likeCard, openImageModal, userId)
    );
  });
}

export function addCard(event) {
  event.preventDefault();
  renderLoading(modalAdd);
  const name = editCardName.value;
  const link = editCardUrl.value;
  addNewCard(name, link)
    .then((data) => {
      container.prepend(
        createCard(data, deleteMyCard, likeCard, openImageModal, userId)
      );
    })
    .then(() => {
      closeModal(modalAdd);
    })
    .then(() => {
      clearValidation(validationConfig, formAddCard);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading(modalAdd);
    });
}

export function editProfile(nameInput, jobInput) {
  editProfileInfo(nameInput, jobInput)
    .then((data) => {
      editProfileName.textContent = data.name;
      editProfileDescription.textContent = data.about;
      closeModal(modalEdit);
    })

    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading(modalEdit);
    });
}

function handleEditForm(evt) {
  renderLoading(modalEdit);
  const nameInput = formEditProfile.elements.name.value;
  const jobInput = formEditProfile.elements.description.value;
  editProfile(nameInput, jobInput);
  evt.preventDefault();
}

Promise.all(promises)
  .then((data) => {
    document
      .querySelector(".profile__image")
      .setAttribute("style", `background-image: url(${data[0].avatar})`);
    const nameInput = data[0].name;
    const jobInput = data[0].about;
    userId = data[0]._id;
    editProfile(nameInput, jobInput);
    renderLoading(modalEdit);
    const initialCards = Array.from(data[1]);
    renderInitialCards(initialCards, userId);
  })

  .catch((error) => {
    console.error(error);
  });

enableValidation(validationConfig);

export function deleteMyCard(cardElement, id) {
  openModal(confirmPopup);
  formDeleteCard.addEventListener("submit", function (e) {
    e.preventDefault();
    deleteCard(id)
      .then(() => {
        cardElement.remove();
        closeModal(confirmPopup);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
