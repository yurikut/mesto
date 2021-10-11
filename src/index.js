import "./pages/index.css";
import {
  initialCards,
  profileTitle,
  profileSubtitle,
  editButton,
  addButton,
  popupEditProfileSelector,
  popupCardSelector,
  popupPreviewImageSelector,
  formElementProfile,
  formElementCard,
  nameInput,
  jobInput,
  cardContainerSelector,
  config,
} from "./scripts/data.js";

import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import UserInfo from "./scripts/UserInfo.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";

const userData = new UserInfo({
  nameSelector: profileTitle,
  jobSelector: profileSubtitle,
});

const sectionCards = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      sectionCards.addItem(createCard(item));
    },
  },
  cardContainerSelector
);
const popupCard = new PopupWithForm(popupCardSelector, () => {
  const FormData = popupCard._getInputValues();

  sectionCards.addItem(createCard(FormData));

  popupCard.close();
});
const popupProfile = new PopupWithForm(popupEditProfileSelector, () => {
  userData.setUserInfo(popupProfile._getInputValues());
  popupProfile.close();
});
const popupPreview = new PopupWithImage(popupPreviewImageSelector);
const profileFormValidator = new FormValidator(config, formElementProfile);
const cardFormValidator = new FormValidator(config, formElementCard);

function createCard(newCard) {
  const card = new Card(newCard, "#card", () => {
    popupPreview.open(newCard);
  });
  return card.createNewCard();
}

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

sectionCards.renderItems();
popupCard.setEventListeners();
popupPreview.setEventListeners();
popupProfile.setEventListeners();

editButton.addEventListener("click", () => {
  profileFormValidator.resetValidation();
  nameInput.value = userData.getUserInfo().name;
  jobInput.value = userData.getUserInfo().job;
  popupProfile.open();
});

addButton.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  popupCard.open();
});
