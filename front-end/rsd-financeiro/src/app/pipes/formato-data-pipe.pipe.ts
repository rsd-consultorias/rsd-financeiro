import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoData'
})
export class FormatoDataPipePipe implements PipeTransform {

  transform(value: Date): string {
    console.log(`Data: ${value}`);
    // return `${value.getDay()}/${value.getMonth()}/${value.getFullYear()}`;
    return `${value.toString().substr(8, 2)}/${value.toString().substr(5, 2)}/${value.toString().substr(0, 4)}`;
  }

}
