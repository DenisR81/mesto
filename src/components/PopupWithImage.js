import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this.bigLinkImg = this._popup.querySelector('.popup__image'),
    this.bigNameImg = this._popup.querySelector('.popup__text')
  };

open(link, name) {
  this.bigLinkImg.src = link;
  this.bigLinkImg.alt = name;
  this.bigNameImg.textContent = name;
  super.open();
  };
}