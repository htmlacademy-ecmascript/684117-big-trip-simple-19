import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import {render} from './render.js';
import ListPresenter from './presenter/list-presenter.js';

const siteHeader = document.querySelector('.page-header');
const siteFiltersElement = siteHeader.querySelector('.trip-controls__filters');
const siteMain = document.querySelector('.page-body__page-main');
const siteMainSection = siteMain.querySelector('.trip-events');
const listPresenter = new ListPresenter({listContainer: siteMainSection});

render(new FilterView(), siteFiltersElement);
render(new SortView(), siteMainSection);

listPresenter.init();
