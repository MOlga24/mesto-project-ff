// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const container = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const popup = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector(".profile__add-button");
const popupForm = popup.querySelector('.popup__form');
const saveButton = popupForm.querySelector('.popup__button');
const popupOpener = document.querySelector('.profile__add-button');
const popupCloser = popup.querySelector('.popup__close');
let initialCardsCopy = initialCards;
// for (let elem of initialCards) {
//   initialCardsCopy.push(elem);
//  }
function createCard(item, removeCard) {
  const cardImage = cardTemplate.querySelector(".card__image");
  cardImage.setAttribute("alt", item.name);
  cardImage.setAttribute("src", item.link);
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__title").textContent = item.name;
  cardElement.querySelector(".card__like-button").addEventListener("click", function (evt) { 
    evt.target.classList.toggle("card__like-button_is-active");
    
   });
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

function render(initialCards) {
container.innerHTML = " ";
  initialCards.forEach(function (item) {
    container.append(createCard(item, removeCard));
  });
}

popupOpener.addEventListener('click', openPopapAndLockScroll);
function openPopapAndLockScroll() {    

  popup.classList.add("popup_is-opened");
  
  popupCloser.addEventListener('click', close);  

  popupForm.addEventListener('submit', addCard);  
  


     
}
function addCard(event) { 
   
  
  const name = popupForm.querySelector(".popup__input_type_card-name").value;
 const link = popupForm.querySelector(".popup__input_type_url").value;

  event.preventDefault();
  initialCardsCopy.push({name, link});



close();

   }
// function returnScroll() {
//   document.body.classList.remove('scroll-lock');
// }

function close() {
 
  popup.classList.remove("popup_is-opened");
  render(initialCardsCopy);

  // returnScroll();
}


  render(initialCards);