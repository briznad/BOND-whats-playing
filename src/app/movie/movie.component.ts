import { Component, OnInit, Input } from '@angular/core';

import { MoviesService }  from '../movies.service';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: [ './movie.component.scss' ]
})
export class MovieComponent implements OnInit {
  @Input() movie;

  movieDetails;

  constructor(
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.moviesService.getMovie(this.movie.id)
      .subscribe(movie => this.movieDetails = movie);
  }
}
