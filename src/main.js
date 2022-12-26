import FilterView from './view/filter-view.js';
import {render} from './render.js';
import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/points-model.js';

const siteHeader = document.querySelector('.page-header');
const siteFiltersElement = siteHeader.querySelector('.trip-controls__filters');
const siteMain = document.querySelector('.page-body__page-main');
const siteMainSection = siteMain.querySelector('.trip-events');
const pointsModel = new PointsModel();
const listPresenter = new ListPresenter({listContainer: siteMainSection, pointsModel});


render(new FilterView(), siteFiltersElement);

listPresenter.init(siteMainSection);
