import {render} from '../framework/render.js';
import PointListView from '../view/point-list-view.js';
import PointEditView from '../view/point-edit-view.js';
// import PointAddView from '../view/point-add-view.js';
import PointView from '../view/point-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import SortView from '../view/sort-view.js';

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

  init(container) {
    this.#listPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];
    this.#offersByType = [...this.#pointsModel.offersByType];
    // this.#blankPoint = this.#pointsModel.blankPoint;

    if (this.#listPoints.length > 0) {
      render(new SortView(), container);
      render(this.#listComponent, this.#listContainer);
      // render(new PointAddView({point: this.#blankPoint, destinations: this.#destinations, offers: this.#offers, offersByType: this.#offersByType}), this.#listComponent.element);

      for (let i = 0; i < this.#listPoints.length; i++) {
        this.#renderPoint(this.#listPoints[i], this.#destinations, this.#offers, this.#offersByType);
      }
    } else {
      render(new ListEmptyView(), container);
    }
  }

  #renderPoint(point, destinations, offers, offersByType) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      destinations,
      offers,
      onEditClick: () => {
        replacePointToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new PointEditView({
      point,
      destinations,
      offers,
      offersByType,
      onFormSubmit: () => {
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      // onFormClick: () => {
      //   replaceFormToPoint.call(this);
      //   document.removeEventListener('keydown', escKeyDownHandler);
      // }
    });

    function replacePointToForm() {
      this.#listComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    }

    function replaceFormToPoint() {
      this.#listComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    }

    render(pointComponent, this.#listComponent.element);
  }
}
