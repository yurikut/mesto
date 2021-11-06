export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._profileData = {
      userName: this._name.textContent,
      userJob: this._job.textContent,
      userAvatar: this._avatar
    };
    return this._profileData;
  }

  setUserInfo({ userName, userJob, userAvatar }) {
    this._name.textContent = userName;
    this._job.textContent = userJob;
    this._avatar.src = userAvatar;
  }
}
