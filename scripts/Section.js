export default class Section {
  constructor({ item, renderer }, containerSelector) {
    this._item = item;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

    this._item.forEach((el) => {
      this._renderer(el);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}
