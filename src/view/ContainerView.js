import Component from "../framework/component.js";

export default class ContainerView extends Component {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <div class="container">
        <h1>Коллекция Фильмов</h1>
        <section>
          <p>
            Используйте эту коллекцию для отслеживания фильмов, которые вы
            посмотрели или хотите посмотреть. Отмечайте фильмы как просмотренные и
            фильтруйте по статусу.
          </p>
        </section>
        <div id="form-container"></div>
        <div id="filter-container"></div>
        <div id="list-container"></div>
      </div>
    `;
  }
}
