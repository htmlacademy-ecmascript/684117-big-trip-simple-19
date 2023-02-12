import {remove, render, RenderPosition} from '../framework/render.js';
import PointListView from '../view/point-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import SortView from '../view/sort-view.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presenter.js';
import {sortByDate, sortByPrice} from '../utils.js';
import {SortType, UserAction, UpdateType, FilterType} from '../const.js';
import {filter} from '../utils.js';
import NewPointPresenter from './new-point-presenter';

export default class ListPresenter {
  #listContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #listComponent = new PointListView();
  #loadingComponent = new LoadingView();
  #sortComponent = null;
  #noPointsComponent = null;

  // #destinations = [];
  // #offers = [];
  // #offersByType = [];
  // #blankPoint = null;
  #addPointComponent = null;
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #newPointPresenter = null;
  #onNewPointDestroy = null;
  #isLoading = true;

  constructor({listContainer, pointsModel, filterModel, onNewPointDestroy}) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#onNewPointDestroy = onNewPointDestroy;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  createPoint() {
    this.#newPointPresenter = new NewPointPresenter({
      // offers: this.#offers,
      destinations: this.destinations,
      point: this.blankPoint,
      offersByType: this.offersByType,
      pointListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#onNewPointDestroy,
    });

    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(this.destinations, this.blankPoint, this.offersByType);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortByDate);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }
    return filteredPoints;
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  get offersByType() {
    return this.#pointsModel.offersByType;
  }

  get blankPoint() {
    return this.#pointsModel.blankPoint;
  }

  init() {
    // this.#destinations = [...this.#pointsModel.destinations];
    // this.#offers = [...this.#pointsModel.offers];
    // this.#offersByType = [...this.#pointsModel.offersByType];
    // this.#blankPoint = this.#pointsModel.blankPoint;

    this.#renderBoard();
  }

  #renderNoPoints() {
    this.#noPointsComponent = new ListEmptyView({
      filterType: this.#filterType
    });

    render(this.#noPointsComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point, destinations, offersByType) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point, destinations, offersByType);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleModeChange = () => {
    if(this.#newPointPresenter !== null) {
      this.#newPointPresenter.destroy();
    }

    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, point) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(point.id).init(point, this.destinations, this.offersByType);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#listContainer);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #clearBoard({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    if(this.#addPointComponent !== null) {
      remove(this.#addPointComponent);
    }

    if(this.#newPointPresenter !== null) {
      this.#newPointPresenter.destroy();
    }

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderPointsList(points, destinations, offersByType) {
    render(this.#listComponent, this.#listContainer);

    // for (let i = 0; i < this.points.length; i++) {
    //   this.#renderPoint(this.points[i], this.destinations, this.offersByType);
    // }

    points.forEach((point) => this.#renderPoint({point: point, destinations: destinations, offersByType: offersByType}));
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#listComponent.element);
  }

  // #renderBoard() {
  //   if (this.#isLoading) {
  //     this.#renderLoading();
  //     return;
  //   }

  //   if (this.points.length === 0) {
  //     this.#renderNoPoints();
  //   } else {
  //     this.#renderSort();
  //     this.#renderPointsList();
  //   }
  // }

  #renderBoard() {
    render(this.#listComponent, this.#listContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.points.length === 0 && !this.#isLoading ) {
      this.#renderNoPoints();
    }

    const points = this.points;
    const destinations = this.destinations;
    const offersByType = this.offersByType;

    this.#renderSort();
    this.#renderPointsList(points, destinations, offersByType);
  }
}
