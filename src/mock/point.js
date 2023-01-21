import {getRandomArrayElement, getRandomPrice} from '../utils.js';
import {POINT_TYPES} from '../const.js';

const mockOffersByType = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': 5,
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
    'type': 'train',
    'offers': [
      {
        'id': 3,
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
        'id': 4,
        'title': 'Choose seat',
        'price': 5,
      },
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': 4,
        'title': 'Choose seat',
        'price': 5,
      },
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': 3,
        'title': 'Add meal',
        'price': 15,
      },
    ]
  },
  {
    'type': 'sightseeing',
    'offers': [
      {
        'id': 3,
        'title': 'Add meal',
        'price': 15,
      },
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': 4,
        'title': 'Choose seat',
        'price': 5,
      },
    ]
  },
];

const mockOffers = [
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
  {
    'id': 4,
    'title': 'Choose seat',
    'price': 5,
  },
  {
    'id': 5,
    'title': 'Choose the radio station',
    'price': 60,
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
  {
    'id': 4,
    'description': 'Moscow, is a beautiful city, a true asian pearl, with crowded streets.',
    'name': 'Moscow',
    'pictures': [
      {
        'src': 'http://picsum.photos/300/200?r=0.0762563005163317',
        'description': 'Moscow parliament building'
      }
    ]
  },
];

const mockPoints = [
  {
    'base_price': getRandomPrice(),
    'date_from': '2022-12-29T22:55:56.845Z',
    'date_to': '2022-12-30T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'id': '1',
    'offers': '',
    'type': getRandomArrayElement(POINT_TYPES),
  },
  {
    'base_price': getRandomPrice(),
    'date_from': '2023-01-28T11:55:56.845Z',
    'date_to': '2023-01-28T15:22:13.375Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'id': '2',
    'offers': '',
    'type': getRandomArrayElement(POINT_TYPES),
  },
  {
    'base_price': getRandomPrice(),
    'date_from': '2020-12-29T10:55:56.845Z',
    'date_to': '2020-12-29T11:22:13.375Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'id': '3',
    'offers': '',
    'type': getRandomArrayElement(POINT_TYPES),
  },
  {
    'base_price': getRandomPrice(),
    'date_from': '2020-09-10T22:55:56.845Z',
    'date_to': '2020-09-11T21:22:13.375Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'id': '4',
    'offers': '',
    'type': getRandomArrayElement(POINT_TYPES),
  },
];

const blankPoint = {
  'base_price': 333,
  'date_from': '2019-09-10T22:55:56.845Z',
  'date_to': '2019-09-11T21:22:13.375Z',
  'destination': getRandomArrayElement(mockDestinations).id,
  'offers': '',
  'type': getRandomArrayElement(POINT_TYPES),
};

function generateOffers() {
  return mockOffers;
}

function generateOffersByType() {
  return mockOffersByType;
}

function generateDestinations() {
  return mockDestinations;
}

function generateRandomPoint() {
  const point = getRandomArrayElement(mockPoints);

  point.offers = mockOffersByType
    .find((el) => el.type === point.type).offers
    .map((offer) => (offer.id));

  return point;
}

function generateBlankPoint() {
  blankPoint.offers = mockOffersByType
    .find((el) => el.type === blankPoint.type).offers
    .map((offer) => (offer.id));

  return blankPoint;
}

export {generateRandomPoint, generateDestinations, generateOffers, generateOffersByType, generateBlankPoint};
