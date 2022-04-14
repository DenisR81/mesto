export default class Section {
  constructor (containerSelector) {
    this._container = document.querySelector(containerSelector);
  }
  
  addItem = (item) => {
    this._container.prepend(item);
  }

  renderItems(items, renderer) { 
    this._renderedItems = items;
    this._renderer = renderer;
    this._renderedItems.forEach((item) => { 
      this._renderer(item); 
  });
  }
}
