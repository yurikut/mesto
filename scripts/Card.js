import { popupPreviewImage, closePreviewButton } from "./data.js";
import { closePopup, openPopup } from "./index.js";

export default class Card {

    constructor(data, formSelector) {
        this._name = data.name;
        this._link = data.link;
        this._formSelector = formSelector;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._formSelector)
          .content.querySelector(".photos__card")
          .cloneNode(true);
    
        return cardElement;
    }

    createNewCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const cardImage = this._element.querySelector(".photos__card-image");
        this._element.querySelector(".photos__card-title").textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = "На карточке изображено: " + this._name;
        return this._element;
    }


    _handleLikeIcon() {
        this._element
          .querySelector(".photos__card-like-button")
          .classList.toggle("photos__card-like-button_liked");
    }

    _deleteCard() {
        this._element.remove();
    }

    _openPreview() {
        const popupImage = popupPreviewImage.querySelector(".popup__image");
        const popupCapture = popupPreviewImage.querySelector(".popup__caption");
    
        popupImage.src = this._link;
        popupImage.alt = "Фотография местности: " + this._name;
        popupCapture.textContent = this._name;
    
        openPopup(popupPreviewImage);
    }

    _setEventListeners() {
        this._element
          .querySelector(".photos__card-like-button")
          .addEventListener("click", () => {
            this._handleLikeIcon();
          });
    
        this._element
          .querySelector(".photos__card-delete-button")
          .addEventListener("click", () => {
            this._deleteCard();
          });
    
        this._element
          .querySelector(".photos__card-image")
          .addEventListener("click", () => {
            this._openPreview();
          });
    
        closePreviewButton.addEventListener("click", () => {
          closePopup(popupPreview);
        });
      
    }

}

