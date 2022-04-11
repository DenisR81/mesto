
import Popup from './Popup.js';
export default class PopupWithForm extends Popup { 
  constructor(popupSelector, handleFormSubmit) { 
    super(popupSelector); 
    this._handleFormSubmit = handleFormSubmit, 
    this._popupSubmitButton = this._popup.querySelector('.popup__btn-save')
    this._form = this._popup.querySelector('.popup__container');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__fields'))
  } 

  _getInputValues = () => {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value
    })
    return values
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._popupSubmitButton.textContent = "Сохранение...";
    } else {
      this._popupSubmitButton.textContent = "Сохранить";
    }
  } 


  changeSubmitHandler (newSubmitHandler) {
    this._handleFormSubmit = newSubmitHandler;
  }

  _handleSubmit = () => {
    this._handleFormSubmit(this._getInputValues())
    this.close()
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) =>{
      evt.preventDefault();
      this._handleSubmit()
    })
    };
  

  close() {
    super.close();
    this._form.reset();
  }
}