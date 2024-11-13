import Component from "../framework/component.js";

export default class MovieCardView extends Component {
  constructor(movie) {
    super();
    this._movie = movie;
  }

  getTemplate() {
    return `
      <div class="movie-card" data-id="${this._movie.id}">
        <h3>${this._movie.title}</h3>
        <p>Status: ${this._movie.watched ? "Просмотрен" : "Не просмотрен"}</p>
        <button class="edit-btn">Редактировать</button>
        <button class="delete-btn">Удалить</button>
      </div>
    `;
  }
}
