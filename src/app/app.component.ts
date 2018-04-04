import { Component, OnInit } from '@angular/core';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  theaters = [];
  searchResults = [];
  query = '';

  activeTheater;

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.moviesService.getTheaters()
      .subscribe(theaters => {
        this.theaters = theaters;

        this.setActiveTheater(theaters[0]);
      });
  }

  setActiveTheater(theater) {
    this.activeTheater = theater;

    this.searchResults = theater.movies;

    this.query = '';
  }

  search(): void {
    if (!this.query.trim())
      this.searchResults = this.activeTheater.movies;
    else
      this.moviesService.searchMovies(this.query)
        .subscribe(results => {
          if (results.length)
            this.compareResultsToTheaterMovies(results);
          else
            this.searchResults = [];
        });
  }

  compareResultsToTheaterMovies(results) {
    let validResults = [];

    results.forEach(movie => {
      this.activeTheater.movies.forEach(theaterMovie => {
        if (movie.id === theaterMovie.id)
          validResults.push(theaterMovie);
      });
    });

    this.searchResults = validResults;
  }
}
