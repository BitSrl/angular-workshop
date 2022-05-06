import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieCredits } from 'src/app/models/interfaces/movie.interface';
import { TMDBService } from 'src/app/providers/services/tmdb.service';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('castSublineTpl', { read: TemplateRef }) castSublineTpl: TemplateRef<unknown> | undefined;
  routeSubs: Subscription | undefined;
  creditsSubs: Subscription | undefined;
  credits: MovieCredits | undefined;

  constructor(private activatedRoute: ActivatedRoute, private tmdbService: TMDBService) {
    this.routeSubs = this.activatedRoute.parent?.params?.subscribe({
      next: (params: Params) => {
        this.creditsSubs = this.tmdbService.movieCredits(+params['id'])
          .subscribe({
            next: credits => this.credits = credits
          });
      }
    });
  }

  ngAfterViewInit(): void {
    console.log(this.castSublineTpl?.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.routeSubs) {
      this.routeSubs.unsubscribe();
    }

    if (this.creditsSubs) {
      this.creditsSubs.unsubscribe();
    }
  }
}
