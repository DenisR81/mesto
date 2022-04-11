export default class UserInfo {
  constructor({ profileNameSelector, profileJobSelector, profileAvatarSelector }) {
    this._nameElement = document.querySelector(profileNameSelector),
    this._jobElement = document.querySelector(profileJobSelector),
    this._avatar = document.querySelector(profileAvatarSelector)
  }

  getUserInfo () {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    }
  }

  setUserInfo (name, job) {
    this._nameElement.textContent = name,
    this._jobElement.textContent = job
  }

  setAvatarInfo(avatar) {
    this._avatar.src = avatar
    console.log(this._avatar)
  }
  }
