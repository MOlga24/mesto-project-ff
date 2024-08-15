import { render } from "./index";
import { initialCardsCopy } from "./index";

let elementsArray = document.querySelectorAll(".popup");

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

elementsArray.forEach(function (elem) {
  elem.addEventListener("click", function (evt) {
    if (evt.currentTarget === evt.target) {
      document.querySelectorAll(".popup").forEach((modal) => {
        closed(modal);
      });
    }
  });
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    document.querySelectorAll(".popup").forEach((modal) => {
      modal.classList.remove("popup_is-opened");
      closed(modal);
    });
  }
});
