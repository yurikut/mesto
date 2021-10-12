export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._profileData = {
      name: this._name.textContent,
      abaut: this._job.textContent,
      avatar: this._avatar.src
    };
    return this._profileData;
  }

  setUserInfo( name, about, avatar ) {
    this._name.textContent = name;
    this._job.textContent = about;
    this.setUserAvatar(avatar);
    this._avatar.alt = `${name} аватар`;
  }

  setUserAvatar( avatar ) {
    this._avatar.src = avatar;
  }
}
