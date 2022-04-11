
export default class Card {
  constructor(data, cardTemplateSelector, handleCardClick, handleDeleteClick, handlikeClick) {
    this._cardTemplateSelector = cardTemplateSelector,
    this._name = data.name,
    this._link = data.link,
    this._likes = data.likes,
    this._id = data.id,
    this._handleCardClick = handleCardClick,
    this._handleDeleteClick = handleDeleteClick,
    this._userId = data.userId,
    this._ownerId = data.ownerId,
    this._handlikeClick = handlikeClick
  }

  delCard() {
    this._elementItem.remove();
    this._elementItem = null;
  };

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {this._handleDeleteClick(this._id)});
    this._likeButton.addEventListener("click", () => {this._handlikeClick(this._id)});
    this._imageButton.addEventListener("click", this._handleCardClick);
  }

  _likeIcon () {
    this._elementItem.querySelector(".place__heart").
    classList.add("place__heart_active");
  };

  _likeHideIcon() {
    this._elementItem.querySelector(".place__heart").
    classList.remove("place__heart_active");
  };

  isLiked() {
    const userHasLikes = this._likes.find(user => user._id === this._userId);
    return userHasLikes;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    const likeCountElement = this._elementItem.querySelector('.place__like-count');
    likeCountElement.textContent = this._likes.length;
    if (this.isLiked()) {
      this._likeIcon();
    } else {
      this._likeHideIcon()
  }
}

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);
    return cardElement;
  }
 
  createCard() {
    this._elementItem = this._getTemplate();
    this._likeButton = this._elementItem.querySelector(".place__heart");
    this._imageButton = this._elementItem.querySelector(".place__photo");
    this._deleteButton = this._elementItem.querySelector(".place__urn");
    this._elementItem.querySelector(".place__title").textContent = this._name;
    this._elementItem.querySelector(".place__photo").alt = this._name;
    this._elementItem.querySelector(".place__photo").src = this._link;
    this._setEventListeners();
    this.setLikes(this._likes);
    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = "none";
    }
    return this._elementItem;
  }
} 

