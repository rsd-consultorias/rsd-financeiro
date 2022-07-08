import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  formataStringDataToISO(data: string): Date {
    var dia = '0'.concat(data.split("/")[0]).slice(-2);
    var mes = '0'.concat(data.split("/")[1]).slice(-2);
    var ano = data.split("/")[2];
    var dataHoraAtual = new Date();
    var hora = `${'0'.concat(dataHoraAtual.getHours().toString()).slice(-2)}`;
    var minuto = `${'0'.concat(dataHoraAtual.getMinutes().toString()).slice(-2)}`;
    var segundo = `${'0'.concat(dataHoraAtual.getSeconds().toString()).slice(-2)}`;
    var formatado = `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}-03:00`;
    var dataLocal = new Date(formatado);

    return dataLocal;
  }
}
