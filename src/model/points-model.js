import {generateRandomPoint, generateDestinations, generateOffers} from '../mock/point.js';

const POINT_COUNT = 3;

export default class PointsModel {
  points = Array.from({length: POINT_COUNT}, generateRandomPoint);
  destinations = generateDestinations();
  offers = generateOffers();

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getPoints() {
    return this.points;
  }
}
