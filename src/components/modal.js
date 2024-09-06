export function openModal(el) {
  el.classList.add("popup_is-animated");
  if (
    !el.classList.contains("popup_type_image") &&
    !el.classList.contains("popup_delete_image")
  ) {el.querySelector(".button").classList.add("popup__button_disabled")};
  el.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalByKey);

}

export function closeModal(el) {
  el.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalByKey);
  
}

function closeModalByKey(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

export function closePopupByOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal(evt.currentTarget);
  }
}
