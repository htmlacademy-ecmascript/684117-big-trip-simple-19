import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {POINT_TYPES, DateFormat} from '../const.js';
import {humanizePointDate} from '../utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createTypesTemplate(currentType, pointId) {
  return POINT_TYPES.map((type) =>
    `<div class="event__type-item">
      <input id="event-type-${type}-${pointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${pointId}">${type}</label>
    </div>`
  ).join('');
}

function createOffersTemplate(offersByType, point) {
  const offers = offersByType.find((el) => {if(el.type === point.type){return el.type;}}).offers;

  return offers.map((offer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-${point.id}" type="checkbox" name="event-offer-${offer.title}"
      ${point.offers.filter((el) => el === offer.id).length > 0 ? 'checked' : ''} data-offer-id="${offer.id}">
      <label class="event__offer-label" for="event-offer-${offer.title}-${point.id}">
        <span class="event__offer-title">Add ${offer.title}</span>
        &plus;&euro;&nbsp;
       <span class="event__offer-price">${offer.price}</span>
     </label>
   </div>
 `).join('');
}

function createDestinationsTemplate(destinations) {
  return destinations.map((el) => `<option value="${el.name}">`).join('');
}

function createPointEditTemplate(destinations, point, offersByType) {
  const {basePrice = point.base_price, dateFrom = point.date_from, dateTo = point.date_to, type, id} = point;

  const startDate = humanizePointDate(dateFrom, DateFormat.FORM_DATE_FORMAT);
  const endDate = humanizePointDate(dateTo, DateFormat.FORM_DATE_FORMAT);
  const typesTemplate = createTypesTemplate(type, id);
  const offersTemplate = createOffersTemplate(offersByType, point);
  const destination = destinations.find((el) => el.id === point.destination);
  const destinationTemplate = createDestinationsTemplate(destinations);

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
                ${typesTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${id}">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}">
          <datalist id="destination-list-${id}">
            ${destinationTemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${id}">From</label>
          <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${startDate}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${id}">To</label>
          <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${endDate}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
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
        </section>
      </section>
    </form>
  </li>`
  );
}

export default class PointEditView extends AbstractStatefulView {
  // #offers = null;
  #destinations = null;
  #point = null;
  #offersByType = null;
  #handleFormSubmit = null;
  #handleDeleteClick;
  // #handleFormClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({destinations, point, offersByType, onFormSubmit, onDeleteClick}) {
    super();
    // this.#offers = offers;
    this.#destinations = destinations;
    this._state = point;
    this.#point = Object.assign({}, point);
    this.#offersByType = offersByType;
    this.#handleFormSubmit = onFormSubmit;
    // this.#handleFormClick = onFormClick;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate(this.#destinations, this._state, this.#offersByType);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if(this.#datepickerTo){
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset() {
    this.updateElement(this.#point);
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typePointChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener( 'change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((el) => el.addEventListener('click', this.#offersChangeHandler));
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteHandler);
    this.#setDatepickers();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this._state);
  };

  // #formCloseHandler = (evt) => {
  //   evt.preventDefault();
  //   this.#handleCloseClick(this.#point);
  // };

  #typePointChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains('event__type-input')) {
      this.updateElement({
        offers: [],
        type: evt.target.value,
      });
    }
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    if(this.#destinations.find((el) => el.name === evt.target.value)) {
      this._state.destination = this.#destinations.find((el) => el.name === evt.target.value).id;
      this.updateElement({
        destination: this._state.destination,
      });
    } else {
      evt.target.value = '';
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._state.basePrice = evt.target.value;
    this.updateElement({
      basePrice: +this._state.basePrice,
    });
  };

  #offersChangeHandler = () => {
    const checkedOffers = document.querySelectorAll('.event__offer-checkbox:checked');
    this._setState({
      offers: [...checkedOffers].map((el) => Number(el.dataset.offerId))
    });
  };

  // #offersChangeHandler = () => {
  //   const offerIdArray = [];
  //   this.element.querySelectorAll('.event__offer-checkbox:checked').forEach((el) => {offerIdArray.push(+el.dataset.offerId);});
  //   this._state.offers = offerIdArray;
  // };

  #setDatepickers = () => {
    if(this.element.querySelector(`#event-start-time-${this._state.id}`)) {
      this.#datepickerFrom = flatpickr(
        this.element.querySelector(`#event-start-time-${this._state.id}`),
        {
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.id.dateFrom,
          enableTime: true,
          onChange: this.#dateFromChangeHandler,
        }
      );
    }

    if(this.element.querySelector(`#event-end-time-${this._state.id}`)) {
      this.#datepickerTo = flatpickr(
        this.element.querySelector(`#event-end-time-${this._state.id}`),
        {
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.id.dateTo,
          enableTime: true,
          onChange: this.#dateToChangeHandler,
        }
      );
    }
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #formDeleteHandler = (evt) => {
    evt.preventDefault();
    this._state = this.#point;
    this.#handleDeleteClick(this.#point);
  };
}
