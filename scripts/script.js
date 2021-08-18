const profileTitle = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__job');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-image-button');
const popupEditProfile = document.querySelector('.popup_style_edit-profile');
const popupAddCard = document.querySelector('.popup_style_add-card');
const popupPreviewImage = document.querySelector('.popup_style_preview-image');
const closeButtonProfile = popupEditProfile.querySelector('.popup__close-button');
const closeButtonCard = popupAddCard.querySelector('.popup__close-button');
const closeButtonPreview = popupPreviewImage.querySelector('.popup__close-button');
const formElementProfile = popupEditProfile.querySelector('.form');
const formElementCard = popupAddCard.querySelector('.form');
const nameInput = formElementProfile.querySelector('.form__input_el_name');
const jobInput = formElementProfile.querySelector('.form__input_el_about');
const cardContainer = document.querySelector('.photos');
const cardNameInput = formElementCard.querySelector('.form__input_el_title');
const cardLinkInput= formElementCard.querySelector('.form__input_el_link');
const previewContainer = document.querySelector('.popup__container_style_preview-image');


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

  

function deleteCard (evt) {
    evt.target.closest('.photos__card').remove();
}

function likeIcon (evt) {
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

    cardImage.addEventListener('click', function(evt){
        openPreview(name, link);
    });

    return cardElement;
}

function openPreview(name, link) {
  if (previewContainer.querySelector('.popup__figure') !== null) previewContainer.querySelector('.popup__figure').remove();
  const previewTemplate = document.querySelector('#preview-image').content;
  const previewElement = previewTemplate.cloneNode(true);
  const popupImage = previewElement.querySelector('.popup__image');

  popupImage.src = link;
  popupImage.alt = 'Фотография местности: ' + name;
  previewElement.querySelector('.popup__caption').textContent = name;

  previewContainer.append(previewElement);

  openPopup(popupPreviewImage);
}

function showFirstCards() {
    initialCards.forEach(item => {cardContainer.append(createNewCard(item.name, item.link)); }       
    )    
}

function openPopup (popupName) {
    popupName.classList.add('popup_opened');
}

function closePopup (popupName) {
    popupName.classList.remove('popup_opened');
}

function submitProfile (evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    closePopup(popupEditProfile);
}

function submitCard (evt) {
    evt.preventDefault();
    
    cardContainer.prepend(createNewCard(cardNameInput.value, cardLinkInput.value));

    closePopup(popupAddCard);

    cardNameInput.value = "";
    cardLinkInput.value = "";
}

showFirstCards();

editButton.addEventListener('click', function () {
    if (!popupEditProfile.classList.contains('popup_opened')) {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileSubtitle.textContent;    
    }
    openPopup(popupEditProfile);
});

addButton.addEventListener('click', function () {
    openPopup(popupAddCard);
});

closeButtonProfile.addEventListener('click', function () {
    closePopup(popupEditProfile);
});

closeButtonCard.addEventListener('click', function () {
    closePopup(popupAddCard);
    cardNameInput.value = "";
    cardLinkInput.value = "";
});

closeButtonPreview.addEventListener('click', function () {
    closePopup(popupPreviewImage);
});

formElementProfile.addEventListener('submit', submitProfile);
formElementCard.addEventListener('submit', submitCard);