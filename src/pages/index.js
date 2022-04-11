import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { api } from '../components/Api.js';
let userId = {}

api.getProfile()
.then(res => {
  userInfo.setUserInfo(res.name, res.about,res.avatar);
  userId = res._id;
  //console.log(res)
})

api.getInitialCards()
.then(cardList => {
  cardList.forEach(data => {
    const card = createCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      id: data._id,
      userId: userId,
      ownerId: data.owner._id,
    })
    section.addItem(card)
  })
})

/*api.getAvatar()
.then(res => {
  
  console.log(res)
})*/

import {
  profileAvatar,
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
    })
    },

    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
      .then(res => {
        card.setLikes(res.likes)
      }); }
      else 
      {
      api.addLike(id)
      .then(res => {
        card.setLikes(res.likes)
      });
      }    
  });
    return card.createCard();
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
      userId: userId,
      ownerId: res.owner._id,
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
const userInfo = new UserInfo({profileNameSelector: '.profile__title', profileJobSelector: '.profile__subtitle', profileAvatarSelector: '.profile__avatar-img'});
const editForm = new PopupWithForm('.popup_type_edit', (data) => {
  const {name, work, avatar} = data;
  api.editProfile(name, work,avatar)
  .then(() => {
    userInfo.setUserInfo(name, work, avatar);
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

const confirmPopup = new PopupWithForm('.popup_type_delete-confirm');
confirmPopup.setEventListeners();

const avatarPopup = new PopupWithForm('.popup_type_editImgProfile', (input) => {
  api.getAvatar(input.avatar)
  .then((res) => {
    userInfo.setAvatarInfo(res.avatar)
  })
});
openImgProfileButton.addEventListener('click', () => {
  formValidators.formProfile.resetErrors();
  avatarPopup.open(); 
  });
  avatarPopup.setEventListeners();
