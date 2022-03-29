
//import './index.css'
import Popup from '../components/Popup.js';
import Card from '../components/Card.js';
//import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  popupAdd,
  openAddButton,
  openPopupButton,
  nameInput,
  jobInput,
  profileName,
  profileJob,
} from '../utils/constants.js'






/*const openPopupButton = document.querySelector(".profile__edit-button");
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
const editForm = popupEdit.querySelector(".popup__container");*/

const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__fields',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__fields_type_error',
  errorClass: 'popup__error-message_visible',
};

/*const handleCardClick = (data) => {
  imagePopup.open(data.link, data.name);
}*/

const createCard = (data) => {
  const card = new Card(data, '#template', () => {
    imagePopup.open(data.link, data.name)
  }).createCard();
  return card
}

const renderCard = (data,wrap) => {
  const card = createCard(data);
  wrap.prepend(card);
}
//добавление карточек
const section = new Section(
  {
    items: initialCards,
    renderer: renderCard
    },
  ".photo-grid"
);
section.renderItems()

/*function addFormSubmitHandler(data) {
  evt.preventDefault();
  const card = createCard(name,link);
  const name = document.querySelector("#addname").value;
  const link = document.querySelector("#link").value;
  photoGrid.prepend(card.createCard());
  //evt.target.reset();
  //butDis(buttonSave);
  addForm.close();
};*/



/*const handleCard = (data) => {
  //evt.preventDefault();
  const card = createCard(data);
  //const name = document.querySelector("#addname").value;
  //const link = document.querySelector("#link").value;
  cardList.addItem(card);
  addForm.close()
}*/



//карточка
const addForm = new PopupWithForm(popupAdd, () => {
  const card = createCard({
    name: document.querySelector("#addname").value,
    link: document.querySelector("#link").value,
  })
  section.addItem(card);
});
addForm.setEventListeners();
openAddButton.addEventListener('click', () => {
  //formValidators.add.toggleButtonState()
  addForm.open()
})


// профиль
const userInfo = new UserInfo({profileNameSelector: '.profile__title', profileJobSelector: '.profile__subtitle'})
const editForm = new PopupWithForm('.popup_type_edit', (name) => {
  userInfo.setUserInfo(name.name, name.work)});
editForm.setEventListeners();

openPopupButton.addEventListener('click', () => {
  const {name, job} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  //formValidators.profile.toggleButtonState()
  editForm.open()
})


//Большая карточка

const imagePopup = new PopupWithImage(".popup_type_img");
imagePopup.setEventListeners();


/*openAddButton.addEventListener("click", () => {
  //cardValidator.resetErrors();
  addForm.open();
});*/

/*const editValidator = new FormValidator(validationConfig, editForm);
const cardValidator = new FormValidator(validationConfig, addCardForm);

editValidator.enableValidation();
cardValidator.enableValidation();





//Функция disabled кнопки
function butDis(e) {
  e.setAttribute('disabled','')
  e.classList.add('popup__btn-save_disabled');
}

formElement.addEventListener("submit", formSubmitHandler);
addFormElement.addEventListener("submit", addFormSubmitHandler);

openPopupButton.addEventListener("click", () => {
  inpFormSubmitHandler();
  editValidator.resetErrors()
  butDis(buttonSaveProfile)});
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
popupImg.addEventListener('click', popupCloseClick);*/

