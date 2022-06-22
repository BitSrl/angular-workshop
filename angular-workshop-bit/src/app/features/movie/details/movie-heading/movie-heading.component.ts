import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Movie, MovieCrew } from 'src/app/models/interfaces/movie.interface';

@Component({
  selector: 'app-movie-heading',
  templateUrl: './movie-heading.component.html',
  styleUrls: ['./movie-heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieHeadingComponent {
  @Input() movie: Movie | undefined | null;
  @Input() director: MovieCrew | undefined;
}
