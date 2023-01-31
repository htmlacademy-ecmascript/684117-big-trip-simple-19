import {render} from '../framework/render.js';
import PointListView from '../view/point-list-view.js';
import PointAddView from '../view/point-add-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import {updateItem, sortByDate, sortByPrice} from '../utils.js';
import {SortType} from '../const.js';

export default class ListPresenter {
  #listContainer = null;
  #pointsModel = null;

  #listComponent = new PointListView();
  #sortComponent = null;
  #noPointsComponent = new ListEmptyView();

  #listPoints = [];
  #destinations = [];
  #offers = [];
  #offersByType = [];
  #blankPoint = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sourcedPoints = [];

  constructor({listContainer, pointsModel}) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init(container) {
    this.#listPoints = [...this.#pointsModel.points.sort(sortByDate)];
    this.#sourcedPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];
    this.#offersByType = [...this.#pointsModel.offersByType];
    this.#blankPoint = this.#pointsModel.blankPoint;

    this.#renderPointsList(container);
  }

  #renderNoPoints(container) {
    render(this.#noPointsComponent, container);
  }

  #renderPoint(point, destinations, offers, offersByType) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point, destinations, offers, offersByType);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#listPoints = updateItem(this.#listPoints, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderSort(container) {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, container);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointsList();
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this.#currentSortType = sortType;
        this.#listPoints.sort(sortByPrice);
        break;
      default:
        this.#listPoints = [...this.#sourcedPoints];
        this.#currentSortType = sortType.DAY;
    }
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPointsList(container) {
    if (this.#listPoints.length > 0) {
      if (!this.#sortComponent) {
        this.#renderSort(container);
      }

      render(this.#listComponent, this.#listContainer);
      render(new PointAddView({point: this.#blankPoint, destinations: this.#destinations, offers: this.#offers, offersByType: this.#offersByType}), this.#listComponent.element);

      for (let i = 0; i < this.#listPoints.length; i++) {
        this.#renderPoint(this.#listPoints[i], this.#destinations, this.#offers, this.#offersByType);
      }
    } else {
      this.#renderNoPoints(container);
    }
  }
}
