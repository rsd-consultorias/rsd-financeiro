import { Component, OnInit } from '@angular/core';
import { constantes } from 'src/app/global-contantes';
import { EventosService } from 'src/app/services/eventos.service';
import { TransacaoService } from 'src/app/services/transacao.service';

@Component({
  selector: 'app-listar-transacao',
  templateUrl: './listar-transacao.component.html',
  styleUrls: ['./listar-transacao.component.scss']
})
export class ListarTransacaoComponent implements OnInit {
  timerReloadPagina: any;
  transacoes: Array<any> = [];
  paginas: Array<number> = [];
  ultimaPagina: number = 0;
  constants = constantes;

  constructor(protected transacaoService: TransacaoService,
    protected eventosService: EventosService) { }

  ngOnInit(): void {
    this.listarTodos(0, constantes.MAX_GRID_RECORDS);
  }

  listarTodos(pagina: number, tamanho: number) {
    this.transacaoService.listarTodos(pagina, tamanho).subscribe((data: any) => {
      this.transacoes = data.data;
      this.paginas = data.tamanho;
      this.paginas = [];
      this.ultimaPagina = Math.ceil(data.total / data.tamanho);
      
      for (let i = (pagina - constantes.MAX_GRID_RECORDS / 2) < 0 ? 0 : pagina - constantes.MAX_GRID_RECORDS / 2;  i < pagina + ((pagina - 5) < 0 ? constantes.MAX_GRID_RECORDS : constantes.MAX_GRID_RECORDS / 2) && i < Math.ceil(data.total / data.tamanho); i++) {
        this.paginas.push(i);
      }
    });
  }
}
