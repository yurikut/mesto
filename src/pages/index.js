import "./index.css";
import {
  //initialCards,
  profileTitle,
  profileSubtitle,
  profileAvatar,
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
  apiConfig
} from "../scripts/data.js";

import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import Api from "../scripts/Api";

const api = new Api(apiConfig);

const userData = new UserInfo({
  nameSelector: profileTitle,
  jobSelector: profileSubtitle,
  avatarSelector: profileAvatar
});

let userId = null;

const sectionCards = new Section(
  {
    renderer: (item) => {
      sectionCards.addItem(createCard(item));
    },
  },
  cardContainerSelector
);
const popupCard = new PopupWithForm(popupCardSelector, (value) => {
  popupCard.renderButton(true);
// обернуть в API
  //sectionCards.addItem(createCard(value));
  //popupCard.close();
});
const popupProfile = new PopupWithForm(popupEditProfileSelector, (value) => {
  userData.setUserInfo(value);
  popupProfile.close();
});
const popupPreview = new PopupWithImage(popupPreviewImageSelector);
const profileFormValidator = new FormValidator(config, formElementProfile);
const cardFormValidator = new FormValidator(config, formElementCard);

function createCard(newCard) {
  const card = new Card(newCard, "#card", () => {
    popupPreview.open(newCard);
  });// передать ещё 2 обработчика
  return card.createNewCard();
}

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

//sectionCards.renderItems(items);// передача массива карточек с сервера
popupCard.setEventListeners();
popupPreview.setEventListeners();
popupProfile.setEventListeners();

editButton.addEventListener("click", () => {
  profileFormValidator.resetValidation();
  nameInput.value = userData.getUserInfo().userName;
  jobInput.value = userData.getUserInfo().userJob;
  popupProfile.open();
});

addButton.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  popupCard.open();
});

Promise.all([api.getUserInfo(), api.getInitialCards()])// запрос данных с сервера
.then(([data, items]) => {
  userId = data._id
  userData.setUserInfo({
    userName: data.name,
    userJob: data.about,
    userAvatar: data.avatar
  });
  sectionCards.renderItems(items)
})
.catch(err => console.log(err))// ? не обрабатывает ошибку?
