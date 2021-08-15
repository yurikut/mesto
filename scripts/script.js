const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
let formElement = popup.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_el_name');
let jobInput = formElement.querySelector('.form__input_el_about');
let profileTitle = profile.querySelector('.profile__name');
let profileSubtitle = profile.querySelector('.profile__job');

const popupToggle = function() {
    if (!popup.classList.contains('popup_opened')) {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileSubtitle.textContent;
    }
    popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', popupToggle);
closeButton.addEventListener('click', popupToggle);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
