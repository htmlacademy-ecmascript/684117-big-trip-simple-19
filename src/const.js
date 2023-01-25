const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DateFormat = {
  DATE_FORMAT: 'MMM DD',
  TIME_FORMAT: 'HH:mm',
  FORM_DATE_FORMAT: 'YY/MM/DD hh:mm',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
};

const SortType = {
  DAY: 'sort-day',
  PRICE: 'sort-price',
};

export {POINT_TYPES, DateFormat, FilterType, SortType};
