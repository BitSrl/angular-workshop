import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs';
import { MovieCredits } from 'src/app/models/interfaces/movie.interface';
import { TMDBService } from 'src/app/providers/services/tmdb.service';
import { UnsubscriptionHandler } from 'src/app/utilities/unsubscription-handler';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent extends UnsubscriptionHandler implements AfterViewInit {
  @ViewChild('castSublineTpl', { read: TemplateRef }) castSublineTpl: TemplateRef<unknown> | undefined;
  credits: MovieCredits | undefined;

  constructor(private activatedRoute: ActivatedRoute, private tmdbService: TMDBService) {
    super();

    this.activatedRoute.parent?.params?.pipe(
      switchMap((params: Params) => this.tmdbService.movieCredits(+params['id'])),
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: credits => this.credits = credits
    });
  }

  ngAfterViewInit(): void {
    console.log(this.castSublineTpl?.elementRef.nativeElement);
  }
}
