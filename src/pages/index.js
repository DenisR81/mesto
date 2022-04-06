import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { api } from '../components/Api.js';

api.getProfile()
.then(res => {
  userInfo.setUserInfo(res.name, res.about)
})

api.getInitialCards()
.then(cardList => {
  cardList.forEach(data => {
    const card = createCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      id: data._id,
    })
    section.addItem(card)
  })
})

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
  const card = new Card(data,
    '#template',
      () => {
      imagePopup.open(data.link, data.name)
        },
      (id) => {
        confirmPopup.open()
        console.log (id)
    confirmPopup.changeSubmitHandler(() => {
      api.deleteCard(id)
      .then(res => {
        card.deleteCard();
        confirmPopup.close()
      })
    })
    }).createCard();
    return card
}

const renderCard = (data) => {
  const card = createCard(data);
  section.addItem(card);
}

const section = new Section(
  {
    items: [],
    renderer: renderCard
    },
  ".photo-grid"
);
section.renderItems()

const addForm = new PopupWithForm(popupAdd, () => {
    api.addCard(document.querySelector("#addname").value, document.querySelector("#link").value,)
    .then(res => {
    const card = createCard({
      name: res.name,
      link: res.link,
      likes: res.likes,
      id: res._id,
    })
  section.addItem(card);
});
})
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
const editForm = new PopupWithForm('.popup_type_edit', (data) => {
  const {name, work} = data;
  api.getProfile(name, work)
  .then(() => {
    userInfo.setUserInfo(name, work);
  })
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

const confirmPopup = new PopupWithForm('.popup_type_delete-confirm', ()=> {console.log('ghbbbbbb')});
confirmPopup.setEventListeners();