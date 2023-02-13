import dayjs from 'dayjs';
import {FilterType} from '../src/const.js';

function humanizePointDate(date, format) {
  return date ? dayjs(date).format(format) : '';
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

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

function isPointFuture (date) {
  return date || dayjs().isAfter(date, 'D');
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateFrom) || isPointFuture(point.dataTo)),
};

export {humanizePointDate, sortByDate, sortByPrice, isDatesEqual, filter};
