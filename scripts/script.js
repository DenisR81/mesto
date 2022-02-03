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
const heart = document.querySelector(".place__heart");
const popupImg = document.querySelector(".popup_type_img");
const closeImgButton = document.querySelector(".popup__btn-close_img");
const formElement = document.querySelector(".popup__container");
const nameInput = document.getElementById("edit-name");
const jobInput = document.getElementById("edit-work");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");
const addName = document.querySelector("#add-name").value;
const addLink = document.querySelector("#add-link").value;
const addFormElement = document.querySelector(".popup1__container");
const linkImg = document.querySelector(".popup__image");
const nameImg = document.querySelector(".popup__text");


items.forEach((item) => {
  const card = addCard(item.name, item.link, template);
  photoGrid.append(card);
});

function addCard(name, link) {
  const template = document.querySelector("#template").content;
  const elementItem = template.cloneNode(true);
  elementItem.querySelector(".place__title").textContent = name;
  elementItem.querySelector(".place__photo").alt = name;
  elementItem.querySelector(".place__photo").src = link;
  elementItem.querySelector(".place__heart").addEventListener("click", function (evt) {
    evt.target.classList.toggle("place__heart_active");
  });
  elementItem.querySelector(".place__urn").addEventListener("click", (evt) => {
    evt.target.closest(".place").remove();
  });
  elementItem.querySelector(".place__photo").addEventListener("click", (evt) => {
    linkImg.src = link;
    nameImg.textContent = name;
    openPopup(popupImg);
  });
  return elementItem;
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const name = document.querySelector("#add-name").value;
  const link = document.querySelector("#add-link").value;
  card = addCard(name, link);
  photoGrid.prepend(card);
  closePopup(popupAdd);
}

function inpFormSubmitHandler() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
}

formElement.addEventListener("submit", formSubmitHandler);
addFormElement.addEventListener("submit", addFormSubmitHandler);
openPopupButton.addEventListener("click", inpFormSubmitHandler);
closePopupButton.addEventListener("click", () => {
  closePopup(popupEdit);
})
openAddButton.addEventListener("click", () => {
  openPopup(popupAdd);
})
closeAddButton.addEventListener("click", () => {
  closePopup(popupAdd);
})
closeImgButton.addEventListener("click", () => {
  closePopup(popupImg);
});
