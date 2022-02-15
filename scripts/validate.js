const showInputError = (conf, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  inputElement.classList.add(conf.inputErrorClass);
  errorElement.classList.add(conf.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (conf, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  inputElement.classList.remove(conf.inputErrorClass);
  errorElement.classList.remove(conf.errorClass);
  errorElement.textContent = '';
};

const hasInvalidInput=(inputList)=>{
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
}

const toggleButtonState =(conf, inputList, buttonElement)=> {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled','')
    buttonElement.classList.add(conf.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(conf.inactiveButtonClass);
    buttonElement.removeAttribute('disabled')
  }
}


const checkInputValidity = (conf, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(conf, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(conf, formElement, inputElement);
  }
};

const setEventListeners = (conf, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(conf.inputSelector));
  const buttonElement = formElement.querySelector(conf.submitButtonSelector);
  toggleButtonState(conf, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(conf, formElement, inputElement);
      toggleButtonState(conf, inputList, buttonElement);
    });
  });
};

const enableValidation = (conf) => {
  const formList = Array.from(document.querySelectorAll(conf.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt)=> {
      evt.preventDefault();
    });
      setEventListeners(conf, formElement);
    });
  };

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__fields',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__fields_type_error',
  errorClass: 'popup__error-message_visible',
}); 
