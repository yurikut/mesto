import {Popup} from './Popup.js';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._popupElement = document.querySelector(this._popupSelector);
    this._form = this._popupElement.querySelector('.form');
    this._submit = submitForm;
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._submit(this._data);
    this._form.removeEventListener('submit', this._handleSubmit);
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._handleSubmit);
    super.setEventListeners();
  }

  open(data) {
    this._data = data;
    super.open();
  }
}