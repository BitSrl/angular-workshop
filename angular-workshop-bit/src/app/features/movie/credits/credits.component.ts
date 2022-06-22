import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, switchMap, takeUntil } from 'rxjs';
import { MovieCredits } from 'src/app/models/interfaces/movie.interface';
import { TMDBService } from 'src/app/providers/services/tmdb.service';
import { selectCurrentMovieCredits } from 'src/app/store/selectors/movie.selectors';
import { AppState } from 'src/app/store/states/app.state';
import { UnsubscriptionHandler } from 'src/app/utilities/unsubscription-handler';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent extends UnsubscriptionHandler implements OnInit, AfterViewInit {
  @ViewChild('castSublineTpl', { read: TemplateRef }) castSublineTpl: TemplateRef<unknown> | undefined;
  credits$: Observable<MovieCredits | undefined> | undefined;
  // credits: MovieCredits | undefined;

  constructor(private activatedRoute: ActivatedRoute, private tmdbService: TMDBService, private store: Store<AppState>) {
    super();

    // this.activatedRoute.parent?.params?.pipe(
    //   switchMap((params: Params) => this.tmdbService.movieCredits(+params['id'])),
    //   takeUntil(this.destroy$)
    // )
    // .subscribe({
    //   next: credits => this.credits = credits
    // });
  }

  ngOnInit(): void {
    this.credits$ = this.store.select(selectCurrentMovieCredits);
  }

  ngAfterViewInit(): void {
    console.log(this.castSublineTpl?.elementRef.nativeElement);
  }
}
