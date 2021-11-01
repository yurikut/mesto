import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._popup.querySelector(".form");
    this._button = this._popup.querySelector("button[type = 'submit']");
    this._buttonDefaultText = this._button.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    const inputList = this._formElement.querySelectorAll(".form__input");
    inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  renderButton(isBusy) {
    this._button.textContent = isBusy ? 'Отправка...' : this._buttonDefaultText;
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }
}
