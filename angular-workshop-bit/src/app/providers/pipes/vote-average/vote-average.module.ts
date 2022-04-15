import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteAveragePipe } from './vote-average.pipe';

@NgModule({
  declarations: [VoteAveragePipe],
  imports: [CommonModule],
  exports: [VoteAveragePipe],
})
export class VoteAverageModule {}
