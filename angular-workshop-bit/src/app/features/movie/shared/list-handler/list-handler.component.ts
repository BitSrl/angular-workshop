import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list-handler',
  templateUrl: './list-handler.component.html',
  styleUrls: ['./list-handler.component.scss']
})
export class ListHandlerComponent {
  @Input() list: Array<any> | undefined;
  @Input() itemTemplate: TemplateRef<unknown> | undefined;
  @Input() itemSize: string = '50%';
}
