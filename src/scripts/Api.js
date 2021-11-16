export default class Api {

    constructor({ url, token, cohortId }) {
        this._cohortId = cohortId;
        this._token = token;
        this._url = url;
    }

    getUserInfo() {
        return fetch(`${this._url}/${this._cohortId}/users/me`, {
          headers: this._token,
        }).then((result) => {
          return  result.ok ? result.json() : Promise.reject(`Не получены данные профиля: ${result.status} `);
        });
    }
    
}