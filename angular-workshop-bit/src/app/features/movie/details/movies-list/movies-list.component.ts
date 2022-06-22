import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchMovieResult } from 'src/app/models/interfaces/search-movie-response.interface';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent {
  @Input() heading: string | undefined;
  @Input() subheading: string | undefined;
  @Input() movies: Array<SearchMovieResult> | undefined;
  @Output() redirect: EventEmitter<void> = new EventEmitter<void>();
  @Output() relatedMovie: EventEmitter<number> = new EventEmitter<number>();
}