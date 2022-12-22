import {
  generateRandomPoint,
  generateDestinations,
  generateOffers,
  generateOffersByType,
  generateBlankPoint} from '../mock/point.js';

const POINT_COUNT = 3;

export default class PointsModel {
  points = Array.from({length: POINT_COUNT}, generateRandomPoint);
  destinations = generateDestinations();
  offers = generateOffers();
  offersByType = generateOffersByType();
  blankPoint = generateBlankPoint();

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getOffersByType() {
    return this.offersByType;
  }

  getPoints() {
    return this.points;
  }

  getBlankPoint() {
    return this.blankPoint;
  }
}
