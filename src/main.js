import FilterView from "./view/filter-view.js";
import NewEventButtonView from "./view/new-event-button-view.js";
import {render} from "./render.js";

const siteHeader = document.querySelector('.page-header');
const siteFiltersElement = siteHeader.querySelector('.trip-controls__filters');
const siteHeaderElement = siteHeader.querySelector('.trip-main');

render(new FilterView(), siteFiltersElement);
render(new NewEventButtonView(), siteHeaderElement);
