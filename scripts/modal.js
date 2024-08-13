
import { addCard } from "../src/index";
import { render } from "../src/index";
import { initialCardsCopy } from "../src/index";
import { modalEdit } from "../src/index.js";
import { modal, modalCloser, modalForm, modalEditOpener, formElement, handleFormSubmit, modalImage } from "../src/index.js";

export function openModal() {
  modal.classList.add("popup_is-animated");
  modal.classList.add("popup_is-opened");
  modalCloser.addEventListener("click", closeModal);
  modalForm.addEventListener("submit", addCard);
  }
export function closeModal() {
  modal.classList.remove("popup_is-opened");
  render(initialCardsCopy);
};
export function openModalEdit() {
  modalEditOpener.addEventListener("click", openModalEdit);
  modalEdit.classList.add("popup_is-animated");
  modalEdit.classList.add("popup_is-opened");
  formElement.addEventListener("submit", handleFormSubmit);
  
}
export function closeModalEdit() {
  modalEdit.classList.remove("popup_is-opened");
}
export function OpenImageModal(){ 
  modalImage.classList.add("popup_is-opened");
  var modalImg = modalImage.querySelector(".popup__image");
  var captionText = modalImage.querySelector(".popup__caption");
  var span = modalImage.querySelector(".popup__close");
  modalImage.style.display = "flex";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
    span.addEventListener("click",  closeImageModal);
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") 
    {closeImageModal};
  });
  modalImage.addEventListener("click", function (evt) {
  if (evt.currentTarget === evt.target){closeImageModal};});
  
  }
  
export function closeImageModal(){  
  modalImage.classList.remove("popup_is-opened");};