import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const NoTasksTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
};

function createListEmptyTemplate(filterType) {
  const noTaskTextValue = NoTasksTextType[filterType];
  return `<p class="trip-events__msg">${noTaskTextValue}</p>`;
}

export default class ListEmptyView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createListEmptyTemplate(this.#filterType);
  }
}
