export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
export const openPopupButton = document.querySelector(".profile__edit-button");
export const openAddButton = document.querySelector(".profile__add-button");
const closePopupButton = document.querySelector(".popup__btn-close");
const popup = document.querySelector(".popup");
const popupEdit = document.querySelector(".popup_type_edit")
export const popupAdd = ".popup_type_add";
const closeAddButton = document.querySelector(".popup__btn-close_add");
const photoGrid = document.querySelector(".photo-grid");
const closeImgButton = document.querySelector(".popup__btn-close_img");
const formElement = document.querySelector(".popup__container_type_ed");
export const nameInput = document.getElementById("name");
export const jobInput = document.getElementById("work");
export const profileName = document.querySelector(".profile__title");
export const profileJob = document.querySelector(".profile__subtitle");
const addFormElement = document.querySelector(".popup__container_type_add");
const buttonSave = document.querySelector(".popup__btn-save_type_add");
const buttonSaveProfile = document.querySelector(".popup__btn-save_type_edit")
//const addCardForm = popupAdd.querySelector(".popup__container");
const editForm = popupEdit.querySelector(".popup__container");

const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__fields',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__fields_type_error',
  errorClass: 'popup__error-message_visible',
};

