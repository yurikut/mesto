import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupCapture = this._popup.querySelector(".popup__caption");
  }

  open({name, link}) {
    this._popupImage.src = link;
    this._popupImage.alt = "Фотография местности: " + name;
    this._popupCapture.textContent = name;

    super.open();
}
}
