export default class Card {
  constructor({ link, name, likes, isMy, ownerId, isLike }, formSelector, handleCardClick, handleDeleteCardClick, changeLikeIcon) {
    this._name = name;
    this._link = link;
    this.like = likes.length;
    this.isLike = isLike;
    this._isMy = isMy;
    this._ownerId = ownerId; 
    this._formSelector = formSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._changeLikeIcon = changeLikeIcon;
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
    this._toggleLikeIcon();
    if (this._isMy) {
      this._element.querySelector(".photos__card-delete-button")
      .classList.remove(".photos__card-delete-button_hidden");
    }

    return this._element;
  }

  likeIcon() {
    if (this.isLike) {
      likeButton.classList.add("photoscard-like-button_liked");
    } else {
      likeButton.classList.remove("photos__card-like-button_liked");
    }
    this._element.querySelector(".photos__card-like-count").textContent = this.like;
  }


  _deleteCard() {
    this._element.remove();
    this._element.innerHTML = "";
  }

  _setEventListeners() {
    this._element
      .querySelector(".photos__card-like-button")
      .addEventListener("click", () => {
        this._changeLikeIcon(this.ownerId, this.isLike);
      });

    if (this._isMy) {
      this._element
      .querySelector(".photos__card-delete-button")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    }

    this._element
      .querySelector(".photos__card-image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }
}
