import {POINT_TYPES, UpdateType} from '../const.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #pointsApiService = null;
  #offersApiService = null;
  #destinationsApiService = null;
  #types = POINT_TYPES;
  #points = [];
  #destinations = [];
  #offersByType = [];
  #blankPoint;

  constructor({pointsApiService, offersApiService, destinationsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#offersApiService = offersApiService;
    this.#destinationsApiService = destinationsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  get types() {
    return this.#types;
  }

  get offersByType() {
    return this.#offersByType;
  }

  get points() {
    return this.#points;
  }

  get blankPoint() {
    return this.#blankPoint;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      this.#destinations = await this.#destinationsApiService.destinations;
      this.#offersByType = await this.#offersApiService.offers;
      this.#blankPoint = this.#points[0];
    } catch(err) {
      this.#points = null;
      this.#destinations = null;
      this.#blankPoint = null;
      this.#offersByType = null;
    }

    this._notify(UpdateType.INIT, null);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];

    return adaptedPoint;
  }
}
