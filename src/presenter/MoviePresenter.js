import { render } from "../framework/render.js";
import ContainerView from "../view/ContainerView.js";
import MovieFormView from "../view/MovieFormView.js";
import MovieListView from "../view/MovieListView.js";
import MovieCardView from "../view/MovieCardView.js";
import FilterView from "../view/FilterView.js";
import { movies as mockMovies } from "../mock/movies.js";

export default class MoviePresenter {
  constructor() {
    this.movies = [...mockMovies];
    this.filteredMovies = this.movies;
    this.containerElement = null;
  }

  init() {
    this.containerElement = document.querySelector("body");

    this.containerView = new ContainerView();
    render(this.containerView, this.containerElement);

    this.formView = new MovieFormView();
    this.listView = new MovieListView();
    this.filterView = new FilterView();

    const container = this.containerView.getElement();

    render(this.formView, container.querySelector("#form-container"));
    render(this.filterView, container.querySelector("#filter-container"));
    render(this.listView, container.querySelector("#list-container"));

    this.renderMovieList();

    this.setEventListeners();
  }

  renderMovieList() {
    const movieListContainer = this.listView
      .getElement()
      .querySelector("#movie-list");
    movieListContainer.innerHTML = "";

    this.filteredMovies.forEach((movie) => {
      const movieCard = new MovieCardView(movie);
      render(movieCard, movieListContainer);
    });
  }

  setEventListeners() {
    this.formView
      .getElement()
      .querySelector("#movie-form")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        const title = this.formView
          .getElement()
          .querySelector("#movie-title").value;
        const watched = this.formView
          .getElement()
          .querySelector("#movie-status").checked;

        const newMovie = {
          id: Date.now(),
          title,
          watched,
          favorite: false,
        };

        this.movies.push(newMovie);
        this.applyFilters();
      });

    this.filterView.getElement().addEventListener("change", () => {
      this.applyFilters();
    });

    this.listView.getElement().addEventListener("click", (evt) => {
      const movieCard = evt.target.closest(".movie-card");
      if (!movieCard) return;
      const movieId = Number(movieCard.dataset.id);

      if (evt.target.classList.contains("delete-btn")) {
        this.deleteMovie(movieId);
      }

      if (evt.target.classList.contains("edit-btn")) {
        this.editMovie(movieId);
      }
    });
  }

  deleteMovie(id) {
    this.movies = this.movies.filter((movie) => movie.id !== id);
    this.applyFilters();
  }

  editMovie(id) {
    const movie = this.movies.find((movie) => movie.id === id);
    const newTitle = prompt("Введите новое название фильма", movie.title);
    if (newTitle !== null) {
      movie.title = newTitle.trim() || movie.title;
      this.applyFilters();
    }
  }

  applyFilters() {
    const statusFilter = this.filterView
      .getElement()
      .querySelector('input[name="status-filter"]:checked').value;
    const favoriteFilter = this.filterView
      .getElement()
      .querySelector("#favorite-filter").checked;

    this.filteredMovies = this.movies.filter((movie) => {
      let statusMatch = true;
      let favoriteMatch = true;

      if (statusFilter === "watched") {
        statusMatch = movie.watched;
      } else if (statusFilter === "unwatched") {
        statusMatch = !movie.watched;
      }

      if (favoriteFilter) {
        favoriteMatch = movie.favorite;
      }

      return statusMatch && favoriteMatch;
    });

    this.renderMovieList();
  }
}
