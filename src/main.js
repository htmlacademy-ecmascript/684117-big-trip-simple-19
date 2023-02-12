import {render} from './framework/render.js';
import ListPresenter from './presenter/list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view';
import PointsApiService from './points-api-service';
import OffersApiService from './offers-api-service';
import DestinationsApiService from './destinations-api-service';

const siteHeader = document.querySelector('.page-header');
const siteFiltersElement = siteHeader.querySelector('.trip-controls__filters');
const siteMain = document.querySelector('.page-body__page-main');
const siteMainSection = siteMain.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.trip-main');
const filterModel = new FilterModel();
const AUTHORIZATION = 'Basic dgjdi74hfdjj84';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple/';
const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION),
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION),
});

const listPresenter = new ListPresenter({
  listContainer: siteMainSection,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteFiltersElement,
  filterModel,
  pointsModel
});

const newPointButtonComponent = new NewPointButtonView ({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  listPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

filterPresenter.init();
listPresenter.init();
pointsModel.init().finally(() => {
  render(newPointButtonComponent, siteHeaderElement);
});
