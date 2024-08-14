import { addCard, modalAdd, modalImage } from "../src/index";
import { render } from "../src/index";
import { initialCardsCopy } from "../src/index";
import { modalEdit } from "../src/index.js";
import {
  modalEditOpener,
  handleFormSubmit,
  modalOpener,
} from "../src/index.js";

export function sortModal(evt) {
  if (evt.target === modalOpener) {
    openModal(modalAdd);
  }
  if (evt.target === modalEditOpener) {
    openModal(modalEdit);
  }
}

document.forms.edit_profile.addEventListener("submit", handleFormSubmit);
document.forms.new_place.addEventListener("submit", addCard);
export function openModal(el) {
  const modalCloser = el.querySelector(".popup__close");
  modalCloser.addEventListener("click", function () {
    closed(el);
  });
  el.classList.add("popup_is-animated");
  el.classList.add("popup_is-opened");
}

export function closed(el) {
  el.classList.remove("popup_is-opened");
  if (el.classList.contains("popup_type_new-card")) {
    render(initialCardsCopy);
  }
}

export function OpenImageModal() {
  modalImage.classList.add("popup_is-opened");
  var modalImg = modalImage.querySelector(".popup__image");
  var captionText = modalImage.querySelector(".popup__caption");
  var span = modalImage.querySelector(".popup__close");
  modalImage.style.display = "flex";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
  span.addEventListener("click", closeImageModal);

  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeImageModal;
      // closed(modalImage);
    }
  });
  modalImage.addEventListener("click", function (evt) {
    if (evt.currentTarget === evt.target) {
      // closed(modalImage);
      closeImageModal;
    }
  });
}

export function closeImageModal() {
  modalImage.classList.remove("popup_is-opened");
}
