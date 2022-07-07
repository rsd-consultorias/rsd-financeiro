import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  formataStringDataToISO(data: string): Date {
    var dia = data.split("/")[0];
    var mes = data.split("/")[1];
    var ano = data.split("/")[2];
    var dataHoraAtual = new Date();
    var hora = `T${dataHoraAtual.getHours()}:${dataHoraAtual.getMinutes()}:${dataHoraAtual.getSeconds()}-03:00`;
    var dataLocal = new Date(ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2) + hora);

    return dataLocal;
  }
}
