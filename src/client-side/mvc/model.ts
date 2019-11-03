export interface Model {
  name: string;
  age: number;
}
export default class UserModel {
  private _data: Model = null;
  private _onDataChangedHandlers: ((model: Model) => void)[] = [];

  onDataChanged(fn: (model: Model) => void) {
    this._onDataChangedHandlers.push(fn);
  }

  setData(data: Partial<Model>) {
    this._data = {
      ...this._data,
      ...data,
    };
    this._onDataChangedHandlers.forEach(handler => handler(this._data));
  }
}
