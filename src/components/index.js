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
  event.preventDefault();
  const newCard = createCard(
    { name, link },
    removeCard,
    likeCard,
    openImageModal
  );
  container.prepend(newCard);
  
  closeModal(modalAdd);
  

  
  }
 
render(initialCards);

function editProfile(nameInput, jobInput) {

  profileInfo.querySelector(".profile__title").textContent = nameInput.value;
  profileInfo.querySelector(".profile__description").textContent =
    jobInput.value;
   
};

 function handleEditForm(evt) {
 
  const nameInput = document.forms.edit_profile.elements.name;
  const jobInput = document.forms.edit_profile.elements.description;
 
  editProfile(nameInput, jobInput); 
 
  evt.preventDefault();
  closeModal(modalEdit);
}
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
export function clearValidation() {

 const elems = document.querySelectorAll(validationConfig.inputSelector);
 elems.forEach(itm => {
 
  itm.classList.remove(validationConfig.inputErrorClass);
});
const errorElems = document.querySelectorAll('.popup__error_visible');
errorElems.forEach(itm => {
  itm.textContent = '';
  itm.classList.remove(validationConfig.errorClass);
});

}


const setEventListeners = (formElement) => {
 
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
       inputElement.addEventListener('input', () => {
        toggleButtonState(inputList, buttonElement);
       isValid(formElement, inputElement);
       
    });
  });
};
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};
const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove( validationConfig.errorClass);
  errorElement.textContent ='';

};

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    
inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
inputElement.setCustomValidity("");
}

  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
    
  } else {
    hideError(formElement, inputElement);
  }
};
const hasInvalidInput = (inputList) =>{
  return inputList.some((inputElement) => {
      
      return !inputElement.validity.valid;
    })
  };


const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else {buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

export function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
      
    });
    const fieldsetList =Array.from(formElement.querySelectorAll(validationConfig.formSelector));
    fieldsetList.forEach((fieldSet) => {
    setEventListeners(fieldSet);
  });
    });


};
enableValidation(validationConfig);


