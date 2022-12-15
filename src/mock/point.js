import {getRandomArrayElement} from '../utils.js';
import {POINT_TYPES} from '../const.js';

const mockOffers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': 1,
        'title': 'Choose the radio station',
        'price': 60,
      },
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': 1,
        'title': 'Upgrade to a business class',
        'price': 120,
      },
      {
        'id': 2,
        'title': 'Add luggage',
        'price': 30,
      },
      {
        'id': 3,
        'title': 'Add meal',
        'price': 15,
      },
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': 1,
        'title': 'Add luggage',
        'price': 30,
      },
      {
        'id': 2,
        'title': 'Add meal',
        'price': 15,
      },
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': 1,
        'title': 'Add meal',
        'price': 15,
      },
      {
        'id': 2,
        'title': 'Add luggage',
        'price': 30,
      },
    ]
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': 1,
        'title': 'Choose seat',
        'price': 5,
      },
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': 1,
        'title': 'Choose seat',
        'price': 5,
      },
    ]
  },
  {
    'type': 'check-in',
    'offers': null,
  },
  {
    'type': 'sightseeing',
    'offers': null,
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': 1,
        'title': 'Choose seat',
        'price': 5,
      },
    ]
  },
];

const mockDestinations = [
  {
    'id': 1,
    'description': 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    'name': 'Chamonix',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.0762563005163317',
        'description': 'Chamonix parliament building'
      }
    ]
  },
  {
    'id': 2,
    'description': 'Amsterdam, is a beautiful city, a true asian pearl, with crowded streets.',
    'name': 'Amsterdam',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.0762563005163317',
        'description': 'Amsterdam parliament building'
      }
    ]
  },
  {
    'id': 3,
    'description': 'Geneva, is a beautiful city, a true asian pearl, with crowded streets.',
    'name': 'Geneva',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.0762563005163317',
        'description': 'Geneva parliament building'
      }
    ]
  },
];

const mockPoints = [
  {
    'base_price': 1100,
    'date_from': '2019-07-10T22:55:56.845Z',
    'date_to': '2019-07-10T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestinations),
    'id': '1',
    'offers': getRandomArrayElement(mockOffers),
    'type': getRandomArrayElement(POINT_TYPES),
  },
  {
    'base_price': 500,
    'date_from': '2019-07-11T11:55:56.845Z',
    'date_to': '2019-07-11T15:22:13.375Z',
    'destination': getRandomArrayElement(mockDestinations),
    'id': '2',
    'offers': getRandomArrayElement(mockOffers),
    'type': getRandomArrayElement(POINT_TYPES),
  },
  {
    'base_price': 2000,
    'date_from': '2019-08-10T10:55:56.845Z',
    'date_to': '2019-08-10T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestinations),
    'id': '3',
    'offers': getRandomArrayElement(mockOffers),
    'type': getRandomArrayElement(POINT_TYPES),
  },
  {
    'base_price': 333,
    'date_from': '2019-09-10T22:55:56.845Z',
    'date_to': '2019-09-11T21:22:13.375Z',
    'destination': getRandomArrayElement(mockDestinations),
    'id': '4',
    'offers': getRandomArrayElement(mockOffers),
    'type': getRandomArrayElement(POINT_TYPES),
  },
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
