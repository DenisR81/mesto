
import Popup from './Popup.js';
export default class PopupWithForm extends Popup { 
  constructor(popupSelector, handleFormSubmit) { 
    super(popupSelector); 
    this._handleFormSubmit = handleFormSubmit, 
    this._form = this._popup.querySelector('.popup__container');
    console.log(this._form)
    this._inputList = Array.from(this._form.querySelectorAll('.popup__fields'))
  } 

  _getInputValues = () => {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value
    })
    console.log(values)
    return values
    
  }
  _handleSubmit = () => {
    this._handleFormSubmit(this._getInputValues())
    this.close()
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit)
    };
  

  close() {
    super.close();
    this._form.reset();
  }
}