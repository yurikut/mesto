export default class Card {
  constructor({ link, name }, formSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._formSelector = formSelector;
    this._handleCardClick = handleCardClick;
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
    this._cardImage = this._element.querySelector(".photos__card-image");
    this._element.querySelector(".photos__card-title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = "На карточке изображено: " + this._name;
    this._likeButton = this._element.querySelector(".photos__card-like-button");
    return this._element;
  }

  _likeIcon() {
    this._likeButton.classList.toggle("photos__card-like-button_liked");
  }

  _deleteCard() {
    this._element.remove();
    this._element.innerHTML = "";
  }

  _setEventListeners() {
    this._element
      .querySelector(".photos__card-like-button")
      .addEventListener("click", () => {
        this._likeIcon();
      });

    this._element
      .querySelector(".photos__card-delete-button")
      .addEventListener("click", () => {
        this._deleteCard();
      });

    this._element
      .querySelector(".photos__card-image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }
}
