import PointListView from '../view/point-list-view.js';
import PointEditView from '../view/point-edit-view.js';
// import PointAddView from '../view/point-add-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render.js';

export default class ListPresenter {
  #listContainer = null;
  #pointsModel = null;

  #listComponent = new PointListView();

  #listPoints = [];
  #destinations = [];
  #offers = [];
  #offersByType = [];
  // #blankPoint = null;

  constructor({listContainer, pointsModel}) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#listPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];
    this.#offersByType = [...this.#pointsModel.offersByType];
    // this.#blankPoint = this.#pointsModel.blankPoint;

    render(this.#listComponent, this.#listContainer);
    // render(new PointAddView({point: this.#blankPoint, destinations: this.#destinations, offers: this.#offers, offersByType: this.#offersByType}), this.#listComponent.element);

    for (let i = 0; i < this.#listPoints.length; i++) {
      this.#renderPoint(this.#listPoints[i], this.#destinations, this.#offers, this.#offersByType);
    }
  }

  #renderPoint(point, destinations, offers, offersByType) {
    const pointComponent = new PointView({point, destinations, offers});
    const pointEditComponent = new PointEditView({point, destinations, offers, offersByType});

    const replacePointToForm = () => {
      this.#listComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#listComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const closeEditPopupHandler = () => {
      replaceFormToPoint();
      pointEditComponent.element.querySelector('.event__rollup-btn').removeEventListener('click',
        closeEditPopupHandler);
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
      pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click',
        closeEditPopupHandler);
    });

    pointEditComponent.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#listComponent.element);
  }
}
