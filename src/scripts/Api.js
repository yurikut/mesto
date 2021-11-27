/** @format */

export default class Api {
  constructor({ url, token, cohortId }) {
    this._cohortId = cohortId;
    this._token = token;
    this._url = url;
    this._headers = { authorization: this._token, "Content-Type": "application/json" };
  }

  getUserInfo() {
    return fetch(`${this._url}/${this._cohortId}/users/me`, {
      headers: this._headers,
    }).then((result) => {
      return result.ok ? result.json() : Promise.reject(`Не получены данные профиля: ${result.status} `);
    });
  }

  getInitialCards() {
    return fetch(`${this._url}/${this._cohortId}/cards`, {
      headers: this._headers,
    }).then((result) => {
      return result.ok ? result.json() : Promise.reject(`Не получена база фото: ${result.status} `);
    });
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._url}/${this._cohortId}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((result) => {
      return result.ok ? result.json() : Promise.reject(`Не удалось обновить профиль: ${result.status} `);
    });
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._url}/${this._cohortId}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((result) => {
      return result.ok ? result.json() : Promise.reject(`Не удалось обновить аватар: ${result.status} `);
    });
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}/${this._cohortId}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((result) => {
      return result.ok ? result.json() : Promise.reject(`Не удалось добавить фото: ${result.status} `);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/${this._cohortId}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((result) => {
      return result.ok ? result.json() : Promise.reject(`Не удалось удалить фото ${cardId}: ${result.status} `);
    });
  }

  addLike(cardId) {
    return fetch(`${this._url}/${this._cohortId}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then((result) => {
      return result.ok ? result.json() : Promise.reject(`Не удалось добавить отмеку 'Нравится': ${result.status} `);
    });
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/${this._cohortId}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((result) => {
      return result.ok ? result.json() : Promise.reject(`Не удалось удалить отмеку 'Нравится': ${result.status} `);
    });
  }
}
