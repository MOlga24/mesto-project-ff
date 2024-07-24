// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const container = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
function createCard(item, removeCard) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__title").textContent = item.name;
  deleteButton = cardElement.querySelectorAll(".card__delete-button");
  deleteButton.forEach((elem) => {
    elem.addEventListener("click", removeCard);
  });
  container.append(cardElement);
  return cardElement;
}
function removeCard() {
  let listItem = this.closest(".card");
  listItem.remove();
}
function render() {
  initialCards.forEach(function (item) {
    createCard(item, removeCard);
  });
}
render();
