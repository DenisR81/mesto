
export class FormValidator {
  constructor(settings, form) {
    this._form = form,
    this._settings = settings,
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

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }

  _toggleButtonState =(inputList, buttonElement)=> {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled','');
      buttonElement.classList.add(this._settings.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    const buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
    this._toggleButtonState(this._inputList, buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, buttonElement);
      });
    });
  };

  enableValidation() {
      this._form.addEventListener('submit', (evt)=> {
        evt.preventDefault();
      });
        this._setEventListeners();
      };

  resetErrors() {
    this._form.reset();
    this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement)
  }); 
}
}