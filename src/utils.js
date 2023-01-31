import dayjs from 'dayjs';

function humanizePointDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

function getRandomPrice() {
  return Math.floor(Math.random() * 1000);
}

function sortByPrice(pointA, pointB) {
  if (pointB.base_price > pointA.base_price) {
    return 1;
  }
  return -1;
}

function sortByDate(pointA, pointB) {
  return dayjs(pointA.date_from).diff(pointB.date_from);
}

export {getRandomArrayElement, humanizePointDate, updateItem, getRandomPrice, sortByDate, sortByPrice};
