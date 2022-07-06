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

    return new Date(ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2));
  }
}
