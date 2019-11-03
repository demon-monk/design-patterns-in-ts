import UserModel, { Model } from './model';
interface UserViewHandlers {
  onNameInput: (event: InputEvent) => void;
  onAgeInput: (event: InputEvent) => void;
}
export default class UserView {
  private _element: HTMLElement = null;
  private _nameInput: HTMLInputElement = null;
  private _ageInput: HTMLInputElement = null;
  private _eventHandlers: UserViewHandlers = null;

  constructor(model: UserModel, eventHandlers: UserViewHandlers) {
    this._eventHandlers = eventHandlers;
    this._nameInput = document.createElement('input');
    this._ageInput = document.createElement('input');
    this._element = document.createElement('div');
    this._element.appendChild(this._nameInput);
    this._element.appendChild(this._ageInput);
    model.onDataChanged(this.render);
    this.registerHandlers();
  }

  setParent(parent: HTMLElement) {
    parent.appendChild(this._element);
  }

  private render = (data: Model) => {
    const { name, age } = data;
    this._nameInput.value = name;
    this._ageInput.value = String(age);
  };

  private registerHandlers() {
    this._nameInput.addEventListener('input', this._eventHandlers.onNameInput);
    this._ageInput.addEventListener('input', this._eventHandlers.onAgeInput);
  }
}
