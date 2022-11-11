import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDateFormat'
})
export class CustomDateFormatPipe implements PipeTransform {

  transform(value:string, ...args: unknown[]): unknown {
    let months=[undefined,'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let date=value.split('-');
    console.log(date[1]);
    return value;
  }

}
