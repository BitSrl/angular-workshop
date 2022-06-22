import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieCast } from 'src/app/models/interfaces/movie.interface';

@Component({
  selector: 'app-movie-cast',
  templateUrl: './movie-cast.component.html',
  styleUrls: ['./movie-cast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCastComponent {
  @Input() cast: Array<MovieCast> = [];
  @Output() viewAllCast: EventEmitter<void> = new EventEmitter<void>();
}