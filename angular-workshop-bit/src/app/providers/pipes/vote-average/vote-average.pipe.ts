import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'voteAverage' })
export class VoteAveragePipe implements PipeTransform {
  transform(value: number): string {
    return Math.round(value * 10) + '%';
  };
}
