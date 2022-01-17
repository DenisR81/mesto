const openPopupButton = document.querySelector('.edit_button');
const closePopupButton = document.querySelector('.btn-close');
const savePopupButton = document.querySelector('.popup__btn-save');
const popup = document.querySelector('.popup');

function openPopup(event) {
  event.preventDefault();
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__work');

function formSubmitHandler (evt) {
  evt.preventDefault();
  let userName = nameInput.value;
  let userJob = jobInput.value;
  let profileName = document.querySelector('.profile__title');
  let profileJob = document.querySelector('.profile__subtitle');
  profileName.textContent = userName;
  profileJob.textContent = userJob;
  closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);