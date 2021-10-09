export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._item = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(){
    this._item.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
