import { deleteCard, addLikeCard, deleteLikeCard } from "./cards";
import { confirmPopup } from "./index";
import { openModal, closeModal } from "./modal";
const cardTemplate = document.querySelector("#card-template").content;
export let likeNum = 0;


export function removeCard(deleteButton, id) {
   const listItem = deleteButton.closest(".card");
   deleteCard(id, listItem);
}

export function createCard(item, removeCard, likeCard, openImageModal) {

  let cardImage = cardTemplate.querySelector(".card__image");
  cardImage.setAttribute("alt", item.name);
  cardImage.setAttribute("src", item.link);
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__title").textContent = item.name;
  const id = item._id;
  const userId = '18224dc979a1237fbf3f98ed';
 let likeNum = item.likes.length;
//   if(!item.hasOwnProperty('likes')){item.likes.length = 0}
//   else
// {likeNum = item.likes.length;}

// else {likeNum = item.likes.length}; 
 const likeButton = cardElement.querySelector(".card__like-button");
 const likeSpan = cardElement.querySelector(".like__num");     
  likeSpan.textContent = likeNum; 
  
     
    const deleteButton = cardElement.querySelector(".card__delete-button");
if((item.hasOwnProperty('owner')&&(item.owner._id !== userId)))
    {deleteButton.remove()};
  deleteButton.addEventListener("click", function () {
    openModal(confirmPopup);
    document.forms.delete_card.addEventListener("submit", function()
   {closeModal(confirmPopup);
    removeCard(deleteButton, id);} )
  });
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", openImageModal);
     likeButton.addEventListener("click", function () {
      const arrayLikes = Array.from(item.likes);
      const likes = arrayLikes.map((elem) => ({ _id: elem._id }));
      const likes_ar = Object.values(likes);
      if(likes_ar.find((el) => el._id === userId))
     { 
      deleteLikeCard(id)
      .then((response) => {
        return response.json()
        .then(data =>{likeCard(data, likeButton, id, userId)})
      });
      
    } else{
          addLikeCard(id)
          .then((response) => {
            return response.json()
            .then(data =>{likeCard(data, likeButton, id, userId)})
          });
     
          likeButton.classList.add("card__like-button_is-active");
        }
      
         
           // likeButton.nextElementSibling.textContent = numLike - 1;
        //   likeButton.classList.remove("card__like-button_is-active");
        // }
        
       
      // } 
  
    
  
      // likeCard(item, likeButton, id, userId)
      
    }); 
  return cardElement;
}