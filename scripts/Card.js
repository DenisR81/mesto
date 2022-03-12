import { linkImg, nameImg, popupImg, openPopup } from './utils.js';
export class Card {
  constructor(name, link, cardTemplateSelector) {
    this._cardTemplateSelector = cardTemplateSelector,
    this._name = name,
    this._link = link
  }
  
  _likeIcon = () => {
    this._likeButton.classList.toggle("place__heart_active");
  };

  _deleteCard = (evt) => {
    evt.target.closest(".place").remove();
  };

  _imageCard = () => {
    linkImg.src = this._link;
    linkImg.alt = this._name;
    nameImg.textContent = this._name;
    openPopup(popupImg);
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", this._deleteCard);
    this._likeButton.addEventListener("click", this._likeIcon);
    this._imageButton.addEventListener("click", this._imageCard);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);
    return cardElement;
  }

  addCard() {
    this._elementItem = this._getTemplate();
    this._likeButton = this._elementItem.querySelector(".place__heart");
    this._imageButton = this._elementItem.querySelector(".place__photo");
    this._deleteButton = this._elementItem.querySelector(".place__urn");
    this._elementItem.querySelector(".place__title").textContent = this._name;
    this._elementItem.querySelector(".place__photo").alt = this._name;
    this._elementItem.querySelector(".place__photo").src = this._link;
    this._setEventListeners();
    return this._elementItem;
  }
} 