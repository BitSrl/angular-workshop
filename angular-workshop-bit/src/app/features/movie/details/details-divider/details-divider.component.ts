import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-details-divider',
  templateUrl: './details-divider.component.html',
  styleUrls: ['./details-divider.component.scss']
})
export class DetailsDividerComponent {
  @HostBinding('class.w-100') get maxWidth() {
    return true;
  }
}
