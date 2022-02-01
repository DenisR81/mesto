const items = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
const openPopupButton = document.querySelector('.profile__edit-button');
const openAddButton= document.querySelector('.profile__add-button');
const closePopupButton = document.querySelector('.popup__btn-close');
const popup = document.querySelector('.popup');
const popupAdd = document.querySelector('.popup1');
const closeAddButton = document.querySelector('.popup1__btn-close');
const photoGrid = document.querySelector('.photo-grid');
const heart = document.querySelector('.place__heart');
const popupImg = document.querySelector('.popup-image');
const textPopup = document.querySelector('.popup-image__text');
const openImgButton = document.querySelector('.popup-image__image');
const closeImgButton = document.querySelector('.popup-image__btn-close');
let formElement = document.querySelector('.popup__container');
let nameInput = document.getElementById('edit-name');
let jobInput = document.getElementById('edit-work');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let addName = document.querySelector('#add-name').value;
let addLink = document.querySelector('#add-link').value;
let addFormElement = document.querySelector('.popup1__container');
let linkImg = document.querySelector('.popup-image__image');
let nameImg = document.querySelector('.popup-image__text');


items.forEach(item=>{addCard(item.name,item.link,template)});

function addCard (name,link) {
  const template = document.querySelector('#template').content;
  const elementItem = template.cloneNode(true);
  elementItem.querySelector('.place__title').textContent = name;
  elementItem.querySelector('.place__photo').alt = name;
  elementItem.querySelector('.place__photo').src = link;
  elementItem.querySelector('.place__heart').addEventListener('click', function (evt)  {evt.target.classList.toggle('place__heart_active')});
  elementItem.querySelector('.place__urn').addEventListener('click',(evt) => {evt.target.closest('.place').remove()});
  elementItem.querySelector('.place__photo').addEventListener('click',(evt) =>{
    evt.preventDefault();
    linkImg.src=link;
    nameImg.textContent=name;
    openPopupImg()});
  photoGrid.append(elementItem);
  return elementItem;
}
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openPopup1() { 
  popupAdd.classList.add('popup1_opened');
}

function openPopupImg() {
  popupImg.classList.add('popup-image_opened');
}


function closePopup() {
  popup.classList.remove('popup_opened');
}

function closePopup1() {
  popupAdd.classList.remove('popup1_opened');
}

function closePopupImg() {
  popupImg.classList.remove('popup-image_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

function addFormSubmitHandler (evt) {
  evt.preventDefault();
  let name = document.querySelector('#add-name').value;
  let link = document.querySelector('#add-link').value;
  const template = document.querySelector('#template').content;
  const elementItem = template.cloneNode(true);
  elementItem.querySelector('.place__title').textContent = name;
  elementItem.querySelector('.place__photo').alt = name;
  elementItem.querySelector('.place__photo').src = link;
  elementItem.querySelector('.place__heart').addEventListener('click', function (evt)  {evt.target.classList.toggle('place__heart_active')});
  elementItem.querySelector('.place__urn').addEventListener('click',(evt) => {evt.target.closest('.place').remove()});
  elementItem.querySelector('.place__photo').addEventListener('click',(evt) =>{
    evt.preventDefault();
    linkImg.src=link;
    nameImg.textContent=name;
    openPopupImg()});
  photoGrid.prepend(elementItem);
  closePopup1();
}


formElement.addEventListener('submit', formSubmitHandler);
addFormElement.addEventListener('submit', addFormSubmitHandler);
openPopupButton.addEventListener('click', openPopup);
openAddButton.addEventListener('click', openPopup1);
closePopupButton.addEventListener('click', closePopup);
closeAddButton.addEventListener('click', closePopup1);
closeImgButton.addEventListener('click', closePopupImg);