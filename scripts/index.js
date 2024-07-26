// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const container = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(item, removeCard) {
  const cardImage = cardTemplate.querySelector(".card__image");
  cardImage.setAttribute("alt", item.name);
  cardImage.setAttribute("src", item.link);
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__title").textContent = item.name;
  const deleteButoon = cardElement.querySelector(".card__delete-button");
  deleteButoon.addEventListener("click", function () {
    removeCard(deleteButoon);
  });
  return cardElement;
}

function removeCard(deleteButoon) {
  const listItem = deleteButoon.closest(".card");
  listItem.remove();
}

function render() {
  initialCards.forEach(function (item) {
    container.append(createCard(item, removeCard));
  });
}
render();
