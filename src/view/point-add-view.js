import AbstractView from '../framework/view/abstract-view.js';
import {POINT_TYPES, DateFormat} from '../const.js';
import {humanizePointDate} from '../utils.js';

function createTypesTemplate(currentType) {
  return POINT_TYPES.map((type) =>
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>
  `).join('');
}

function createOffersTemplate(offersByType, point) {
  const offers = offersByType.find((el) => {if(el.type === point.type){return el.type;}}).offers;

  return offers.map((offer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}"
      ${point.offers.filter((el) => el === offer.id).length > 0 ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${offer.title}-1">
        <span class="event__offer-title">Add ${offer.title}</span>
        &plus;&euro;&nbsp;
       <span class="event__offer-price">${offer.price}</span>
     </label>
   </div>
 `).join('');
}

function createPhotosTemplate(destinations, point) {
  const images = destinations.find((el) => el.id === point.destination).pictures;

  return images.map((el) =>
    `<img class="event__photo" src="${el.src}" alt="${el.description}">`
  ).join('');
}

function createDestinationsTemplate(destinations){
  return destinations.map((el) => `<option value="${el.name}"></option>`);
}

function createPointAddTemplate(offers, destinations, point, offersByType) {
  const {basePrice = point.base_price, dateFrom = point.date_from, dateTo = point.date_to, type} = point;

  const startDate = humanizePointDate(dateFrom, DateFormat.FORM_DATE_FORMAT);
  const endDate = humanizePointDate(dateTo, DateFormat.FORM_DATE_FORMAT);
  const typesTemplate = createTypesTemplate(type);
  const offersTemplate = createOffersTemplate(offersByType, point);
  const destination = destinations.find((el) => el.id === point.destination);
  const destinationTemplate = createDestinationsTemplate(destinations);
  const photosTemplate = createPhotosTemplate(destinations, point);

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
              ${typesTemplate}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${destinationTemplate}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offersTemplate}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${photosTemplate}
          </div>
        </div>
      </section>
    </section>
    </form>
    </li>`
  );
}

export default class PointAddView extends AbstractView {
  #offers = null;
  #destinations = null;
  #point = null;
  #offersByType = null;

  constructor({offers, destinations, point, offersByType}) {
    super();
    this.#offers = offers;
    this.#destinations = destinations;
    this.#point = point;
    this.#offersByType = offersByType;
  }

  get template() {
    return createPointAddTemplate(this.#offers, this.#destinations, this.#point, this.#offersByType);
  }
}
