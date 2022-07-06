import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarNumero'
})
export class FormatarNumeroPipe implements PipeTransform {

  constructor() {
  }

  transform(value: string | number | undefined): string {
    let formatar = value!.toString().replace(/\./g, '').replace(/\,/g, '');
    formatar = formatar.replace(/\./g, '').replace(/\,/g, '').replace(/\-/g, '');

    let grupos = [];

    let centavos = true;
    let contador = 0;

    for (let i = formatar!.length - 1; i >= 0; i--) {
      if (centavos) {
        if (contador == 2) {
          centavos = false;
          contador = 0;

          if (formatar![i] !== ',' && formatar![i] !== '.') {
            grupos.push(',');
          }
        }
      } else {
        if (contador == 3) {

          if (formatar![i] !== ',' && formatar![i] !== '.') {
            grupos.push('.');
          }
          contador = 0;
        }
      }
      if (formatar![i] !== ',' && formatar![i] !== '.') {
        contador += 1;
        grupos.push(formatar![i]);
      }
    }

    let numero = '';

    grupos.reverse().forEach(item => {
      numero += item;
    });

    if (numero) {
      return numero;
    } else {
      return '';
    }
  }

  async transformAsync(value: string | undefined): Promise<string> {
    return this.transform(value);
  }
}
