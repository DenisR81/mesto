import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { api } from '../components/Api.js';
let userId = {}

import {
  initialCards,
  openImgProfileButton,
  popupAdd,
  openAddButton,
  openPopupButton,
  nameInput,
  jobInput,
  validationConfig,
  formValidators
} from '../utils/constants.js';
import './index.css';

const section = new Section(".photo-grid");

function listData(data) {
  const card = createCard({
    name: data.name,
    link: data.link,
    likes: data.likes,
    userId: userId,
    id: data._id,
    ownerId: data.owner._id,
  })
  section.addItem(card)
}

Promise.all ([
  api.getProfile(),
  api.getInitialCards()
])
  .then((res) => {
    userInfo.setUserInfo(res[0].name, res[0].about);
    userInfo.setAvatarInfo(res[0].avatar);
    userId = res[0]._id;
    console.log(res[1])
    section.renderItems(res[1], listData)
  })
  .catch(err => console.log(`Ошибка: ${err}`))

// карточки
const createCard = (data) => {
  const card = new Card(data,
    '#template',
      () => {
      imagePopup.open(data.link, data.name)
        },

      (id) => {
        confirmPopup.open();
      confirmPopup.changeSubmitHandler(() => {
      api.deleteCard(id)
      .then(res => {
        card.delCard(res);
        confirmPopup.close()
      })
      .catch(err => console.log(`Ошибка: ${err}`))
    })
    },

    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
      .then(res => {
        card.setLikes(res.likes)
      }) 
      .catch(err => console.log(`Ошибка: ${err}`))
    }
      else 
      {
      api.addLike(id)
      .then(res => {
        card.setLikes(res.likes)
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      }    
  });
    return card.createCard();
}

const addForm = new PopupWithForm(popupAdd, (data)=> {
  addForm.renderLoading(true);
  api.addCard(data)
    .then((res) => {
    listData(res)
  addForm.close();
  })
.catch(err => console.log(`Ошибка: ${err}`))
.finally(() => {
  addForm.renderLoading(false)
})
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
const userInfo = new UserInfo({profileNameSelector: '.profile__title', profileJobSelector: '.profile__subtitle', profileAvatarSelector: '.profile__avatar-img'});
const editForm = new PopupWithForm('.popup_type_edit', (data) => {
  editForm.renderLoading(true);
  const {name, work, avatar} = data;
  api.editProfile(name, work, avatar)
  .then(() => {
    userInfo.setUserInfo(name, work, avatar);
    editForm.close();
  })
  .catch(err => console.log(`Ошибка: ${err}`))
  .finally(() => {
    editForm.renderLoading(false)
  })
  });
editForm.setEventListeners();

openPopupButton.addEventListener('click', () => {
  formValidators.formProfile.resetErrors();
  editForm.renderLoading(false);
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

const confirmPopup = new PopupWithForm('.popup_type_delete-confirm');
confirmPopup.setEventListeners();

const avatarPopup = new PopupWithForm('.popup_type_editImgProfile', (input) => {
  avatarPopup.renderLoading(true);
  api.getAvatar(input.avatar)
  .then((res) => {
    userInfo.setAvatarInfo(res.avatar);
    avatarPopup.close();
  })
  .catch(err => console.log(`Ошибка: ${err}`))
  .finally(() => {
    avatarPopup.renderLoading(false)
  })
});
openImgProfileButton.addEventListener('click', () => {
  formValidators.formImgProfile.resetErrors();
  avatarPopup.renderLoading(false);
  avatarPopup.open(); 
  });
  avatarPopup.setEventListeners();
