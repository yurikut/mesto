function showInputError(formElement, inputElement, errorMessage, validationSettings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)

  inputElement.classList.add(validationSettings.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(validationSettings.errorClass)
}

function hideInputError(formElement, inputElement, validationSettings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)

  inputElement.classList.remove(validationSettings.inputErrorClass)
  errorElement.classList.remove(validationSettings.errorClass)
  errorElement.textContent = ''
}

function checkInputValidity(formElement, inputElement, validationSettings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings)
  } else {
    hideInputError(formElement, inputElement, validationSettings)
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function toggleSubmitButtonState(inputList, buttonElement, validationSettings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationSettings.inactiveButtonClass)
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove(validationSettings.inactiveButtonClass)
    buttonElement.removeAttribute('disabled')
  }
}

function setEventListeners(formElement, validationSettings) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector))
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector)

  toggleSubmitButtonState(inputList, buttonElement, validationSettings)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationSettings)
      toggleSubmitButtonState(inputList, buttonElement, validationSettings)
    })
  })
}

function enableValidation(validationSettings) {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setEventListeners(formElement, validationSettings)
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
})
