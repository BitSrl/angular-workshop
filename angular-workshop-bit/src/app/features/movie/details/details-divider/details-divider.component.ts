import { AfterContentInit, Component, ContentChild, ContentChildren, ElementRef, HostBinding, QueryList } from '@angular/core';
import { DetailsInfoItemComponent } from '../details-info-item/details-info-item.component';

@Component({
  selector: 'app-details-divider',
  templateUrl: './details-divider.component.html',
  styleUrls: ['./details-divider.component.scss']
})
export class DetailsDividerComponent implements AfterContentInit {
  @HostBinding('class.w-100') get maxWidth() {
    return true;
  }

  @ContentChildren('info') detailsItems: QueryList<DetailsInfoItemComponent> | undefined;

  ngAfterContentInit(): void {
    console.log(this.detailsItems);
  }
}
