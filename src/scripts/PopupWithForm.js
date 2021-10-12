import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(".form");
    this._submitButton = this._form.querySelector("form__submit-button");
    this._defaultValueSubmitButton = this._submitButton.textContent;
  }

  renderLoading(isLoading, loadMessage = 'Cохранение...') {
    if (isLoading) {
      this._submitButton.textContent = loadMessage;
    } else {
      this._submitButton.textContent = this._defaultValueSubmitButton;
    }
  }

  getInputValues() {
    const inputValues = {};
    const inputList = this._formElement.querySelectorAll(".form__input");
    inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm();
    });
  }
}
