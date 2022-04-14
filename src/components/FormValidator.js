
export default class FormValidator {
  constructor(settings, form) {
    this._form = form,
    this._settings = settings,
    this._buttonElement = this._form.querySelector(settings.submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector))
  }


  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
    errorElement.textContent = errorMessage;
  };
  
  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }

  disabledSubmitButton() {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
  
  enableSubmitButton() {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }
  
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disabledSubmitButton();
    } else {
      this.enableSubmitButton();
    };
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    const buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
    this.toggleButtonState(this._inputList, buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState(this._inputList, buttonElement);
      });
    });
  };

  enableValidation() {
      this._form.addEventListener('submit', ()=> {
      });
        this._setEventListeners();
      };

  resetErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
  }); 
    this.toggleButtonState()
}
}