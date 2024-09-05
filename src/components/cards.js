import { config } from "./api";
import { render, } from "./index";
import { openImageModal} from "./index";
import {  createCard,removeCard} from "./card";
export const firstPromise = await fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
   });
   const data = await firstPromise.json();
    export const initialCards = Array.from(data);

 


export function addNewCard(name, link){
return  fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: '3bdecd97-cc83-4e5e-ac8d-e22694049ffd',
      'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: name,
      link: link
      }),
  }) 
 }



export function deleteCard(id, listItem) {
  fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
  listItem.remove();
}
 export function likeCard(item, likeButton, id, userId) {


  // let numLike = item.likes.length;
  // if (numLike == 0) {
  //   addLikeCard(id)
  //   .then(()=>{likeButton.classList.add("card__like-button_is-active"); likeButton.nextElementSibling.textContent = numLike + 1});
  //   // likeButton.nextElementSibling.textContent = numLike + 1;
  //   // likeButton.classList.add("card__like-button_is-active");
  // } else {
  //   const arrayLikes = Array.from(item.likes);
  //   const likes = arrayLikes.map((elem) => ({ _id: elem._id }));
  //   const likes_ar = Object.values(likes);
  //   if(likes_ar.find((el) => el._id === userId))
  //  { 
  //   deleteLikeCard(id)
    
  // } else{
  //       addLikeCard(id)
  likeButton.nextElementSibling.textContent =item.likes.length
  //      //  likeButton.nextElementSibling.textContent = numLike + 1;
     likeButton.classList.add("card__like-button_is-active");
  //     }
    
       
  //        // likeButton.nextElementSibling.textContent = numLike - 1;
  //     //   likeButton.classList.remove("card__like-button_is-active");
  //     // }
      
     
  //   // } 

 }

 




export function addLikeCard(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
    
  }) 


}
export function deleteLikeCard(id) {
  fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
 

}
