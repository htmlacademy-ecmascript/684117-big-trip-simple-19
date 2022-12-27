import {DateFormat} from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import {humanizePointDate} from '../utils.js';

function getOffersTemplate(point, offers) {

  return offers.filter((offer) => point.offers.includes(offer.id)).map((el) =>
    `<li class="event__offer">
      <span class="event__offer-title">${el.title}</span>
        &plus;&euro;&nbsp;
       <span class="event__offer-price">${el.price}</span>
     </li>`
  ).join('');
}

function createPointTemplate(point, destinations, offers) {
  const {basePrice = point.base_price, dateFrom = point.date_from, dateTo = point.date_to, type} = point;

  const datePoint = humanizePointDate(dateFrom, DateFormat.DATE_FORMAT);
  const startTime = humanizePointDate(dateFrom, DateFormat.TIME_FORMAT);
  const endTime = humanizePointDate(dateTo, DateFormat.TIME_FORMAT);
  const destination = destinations.find((el) => el.id === point.destination);
  const offersList = getOffersTemplate(point, offers);

  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${datePoint}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${endTime}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offersList}
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
}

export default class PointView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;
  #handleEditClick = null;

  constructor({point, destinations, offers, onEditClick}) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#destinations, this.#offers);
  }

  #editClickHandler = () => {
    this.#handleEditClick();
  };
}
