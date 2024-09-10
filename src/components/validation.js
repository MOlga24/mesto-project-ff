export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  errorSelector: ".popup__error_visible",
};
export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    // const fieldsetList = Array.from(
    //   formElement.querySelectorAll(validationConfig.formSelector)
    // );
    // fieldsetList.forEach((fieldSet) => {
    //   setEventListeners(fieldSet, validationConfig);
    // });
    setEventListeners(formElement, validationConfig);
  });
}
export function clearValidation(validationConfig, formName) {
  const elems = formName.querySelectorAll(validationConfig.inputSelector);
  elems.forEach((itm) => {
    itm.classList.remove(validationConfig.inputErrorClass);
  });
  const errorElems = formName.querySelectorAll(validationConfig.errorSelector);
  errorElems.forEach((itm) => {
    itm.textContent = "";
    itm.classList.remove(validationConfig.errorClass);
  });
 
}
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      toggleButtonState(inputList, buttonElement, validationConfig);
      checkInputValidity(formElement, inputElement);
    });
  });
};
const showError = (formElement, inputElement, validationConfig, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};
const hideError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  inputElement.setCustomValidity("");
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, validationConfig, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement, validationConfig);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);    
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};
