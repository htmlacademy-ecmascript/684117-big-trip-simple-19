const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DateFormat = {
  DATE_FORMAT: 'MMM DD',
  TIME_FORMAT: 'HH:mm',
  FORM_DATE_FORMAT: 'DD/MM/YY hh:mm',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
};

const SortType = {
  DAY: 'sort-day',
  PRICE: 'sort-price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export {POINT_TYPES, DateFormat, FilterType, SortType, UserAction, UpdateType};
