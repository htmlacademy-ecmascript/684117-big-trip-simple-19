import FilterView from "./view/filter-view.js";
import {render} from "./render.js";

const siteHeader = document.querySelector('.page-header');
const siteFiltersElement = siteHeader.querySelector('.trip-controls__filters');

render(new FilterView(), siteFiltersElement);
