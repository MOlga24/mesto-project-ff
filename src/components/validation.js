export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    errorSelector: '.popup__error_visible'
  };
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
  export function clearValidation() {

    const elems = document.querySelectorAll(validationConfig.inputSelector);
    elems.forEach(itm => {
    
     itm.classList.remove(validationConfig.inputErrorClass);
   });
   const errorElems =  document.querySelectorAll(validationConfig.errorSelector);
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
  