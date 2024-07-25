const container = document.querySelector(".places__list");
 const cardTemplate = document.querySelector("#card-template").content;
 let cardImage = cardTemplate.querySelector(".card__image");
//  const cardInfo = initialCards.map(function(item) {
//     return {
//       name: item.name,
//       link: item.link,
//     };
//   });

//   function render() {
//     cardInfo.forEach(createCard);
//   }
 let deleteCard = function (cardDeleteButoon) {
    const listItem = cardDeleteButoon.closest ('.card');
    listItem.remove();
 }

function createCard(item, deleteCard) {
    const cardElement = cardTemplate.cloneNode(true);
    cardImage.setAttribute("alt", "1");
    cardElement.querySelector(".card__image").src = item.link;
    cardElement.querySelector(".card__title").textContent = item.name;
  
    const cardDeleteButoon = cardElement.querySelector(".card__delete-button");
    container.append(cardElement);
  
    cardDeleteButoon.addEventListener('click', function(){deleteCard(cardDeleteButoon);});
    
    
return cardElement;
}
 //function deleteCard() {
    // const listItem = cardDeleteButoon.closest('.places__item');
   //  listItem.remove();}
   initialCards.forEach(function(item) { 
           createCard(item, deleteCard);
    });
    // render();