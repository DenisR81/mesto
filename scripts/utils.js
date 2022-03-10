export const linkImg = document.querySelector(".popup__image");
export const nameImg = document.querySelector(".popup__text");
export const popupImg = document.querySelector(".popup_type_img");

export const openPopup = (evt) => {
  evt.classList.add("popup_opened");
  document.addEventListener('keydown', popupCloseEsc);
}

export const closePopup = (evt) => {
  evt.classList.remove("popup_opened");
  document.removeEventListener('keydown', popupCloseEsc);
}

export const popupCloseEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
    };
  }
