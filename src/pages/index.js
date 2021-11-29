/** @format */

import "./index.css";
import {
  profileTitle,
  profileSubtitle,
  profileAvatar,
  editButton,
  addButton,
  editAvatarButton,
  popupEditProfileSelector,
  popupCardSelector,
  popupPreviewImageSelector,
  popupEditAvatarSelector,
  formElementProfile,
  formElementCard,
  formElementAvatar,
  nameInput,
  jobInput,
  cardContainerSelector,
  popupWithConfirmSelector,
  config,
  apiConfig,
} from "../utils/data.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

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
    .then((resp) => {
      sectionCards.addItem(createCard(resp));
      popupCard.close();
    })
    .catch((err) => console.log(`Ошибка ${err}`))
    .finally(() => popupCard.renderButton(false));
});

const popupProfile = new PopupWithForm(popupEditProfileSelector, (profileData) => {
  popupProfile.renderButton(true);
  api
    .setUserInfo({
      name: profileData.userName,
      about: profileData.userJob,
    })
    .then((resp) => {
      userData.setUserInfo({
        userName: resp.name,
        userJob: resp.about,
        userAvatar: resp.avatar
      });
      popupProfile.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => popupProfile.renderButton(false));
});

const popupAvatar = new PopupWithForm(popupEditAvatarSelector, (avatarData) => {
  popupAvatar.renderButton(true);
  api
    .setUserAvatar({ avatar: avatarData.avatarLink })
    .then((resp) => {
      userData.setUserInfo({
        userName: resp.name,
        userJob: resp.about,
        userAvatar: resp.avatar
      });
      popupAvatar.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupAvatar.renderButton(false);
    });
});

const popupPreview = new PopupWithImage(popupPreviewImageSelector);

const popupConfirm = new PopupWithConfirm(popupWithConfirmSelector);

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
          api
            .deleteCard(card.id())
            .then(() => {
              card.deleteCard();
              popupConfirm.close();
            })
            .catch((err) => console.log(`Ошибка: ${err}`));
        });
      },
    },
    "#card"
  );
  return card.createNewCard();
}

// валидация форм
const profileFormValidator = new FormValidator(config, formElementProfile);
const cardFormValidator = new FormValidator(config, formElementCard);
const avatarFormValidator = new FormValidator(config, formElementAvatar);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// установка слушателей
popupCard.setEventListeners();
popupPreview.setEventListeners();
popupProfile.setEventListeners();
popupAvatar.setEventListeners();
popupConfirm.setEventListeners();

editButton.addEventListener("click", () => {
  profileFormValidator.resetValidation();
  const {userName, userJob} = userData.getUserInfo()
  nameInput.value = userName;
  jobInput.value = userJob;
  popupProfile.open();
});

addButton.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  popupCard.open();
});

editAvatarButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  popupAvatar.open();
});

// обновление данных с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, items]) => {
    userId = data._id;
    userData.setUserInfo({
      userName: data.name,
      userJob: data.about,
      userAvatar: data.avatar,
    });
    sectionCards.renderItems(items.reverse());
  })
  .catch((err) => console.log(`Ошибка: ${err}`));
