export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    this._profileData = {
      name: this._name.textContent,
      job: this._job.textContent,
    };
    return this._profileData;
  }

  setUserInfo({ userName, userJob }) {
    this._name.textContent = userName;
    this._job.textContent = userJob;
  }
}
