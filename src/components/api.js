import { editProfile } from "./index";
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-22',
    headers: {
      authorization: '3bdecd97-cc83-4e5e-ac8d-e22694049ffd',
      'Content-Type': 'application/json'
    }
  };
  export function getProfileInfo() {
    fetch('https://nomoreparties.co/v1/wff-cohort-22/users/me ', {headers: {
      authorization: '3bdecd97-cc83-4e5e-ac8d-e22694049ffd'} 
    })
    .then((res) => res.json())
  .then((profile) => { 
   const nameInput = profile.name;
   const jobInput = profile.about;
   editProfile(nameInput, jobInput); 
   })
     
  }
  
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }