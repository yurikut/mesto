import {
  profileTitle,
  profileSubtitle,
  editButton,
  addButton,
  popups,
  popupEditProfile,
  popupAddCard,
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


/*export function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEscape);
}

export function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEscape);
}*/


function createCard(newCard) {
  const card = new Card(newCard, "#card");
  return card.createNewCard();

}

/*function renderCards() {
  initialCards.forEach((item) => {
    cardContainer.append(createCard(item));
  });
}*/



function submitProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}


function submitCard(evt) {
  evt.preventDefault();
  cardContainer.prepend(createCard({name: cardNameInput.value, link: cardLinkInput.value}));
  formElementCard.reset();
  closePopup(popupAddCard);
}

/*function closePopupOnEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}*/


/*function closePopupOnClick() {
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)
        }
    })
  })
}*/



const profileFormValidator = new FormValidator(config, formElementProfile);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(config, formElementCard);
cardFormValidator.enableValidation();

editButton.addEventListener('click', () => {
  profileFormValidator.resetValidation();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
});

addButton.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  openPopup(popupAddCard);
});

formElementProfile.addEventListener('submit', submitProfile);
formElementCard.addEventListener('submit', submitCard);

closePopupOnClick();
renderCards();


