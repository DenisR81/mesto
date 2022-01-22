const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.btn-close');
const popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');
let nameInput = document.getElementById('edit-name');
let jobInput = document.getElementById('edit-work');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');



function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);
openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);