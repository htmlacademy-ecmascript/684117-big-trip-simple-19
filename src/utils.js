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

export {getRandomArrayElement, humanizePointDate, updateItem, getRandomPrice};
