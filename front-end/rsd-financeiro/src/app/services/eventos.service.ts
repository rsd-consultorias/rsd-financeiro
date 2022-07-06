import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  eventosDescricao: {[codigo:string]: any} = {};

  constructor() {
    this.eventosDescricao['100'] = {codigo: '100', descricao: 'Evento de testes 100'};
    this.eventosDescricao['101'] = {codigo: '101', descricao: 'Evento de testes 101'};
    this.eventosDescricao['200'] = {codigo: '200', descricao: 'Evento de testes 200'};
    this.eventosDescricao['201'] = {codigo: '201', descricao: 'Evento de testes 201'};
    this.eventosDescricao['300'] = {codigo: '300', descricao: 'Evento de testes 300'};
    this.eventosDescricao['301'] = {codigo: '301', descricao: 'Evento de testes 301'};
    this.eventosDescricao['900'] = {codigo: '900', descricao: 'Evento de testes 900'};
    this.eventosDescricao['901'] = {codigo: '901', descricao: 'Evento de testes 901'};
   }

  buscarDescricaoPorCodigo(codigo: string): any {
    return this.eventosDescricao[codigo];
  }
}
