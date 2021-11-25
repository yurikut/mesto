/** @format */

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
  popupWithConfirmSelector,
  config,
  apiConfig,
} from "../scripts/data.js";

import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import UserInfo from "../scripts/UserInfo.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import Api from "../scripts/Api";
import PopupWithConfirm from "../scripts/PopupWithConfirm";

const api = new Api(apiConfig);

const userData = new UserInfo({
  nameSelector: profileTitle,
  jobSelector: profileSubtitle,
  avatarSelector: profileAvatar,
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

const popupCard = new PopupWithForm(popupCardSelector, (cardData) => {
  popupCard.renderButton(true);

  api
    .addNewCard(cardData)
    .then((cardData) => {
      sectionCards.addItem(createCard(cardData));
      popupCard.close();
    })
    .catch((err) => console.log(`Ошибка ${err}`))
    .finally(() => popupCard.renderButton(false));
});

const popupProfile = new PopupWithForm(popupEditProfileSelector, (value) => {
  popupProfile.renderButton(true);
  api
    .setUserInfo({
      name: value.userName,
      about: value.userJob,
    })
    .then((value) => {
      userData.setUserInfo({
        userName: value.name,
        userJob: value.about,
      });
      popupProfile.close();
    })
    .catch((err) => console.log(`Не удалось обновить информацию о пользователе: ${err}`))
    .finally(() => popupProfile.renderButton(false));
});

const popupPreview = new PopupWithImage(popupPreviewImageSelector);

const popupConfirm = new PopupWithConfirm(popupWithConfirmSelector);

const profileFormValidator = new FormValidator(config, formElementProfile);
const cardFormValidator = new FormValidator(config, formElementCard);

function createCard(newCard) {
  const card = new Card(
    {
      data: { ...newCard, currentUserId: userId },
      handleCardClick: () => {
        popupPreview.open(newCard);
      },

      handleLikeClick: () => {
        if (card.isLiked()) {
          api
            .deleteLike(card.id())
            .then((res) => {
              card.setLikesInfo(res);
            })
            .catch((err) => console.log(err));
        } else {
          api
            .addLike(card.id())
            .then((res) => {
              card.setLikesInfo(res);
            })
            .catch((err) => console.log(err));
        }
      },

      handleDeleteIconClick: () => {
        popupConfirm.open();
        popupConfirm.setConfirmAction(() => {
          api.deleteCard(card.id())
            .then(() => {
              card.deleteCard();
              popupConfirm.close();
            })
            .catch(err => console.log(`Ошибка: ${err}`));
      });
    },
  }, "#card");
  console.log(newCard);
  return card.createNewCard();
}


profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

//sectionCards.renderItems(items);// передача массива карточек с сервера
popupCard.setEventListeners();
popupPreview.setEventListeners();
popupProfile.setEventListeners();
popupConfirm.setEventListeners();

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

Promise.all([api.getUserInfo(), api.getInitialCards()]) // запрос данных с сервера
  .then(([data, items]) => {
    userId = data._id;
    console.log(data);
    userData.setUserInfo({
      userName: data.name,
      userJob: data.about,
      userAvatar: data.avatar,
    });
    sectionCards.renderItems(items.reverse());
    console.log(items);
  })
  .catch((err) => console.log(err)); // ? не обрабатывает ошибку?
