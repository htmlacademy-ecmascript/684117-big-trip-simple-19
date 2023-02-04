import {
  generateRandomPoint,
  generateDestinations,
  generateOffers,
  generateOffersByType,
  generateBlankPoint} from '../mock/point.js';
import Observable from '../framework/observable.js';

const POINT_COUNT = 3;

export default class PointsModel extends Observable {
  #points = Array.from({length: POINT_COUNT}, generateRandomPoint);
  #destinations = generateDestinations();
  #offers = generateOffers();
  #offersByType = generateOffersByType();
  #blankPoint = generateBlankPoint();

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
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

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
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
}
