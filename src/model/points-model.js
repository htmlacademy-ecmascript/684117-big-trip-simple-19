import {
  generateRandomPoint,
  generateDestinations,
  generateOffers,
  generateOffersByType,
  generateBlankPoint} from '../mock/point.js';

const POINT_COUNT = 3;

export default class PointsModel {
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
}
