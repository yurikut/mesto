import {
  initialCards,
  profileTitle,
  profileSubtitle,
  editButton,
  addButton,
  popupEditProfile,
  popupAddCard,
  popupPreviewImage,
  previewImage,
  previewImageName,
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
  previewContainer,
} from "../scripts/data.js";

function deleteCard(evt) {
  evt.target.closest('.photos__card').remove();
}

function likeIcon(evt) {
  evt.target.classList.toggle('photos__card-like-button_liked');
}

function createNewCard(name, link) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.photos__card-image');

  cardElement.querySelector('.photos__card-title').textContent = name;
  cardImage.src = link;
  cardImage.alt = 'На фото: ' + name;

  cardElement.querySelector('.photos__card-like-button').addEventListener('click', likeIcon);

  cardElement.querySelector('.photos__card-delete-button').addEventListener('click', deleteCard);

  cardImage.addEventListener('click', function (evt) {
    openPreview(name, link);
  });

  return cardElement;
}

function openPreview(name, link) {
  previewImage.src = link;
  previewImage.alt = 'Фотография местности: ' + name;
  previewImageName.textContent = name;
  openPopup(popupPreviewImage);
}

function showFirstCards() {
  initialCards.forEach((item) => {
    cardContainer.append(createNewCard(item.name, item.link));
  });
}

function openPopupAddCard() {
  formElementCard.reset();
  resetValidation(popupAddCard);
  openPopup(popupAddCard);
}

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEscape);
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEscape);
}

function submitProfile(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

function submitCard(evt) {
  evt.preventDefault();

  cardContainer.prepend(createNewCard(cardNameInput.value, cardLinkInput.value));

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

addButton.addEventListener('click', openPopupAddCard);

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

showFirstCards();
