import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'runtime' })
export class RuntimePipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 60);
    const hoursStr = (hours > 0 ? `${hours}h` : '');
    const leftover = value - (hours * 60);
    const leftoverStr = (leftover > 0 ? `${leftover}m` : '');
    return  `${hoursStr}` + (hours > 0 ? ` ${leftoverStr}` : `${leftoverStr}`);
  }
}
