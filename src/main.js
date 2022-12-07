import NewEventButtonView from "./view/new-event-button-view";
import {render} from "./render.js";

const siteHeader = document.querySelector('.page-header');
const siteHeaderElement = siteHeader.querySelector('.trip-main');

render(new NewEventButtonView(), siteHeaderElement);
