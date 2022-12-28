import {render} from './framework/render.js';
import FilterView from './view/filter-view.js';
import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/points-model.js';
import {generateFilter} from './mock/filter.js';

const siteHeader = document.querySelector('.page-header');
const siteFiltersElement = siteHeader.querySelector('.trip-controls__filters');
const siteMain = document.querySelector('.page-body__page-main');
const siteMainSection = siteMain.querySelector('.trip-events');
const pointsModel = new PointsModel();
const listPresenter = new ListPresenter({listContainer: siteMainSection, pointsModel});
const filters = generateFilter(pointsModel.points);

render(new FilterView({filters}), siteFiltersElement);

listPresenter.init(siteMainSection);
