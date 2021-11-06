export default class Card {
  constructor({ link, name, likes, currentUserId, _id, owner },
              cardSelector,
              handleCardClick, handleLikeClick, handleDeleteIconClick) {
    this._name = name;
    this._link = link;
    this.likes = likes;
    this._userId = currentUserId;
    this._ownerId = owner._id;
    this._cardId = _id;

    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".photos__card")
      .cloneNode(true);
    return cardElement;
  }

  createNewCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._updateLikeIcon();
    this._cardImage = this._element.querySelector(".photos__card-image");
    this._element.querySelector(".photos__card-title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = "На карточке изображено: " + this._name;
    //this._likeButton = this._element.querySelector(".photos__card-like-button");
    return this._element;
  }

  id() {
    return this._cardId;
  }

  _updateLikeIcon() {
    //this._element.querySelector('.photos__card-like-count').textContent = this._likes.length;// пока не реализован
    if (this.isLiked()) this._likeButton.classList.add("photos__card-like-button_liked");
    else this._likeButton.classList.remove("photos__card-like-button_liked");
  }

  setLikesInfo(data) {
    this._likes = data.likes;
    this._updateLikeIcon();
  }

  isLiked() {
    return Boolean(this._likes.find(item => item._id === this._userId));
  }

  _deleteCard() {
    this._element.remove();
    this._element.innerHTML = "";
  }

  _setEventListeners() {
    this._element
      .querySelector(".photos__card-like-button")
      .addEventListener("click", () => {
        this._updateLikeIcon();
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
