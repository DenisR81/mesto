import {FormValidator} from './FormValidator.js';
import {popupImg, openPopup, closePopup} from './utils.js';
import { Card } from './Card.js';
const items = [
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
const openPopupButton = document.querySelector(".profile__edit-button");
const openAddButton = document.querySelector(".profile__add-button");
const closePopupButton = document.querySelector(".popup__btn-close");
const popup = document.querySelector(".popup");
const popupEdit = document.querySelector(".popup_type_edit")
const popupAdd = document.querySelector(".popup_type_add");
const closeAddButton = document.querySelector(".popup__btn-close_add");
const photoGrid = document.querySelector(".photo-grid");
const closeImgButton = document.querySelector(".popup__btn-close_img");
const formElement = document.querySelector(".popup__container_type_ed");
const nameInput = document.getElementById("name");
const jobInput = document.getElementById("work");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const addFormElement = document.querySelector(".popup__container_type_add");
const buttonSave = document.querySelector(".popup__btn-save_type_add");
const buttonSaveProfile = document.querySelector(".popup__btn-save_type_edit")
const addCardForm = popupAdd.querySelector(".popup__container");
const editForm = popupEdit.querySelector(".popup__container");

const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__fields',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__fields_type_error',
  errorClass: 'popup__error-message_visible',
};

const editValidator = new FormValidator(validationConfig, editForm);
const cardValidator = new FormValidator(validationConfig, addCardForm);

editValidator.enableValidation();
cardValidator.enableValidation();

items.forEach((item) => {
  const card = new Card(item.name, item.link, "#template");
  photoGrid.append(card.addCard());
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const name = document.querySelector("#addname").value;
  const link = document.querySelector("#link").value;
  const card = new Card(name, link, "#template");
  photoGrid.prepend(card.addCard());
  evt.target.reset();
  desableBtn(buttonSave);
  closePopup(popupAdd);
}

function inpFormSubmitHandler() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
}

//Функция закрытия попапа при клике вне попапа
const popupCloseClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

//Функция disabled кнопки
function desableBtn(e) {
  e.setAttribute('disabled','')
  e.classList.add('popup__btn-save_disabled');
}

formElement.addEventListener("submit", formSubmitHandler);
addFormElement.addEventListener("submit", addFormSubmitHandler);

openPopupButton.addEventListener("click", () => {
  inpFormSubmitHandler();
  editValidator.resetErrors()
  desableBtn(buttonSaveProfile)
});
popup.addEventListener('click', popupCloseClick);
closePopupButton.addEventListener("click", () => {
  closePopup(popupEdit);
})
openAddButton.addEventListener("click", () => {
  openPopup(popupAdd);
  cardValidator.resetErrors();
})
closeAddButton.addEventListener("click", () => {
  closePopup(popupAdd);
})
closeImgButton.addEventListener("click", () => {
  closePopup(popupImg);
});

popupAdd.addEventListener('click', popupCloseClick);
popupEdit.addEventListener('click', popupCloseClick);
popupImg.addEventListener('click', popupCloseClick);