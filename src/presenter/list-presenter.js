import PointListView from "../view/point-list-view.js";
import PointEditView from "../view/point-edit-view.js";
import PointAddView from "../view/point-add-view.js";
import PointView from "../view/point-view.js";
import {render} from "../render.js";

export default class ListPresenter {
  listComponent = new PointListView();

  constructor({listContainer}) {
    this.listContainer = listContainer;
  }

  init() {
    render(this.listComponent, this.listContainer);
    render(new PointEditView(), this.listComponent.getElement());
    render(new PointAddView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.listComponent.getElement());
    }
  }
}
