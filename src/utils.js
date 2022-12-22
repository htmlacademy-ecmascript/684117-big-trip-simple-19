import dayjs from 'dayjs';

function humanizePointDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export {getRandomArrayElement, humanizePointDate};
