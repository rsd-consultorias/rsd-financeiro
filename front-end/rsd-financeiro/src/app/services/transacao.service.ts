import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { APIResponse } from '../models/api.response';
import { Transacao } from '../models/transacao';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  transacoesDescricao: { [codigo: string]: any } = {};

  constructor(private httpClient: HttpClient) {
    this.transacoesDescricao['100'] = {
      codigo: '100', descricao: 'Transação de testes 100',
      eventos: [
        { codigo: '100', descricao: 'Evento 100' },
        { codigo: '101', descricao: 'Evento 101' }
      ]
    };
    this.transacoesDescricao['200'] = {
      codigo: '200', descricao: 'Transação de testes 200',
      eventos: [
        { codigo: '200', descricao: 'Evento 200' },
        { codigo: '201', descricao: 'Evento 201' }
      ]
    };
    this.transacoesDescricao['300'] = {
      codigo: '300', descricao: 'Transação de testes 300',
      eventos: [
        { codigo: '300', descricao: 'Evento 300' },
        { codigo: '301', descricao: 'Evento 301' }
      ]
    };
    this.transacoesDescricao['900'] = {
      codigo: '900', descricao: 'Transação de testes 900',
      eventos: [
        { codigo: '900', descricao: 'Evento 900' },
        { codigo: '901', descricao: 'Evento 901' }
      ]
    };
  }

  public listarTransacoes: Array<any> = [
    {
      codigo: '100', descricao: 'Transação de testes 100',
      eventos: [
        { codigo: '100', descricao: 'Evento 100' },
        { codigo: '101', descricao: 'Evento 101' }
      ]
    },
    {
      codigo: '200', descricao: 'Transação de testes 200',
      eventos: [
        { codigo: '200', descricao: 'Evento 200' },
        { codigo: '201', descricao: 'Evento 201' }
      ]
    },
    {
      codigo: '300', descricao: 'Transação de testes 300',
      eventos: [
        { codigo: '300', descricao: 'Evento 300' },
        { codigo: '301', descricao: 'Evento 301' }
      ]
    },
    {
      codigo: '900', descricao: 'Transação de testes 900',
      eventos: [
        { codigo: '900', descricao: 'Evento 900' },
        { codigo: '901', descricao: 'Evento 901' }
      ]
    }
  ];

  buscarTransacaoPorCodigo(codigo: string): any {
    return this.transacoesDescricao[codigo];
  }

  buscarDescricaoPorCodigo(codigo: string): any {
    return this.transacoesDescricao[codigo];
  }

  public listarTodos(pagina: number, tamanho: number): Observable<Array<Transacao>> {
    return this.httpClient.get<Array<Transacao>>(`http://192.168.100.7:4201/api/v1?pagina=${pagina}&tamanho=${tamanho}`);
  }

  public salvar(transacao: Transacao): Observable<APIResponse<Transacao>> {
    return this.httpClient.put<APIResponse<Transacao>>(`http://192.168.100.7:4201/api/v1`, transacao);
  }
}
