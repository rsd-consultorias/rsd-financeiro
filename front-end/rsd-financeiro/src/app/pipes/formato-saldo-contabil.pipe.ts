import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoSaldoContabil'
})
export class FormatoSaldoContabilPipe implements PipeTransform {



  transform(value: string | number | undefined): string {
    let saldoCredor = value?.toString().includes('-');
    let formatar = value!.toString().replace(/\./g, '').replace(/\,/g, '');
    formatar = formatar.replace(/\./g, '').replace(/\,/g, '').replace(/\-/g, '');

    // formatar = (Number(formatar) / 100).toString().replace(/\./g, '').replace(/\,/g, '').replace(/\-/g, '');

    let grupos = [];

    let centavos = true;
    let contador = 0;
    let ignorarZeroEsquerda = true;

    let contadorZerosEsquerda = 0;
    for(let i = 0; i <= formatar.length - 1; i++ ){
      if(ignorarZeroEsquerda && formatar[i] != '0'){
        contador = i;
        ignorarZeroEsquerda = false;
      }
    }

    if(contadorZerosEsquerda == 0){
      if(formatar.length == 1){
        formatar = '00' + formatar;
      } else if(formatar.length == 2) {
        formatar = '0' + formatar;
      }
    }

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

    // switch (contador) {
    //   case 1: numero = '0,0' + numero;
    //     break;
    //   case 2: numero = '0,' + numero;
    //     break;
    // }

    if (numero) {
      if (!saldoCredor) {
        return numero + ' D';
      } else {
        return numero + ' C';
      }
    } else {
      return '';
    }
  }

}
