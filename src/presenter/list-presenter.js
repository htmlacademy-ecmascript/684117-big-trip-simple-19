import {render} from '../framework/render.js';
import PointListView from '../view/point-list-view.js';
// import PointAddView from '../view/point-add-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';

export default class ListPresenter {
  #listContainer = null;
  #pointsModel = null;

  #listComponent = new PointListView();
  #sortComponent = new SortView();
  #noPointsComponent = new ListEmptyView();

  #listPoints = [];
  #destinations = [];
  #offers = [];
  #offersByType = [];
  // #blankPoint = null;
  #pointPresenter = new Map();

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

    this.#renderPointsList(container);
  }

  #renderSort(container) {
    render(this.#sortComponent, container);
  }

  #renderNoPoints(container) {
    render(this.#noPointsComponent, container);
  }

  #renderPoint(point, destinations, offers, offersByType) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, destinations, offers, offersByType);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderPointsList(container) {
    if (this.#listPoints.length > 0) {
      this.#renderSort(container);
      render(this.#listComponent, this.#listContainer);
      // render(new PointAddView({point: this.#blankPoint, destinations: this.#destinations, offers: this.#offers, offersByType: this.#offersByType}), this.#listComponent.element);

      for (let i = 0; i < this.#listPoints.length; i++) {
        this.#renderPoint(this.#listPoints[i], this.#destinations, this.#offers, this.#offersByType);
      }
    } else {
      this.#renderNoPoints(container);
    }
  }
}
