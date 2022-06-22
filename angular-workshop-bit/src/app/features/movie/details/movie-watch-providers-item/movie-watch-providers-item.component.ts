import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MovieProvidersResponseItem } from 'src/app/models/interfaces/movie.interface';

@Component({
  selector: 'app-movie-watch-providers-item',
  templateUrl: './movie-watch-providers-item.component.html',
  styleUrls: ['./movie-watch-providers-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieWatchProvidersItemComponent {
  @Input() heading: string | undefined;
  @Input() providers: Array<MovieProvidersResponseItem> | undefined;
}
