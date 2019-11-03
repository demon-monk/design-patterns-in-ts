import UserModel from './model';
import UserView from './view';

export default class UserController {
  private _userModel: UserModel = null;

  private _userView: UserView = null;
  constructor() {
    this._userModel = new UserModel();
    this._userView = new UserView(this._userModel, {
      onNameInput: this.onNameChanged.bind(this),
      onAgeInput: this.onAgeChanged.bind(this),
    });
  }

  get view() {
    return this._userView;
  }

  private onNameChanged(event: InputEvent) {
    this._userModel.setData({
      name: event.data,
    });
  }

  private onAgeChanged(event: InputEvent) {
    this._userModel.setData({
      age: parseInt(event.data),
    });
  }
}
