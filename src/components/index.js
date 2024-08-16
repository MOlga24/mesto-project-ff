import { initialCards, likeCard, removeCard, createCard } from "./cards";
import "../pages/index.css";
import "../images/avatar.jpg";
import { closeModal, openModal, closePopupByOverlay } from "./modal";

export const modalAdd = document.querySelector(".popup_type_new-card");
export const modalOpener = document.querySelector(".profile__add-button");
export const modalEdit = document.querySelector(".popup_type_edit");
const container = document.querySelector(".places__list");
export let modal = document.querySelectorAll(".popup");
export const modalEditOpener = document.querySelector(".profile__edit-button");
export let initialCardsCopy = initialCards;
const modalImage = document.querySelector(".popup_type_image");
const modalCardImg = modalImage.querySelector(".popup__image");



document.forms.edit_profile.addEventListener("submit", handleEditForm);
document.forms.new_place.addEventListener("submit", addCard);
document.addEventListener("click", onModalOpenCLick);
document.addEventListener("click", function(evt) {
  if (evt.target === document.querySelector(".popup__close")) {
    closeModal(evt.target.closest(".popup"));
  }
});

// document.addEventListener("click", function(evt) {
//   if (evt.target === document.querySelector(".popup__close")) {
//     closeModal(evt.target.closest(".popup"));
//   }
// });
modal.forEach(function(elem){elem.querySelector(".popup__close").addEventListener("click", function(){closeModal(elem)})});

modal.forEach(function(elem){elem.addEventListener("click", closePopupByOverlay)});

// imageClose.addEventListener("click", function () {
//   closeModal(modalImage);
// });


function onModalOpenCLick(evt) {
  if (evt.target === modalOpener) {
    openModal(modalAdd);
  }
  if (evt.target === modalEditOpener) {
    openModal(modalEdit);
  }
};
// modalCloser.forEach(function (elem){elem.addEventListener("click", closeModal(elem.closest(".popup")))}); 
function openImageModal() {
  modalImage.classList.add("popup_is-opened");
  modalImage.classList.add("popup_is-animated");
  let captionText = modalImage.querySelector(".popup__caption");
  modalCardImg.src = this.src;
  captionText.textContent = this.alt;
  
};
export function render(initialCards) {
  container.textContent = " ";
  initialCards.forEach(function (item) {
    container.append(createCard(item, removeCard, likeCard, openImageModal));
  });
};

export function addCard(event) {
  const name = modalAdd.querySelector(".popup__input_type_card-name").value;
  const link = modalAdd.querySelector(".popup__input_type_url").value;
  event.preventDefault();
 const newCard = createCard({ name, link }, removeCard, likeCard, openImageModal);
 container.insertBefore(newCard, container.firstChild);
 closeModal(modalAdd);
 document.forms.new_place.reset();
};
const profileInfo = document.querySelector(".profile__info");
render(initialCards);

function editProfile(nameInput, jobInput) {
  profileInfo.querySelector(".profile__title").textContent = nameInput.value;
  profileInfo.querySelector(".profile__description").textContent =
    jobInput.value;
     
};
document.forms.edit_profile.reset();

 document.querySelector('.popup__input_type_name').placeholder = profileInfo.querySelector(".profile__title").textContent;
 document.querySelector('.popup__input_type_description').placeholder = profileInfo.querySelector(".profile__description").textContent;
export function handleEditForm(evt) {
  const nameInput = document.forms.edit_profile.elements.name;
  const jobInput = document.forms.edit_profile.elements.description;

 
  editProfile(nameInput, jobInput);
  evt.preventDefault();
  closeModal(modalEdit);
};
