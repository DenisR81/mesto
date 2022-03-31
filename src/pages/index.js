import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
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
  validationConfig,
  formValidators
} from '../utils/constants.js';
import './index.css';

// карточки
const createCard = (data) => {
  const card = new Card(data, '#template', () => {
    imagePopup.open(data.link, data.name)
  }).createCard();
  return card
}

const renderCard = (data,wrap) => {
  const card = createCard(data);
  section.addItem(card);
}

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard
    },
  ".photo-grid"
);
section.renderItems()

const addForm = new PopupWithForm(popupAdd, () => {
  const card = createCard({
    name: document.querySelector("#addname").value,
    link: document.querySelector("#link").value,
  })
  section.addItem(card);
});
addForm.setEventListeners();
openAddButton.addEventListener('click', () => {
  formValidators.formAdd.resetErrors();
  addForm.open()
})

//Большая карточка
const imagePopup = new PopupWithImage(".popup_type_img");
imagePopup.setEventListeners();

// профиль
const userInfo = new UserInfo({profileNameSelector: '.profile__title', profileJobSelector: '.profile__subtitle'});
const editForm = new PopupWithForm('.popup_type_edit', (name) => {
  userInfo.setUserInfo(name.name, name.work)
  });
editForm.setEventListeners();

openPopupButton.addEventListener('click', () => {
  formValidators.formProfile.resetErrors();
  const {name, job} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  editForm.open()
})

//Валидация
function validation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formValidators[`${formElement.id}`] = new FormValidator(validationConfig, formElement);
    formValidators[`${formElement.id}`].enableValidation();
  });
}
validation(validationConfig);