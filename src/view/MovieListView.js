import Component from "../framework/component.js";

export default class MovieListView extends Component {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <div class="movie-list">
        <h2>Список Фильмов</h2>
        <div id="movie-list" class="card-container"></div>
      </div>
    `;
  }
}
