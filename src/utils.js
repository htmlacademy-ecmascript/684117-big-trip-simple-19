import dayjs from 'dayjs';
import {FilterType} from '../src/const.js';

function humanizePointDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function sortByPrice(pointA, pointB) {
  if (pointB.basePrice > pointA.basePrice) {
    return 1;
  }
  return -1;
}

function sortByDate(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(pointB.dateFrom);
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

function isPointFuture (date) {
  return dayjs().isBefore(date, 'day') || dayjs().isSame(date, 'day');
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateFrom) || isPointFuture(point.dateTo)),
};

export {humanizePointDate, sortByDate, sortByPrice, isDatesEqual, filter};
