export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error();
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error();
  }

  getElement() {
    if (!this._element) {
      this._element = this.createElement(this.getTemplate());
    }
    return this._element;
  }

  createElement(template) {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstElementChild;
  }

  removeElement() {
    this._element = null;
  }
}
