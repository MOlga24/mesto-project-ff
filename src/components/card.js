const cardTemplate = document.querySelector("#card-template").content;

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

export function removeCard(deleteButoon) {
  const listItem = deleteButoon.closest(".card");
  listItem.remove();
}

export function createCard(item, removeCard, likeCard, openImageModal) {
  let cardImage = cardTemplate.querySelector(".card__image");
  cardImage.setAttribute("alt", item.name);
  cardImage.setAttribute("src", item.link);
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__title").textContent = item.name;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCard);
  const deleteButoon = cardElement.querySelector(".card__delete-button");
  deleteButoon.addEventListener("click", function () {
    removeCard(deleteButoon);
  });
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", openImageModal);
  return cardElement;
}