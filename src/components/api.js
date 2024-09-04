import { editProfile } from "./index";
export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-22',
    headers: {
      authorization: '3bdecd97-cc83-4e5e-ac8d-e22694049ffd',
      'Content-Type': 'application/json'
    }
  };

  export function getProfileInfo() {
    fetch('https://nomoreparties.co/v1/wff-cohort-22/users/me', {headers: {
      authorization: '3bdecd97-cc83-4e5e-ac8d-e22694049ffd'} 
    })
    .then((res) => res.json())
  .then((profile) => { 

   document.querySelector('.profile__image').setAttribute('style', `background-image: url(${profile.avatar})`);
  const nameInput = profile.name;
  const jobInput = profile.about;
  editProfile(nameInput, jobInput); 
  })     
  }

  export function editProfileInfo(nameInput, jobInput) {
  fetch('https://nomoreparties.co/v1/wff-cohort-22/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '3bdecd97-cc83-4e5e-ac8d-e22694049ffd',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput,
      about: jobInput,
    })
  });
}
 export function editAvatarInfo(avatarka) {
  fetch('https://nomoreparties.co/v1/wff-cohort-22/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '3bdecd97-cc83-4e5e-ac8d-e22694049ffd',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarka
    })
  });
 }
