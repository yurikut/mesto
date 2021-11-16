export default class Api {

    constructor({ url, headers, cohortId }) {
        this._cohortId = cohortId;
        this._headers = headers;
        this._url = url;
    }

    getUserInfo() {
        return fetch(`${this._url}/${this._cohortId}/users/me`, {
          headers: this._headers,
        }).then((result) => {
          return  result.ok ? result.json() : Promise.reject(`Не получены данные профиля: ${result.status} `);
        });
    }
    
}