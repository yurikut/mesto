import {
  initialCards,
  profileTitle,
  profileSubtitle,
  editButton,
  addButton,
  popupEditProfile,
  popupAddCard,
  popupPreviewImage,
  closeProfileButton,
  closeCardButton,
  closePreviewButton,
  formElementProfile,
  formElementCard,
  nameInput,
  jobInput,
  cardContainer,
  cardNameInput,
  cardLinkInput,
  config
} from "../scripts/data.js";

import Card from "../scripts/Card.js";

import FormValidator from "../scripts/FormValidator.js";


export function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEscape);
}

export function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEscape);
  resetValidation();
}


function renderCards() {
  initialCards.forEach((item) => {
    const card = new Card(item, "#card");
    cardContainer.append(card.createNewCard());
  });
}

function resetValidation() {
  if (document.querySelectorAll(`.${config.inputErrorClass}`)) {
    document
      .querySelectorAll(`.${config.inputErrorClass}`)
      .forEach((errorItem) => {
        errorItem.classList.remove(config.inputErrorClass);
        document.querySelector(`#${errorItem.id}-error`).textContent = "";
        document
          .querySelector(`#${errorItem.id}-error`)
          .classList.remove(config.errorClass);
      });
    } 
};


function submitProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function submitCard(evt) {
  evt.preventDefault();
  const card = new Card({name: cardNameInput.value, link: cardLinkInput.value}, "#card");
  cardContainer.prepend(card.createNewCard());
  formElementCard.reset();
  closePopup(popupAddCard);
}

function closePopupOnEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}



function closePopupOnOverlay(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }
  closePopup(evt.target);
}

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
});



addButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});

closeProfileButton.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

closeCardButton.addEventListener('click', () => {
  closePopup(popupAddCard);
});

closePreviewButton.addEventListener('click', () => {
  closePopup(popupPreviewImage);
});

formElementProfile.addEventListener('submit', submitProfile);
formElementCard.addEventListener('submit', submitCard);

popupEditProfile.addEventListener('click', closePopupOnOverlay);
popupAddCard.addEventListener('click', closePopupOnOverlay);
popupPreviewImage.addEventListener('click', closePopupOnOverlay);

renderCards();

const profileFormValidator = new FormValidator(config, formElementProfile);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, formElementCard);
cardFormValidator.enableValidation();
