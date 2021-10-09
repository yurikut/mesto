export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
export const popupEditProfileSelector = ".popup_type_edit-profile";
export const popupCardSelector = ".popup_type_add-card";
export const popupPreviewImageSelector = ".popup_type_preview-image";
export const profileTitle = ".profile__name";
export const profileSubtitle = ".profile__job";
export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-image-button");
export const popups = document.querySelectorAll(".popup");
export const popupEditProfile = document.querySelector(
  ".popup_type_edit-profile"
);
export const popupAddCard = document.querySelector(".popup_type_add-card");
export const popupPreviewImage = document.querySelector(
  ".popup_type_preview-image"
);
export const popupImage = popupPreviewImage.querySelector(".popup__image");
export const popupCapture = popupPreviewImage.querySelector(".popup__caption");
export const previewImage = popupPreviewImage.querySelector(".popup__image");
export const previewImageName =
  popupPreviewImage.querySelector(".popup__caption");
export const closeProfileButton = popupEditProfile.querySelector(
  ".popup__close-button"
);
export const closeCardButton = popupAddCard.querySelector(
  ".popup__close-button"
);
export const closePreviewButton = popupPreviewImage.querySelector(
  ".popup__close-button"
);
export const formElementProfile = popupEditProfile.querySelector(".form");
export const formElementCard = popupAddCard.querySelector(".form");
export const nameInput = formElementProfile.querySelector(
  ".form__input_el_name"
);
export const jobInput = formElementProfile.querySelector(
  ".form__input_el_about"
);
export const cardContainerSelector = ".photos";
export const cardContainer = document.querySelector(".photos");
export const cardNameInput = formElementCard.querySelector(
  ".form__input_el_title"
);
export const cardLinkInput = formElementCard.querySelector(
  ".form__input_el_link"
);
export const previewContainer = document.querySelector(
  ".popup__container_type_preview-image"
);

export const config = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_visible",
};
