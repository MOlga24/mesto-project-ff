export function openModal(el) {
 
  el.classList.add("popup_is-animated");
  el.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalByKey);
}

export function closeModal(el) {
  // function(evt) {
  //   if (evt.target === document.querySelector(".popup__close")) {
  //     closeModal(evt.target.closest(".popup"));
  // if (el.classList.contains("popup_is-opened"))
el.classList.remove("popup_is-opened");
  debugger;
  document.removeEventListener("keydown", closeModalByKey);

}

// elementsArray.forEach(function (elem) {
//   elem.addEventListener("click", function (evt) {
//     if (evt.currentTarget === evt.target) {
//       document.querySelectorAll(".popup").forEach((modal) => {
//         closeModal(modal);
//       });
//     }
//   });
// });

 function closeModalByKey(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
};
export function closePopupByOverlay(evt) {
  if (evt.currentTarget === evt.target) { 
     closeModal(evt.currentTarget.closest(".popup")); 
}
} 
