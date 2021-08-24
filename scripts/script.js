const profileTitle = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__job');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-image-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupPreviewImage = document.querySelector('.popup_type_preview-image');
const previewImage = popupPreviewImage.querySelector('.popup__image');
const previewImageName = popupPreviewImage.querySelector('.popup__caption');
const closeProfileButton = popupEditProfile.querySelector('.popup__close-button');
const closeCardButton = popupAddCard.querySelector('.popup__close-button');
const closePreviewButton = popupPreviewImage.querySelector('.popup__close-button');
const formElementProfile = popupEditProfile.querySelector('.form');
const formElementCard = popupAddCard.querySelector('.form');
const nameInput = formElementProfile.querySelector('.form__input_el_name');
const jobInput = formElementProfile.querySelector('.form__input_el_about');
const cardContainer = document.querySelector('.photos');
const cardNameInput = formElementCard.querySelector('.form__input_el_title');
const cardLinkInput = formElementCard.querySelector('.form__input_el_link');
const previewContainer = document.querySelector('.popup__container_type_preview-image');

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
