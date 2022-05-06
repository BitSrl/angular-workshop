import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-details-info-item',
  templateUrl: './details-info-item.component.html',
  styleUrls: ['./details-info-item.component.scss'],
  host: { class: 'w-25 p-3 text-center'}
})
export class DetailsInfoItemComponent {
  @Input() label: string = '';
  @Input() value: string = '';
}
