(()=>{"use strict";var e={d:(t,r)=>{for(var n in r)e.o(r,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:r[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),p:""};e.d({},{oS:()=>w});var t=document.querySelector("#card-template").content;function r(e){e.target.classList.toggle("card__like-button_is-active")}function n(e){e.closest(".card").remove()}function o(e,r,n,o){var c=t.querySelector(".card__image");c.setAttribute("alt",e.name),c.setAttribute("src",e.link);var i=t.querySelector(".places__item").cloneNode(!0);i.querySelector(".card__title").textContent=e.name,i.querySelector(".card__like-button").addEventListener("click",n);var a=i.querySelector(".card__delete-button");return a.addEventListener("click",(function(){r(a)})),i.querySelector(".card__image").addEventListener("click",o),i}var c={baseUrl:"https://nomoreparties.co/v1/wff-cohort-22",headers:{authorization:"3bdecd97-cc83-4e5e-ac8d-e22694049ffd","Content-Type":"application/json"}};function i(e){e.classList.add("popup_is-animated"),e.classList.add("popup_is-opened"),document.addEventListener("keydown",u)}function a(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u)}function u(e){"Escape"===e.key&&a(document.querySelector(".popup_is-opened"))}function s(e){e.currentTarget===e.target&&a(e.currentTarget)}fetch("".concat(c.baseUrl,"/cards"),{headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){})).catch((function(e){console.log(e)})),e.p;var p=".popup__form",d=".popup__input",l=".popup__button",_="popup__button_disabled",f="popup__input_type_error",m="popup__error_visible",y=".popup__error_visible";function v(){document.querySelectorAll(d).forEach((function(e){e.classList.remove(f)})),document.querySelectorAll(y).forEach((function(e){e.textContent="",e.classList.remove(m)}))}var h=function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(f),r.classList.remove(m),r.textContent=""}(e,t):function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.add(f),n.textContent=r,n.classList.add(m)}(e,t,t.validationMessage)},S=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(_),t.disabled=!1):(t.classList.add(_),t.disabled=!0)},q=document.querySelector(".popup_type_new-card"),b=document.querySelector(".profile__add-button"),k=document.querySelector(".popup_type_edit"),L=document.querySelector(".places__list"),g=document.querySelectorAll(".popup"),E=document.querySelector(".profile__edit-button"),x=document.querySelector(".popup_type_image"),C=x.querySelector(".popup__image"),j=document.querySelector(".profile__info");function A(){i(x);var e=x.querySelector(".popup__caption");C.src=this.src,e.textContent=this.alt}function w(e,t){j.querySelector(".profile__title").textContent=e,j.querySelector(".profile__description").textContent=t}document.forms.edit_profile.addEventListener("submit",(function(e){w(document.forms.edit_profile.elements.name,document.forms.edit_profile.elements.description),e.preventDefault(),a(k)})),document.forms.new_place.addEventListener("submit",(function(e){var t=q.querySelector(".popup__input_type_card-name").value,c=q.querySelector(".popup__input_type_url").value;e.preventDefault();var i=o({name:t,link:c},n,r,A);L.prepend(i),a(q)})),document.addEventListener("click",(function(e){e.target===b&&(document.forms.new_place.reset(),v(),i(q)),e.target===E&&(v(),document.querySelector(".popup__input_type_name").value=j.querySelector(".profile__title").textContent,document.querySelector(".popup__input_type_description").value=j.querySelector(".profile__description").textContent,i(k))})),g.forEach((function(e){e.querySelector(".popup__close").addEventListener("click",(function(){a(e)}))})),g.forEach((function(e){e.addEventListener("click",s)})),L.textContent=" ",[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){L.append(o(e,n,r,A))})),fetch("https://nomoreparties.co/v1/wff-cohort-22/users/me ",{headers:{authorization:"3bdecd97-cc83-4e5e-ac8d-e22694049ffd"}}).then((function(e){return e.json()})).then((function(e){w(e.name,e.about)})),Array.from(document.querySelectorAll(".popup")).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),Array.from(e.querySelectorAll(p)).forEach((function(e){!function(e){var t=Array.from(e.querySelectorAll(d)),r=e.querySelector(l);S(t,r),t.forEach((function(n){n.addEventListener("input",(function(){S(t,r),h(e,n)}))}))}(e)}))}))})();