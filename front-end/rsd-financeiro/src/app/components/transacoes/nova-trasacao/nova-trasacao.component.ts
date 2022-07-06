import { Component, OnInit } from '@angular/core';
import { APIResponse } from 'src/app/models/api.response';
import { EMessageStatus } from 'src/app/models/enum/message-status.enum';
import { DinheiroVO, DocumentoVO, EventoVO, Transacao } from 'src/app/models/transacao';
import { AlertService } from 'src/app/services/alert.service';
import { EventosService } from 'src/app/services/eventos.service';
import { TransacaoService } from 'src/app/services/transacao.service';
import { UtilsService } from 'src/app/services/utils.service';

export class FileUpload {
  public fileContent: any;
  public fileType: string = '';
  public fileSize: string = '';
  public fileName: string = '';
}

@Component({
  selector: 'app-nova-trasacao',
  templateUrl: './nova-trasacao.component.html',
  styleUrls: ['./nova-trasacao.component.scss']
})
export class NovaTrasacaoComponent implements OnInit {
  fileUpload: FileUpload = new FileUpload();
  novaTransacao: Transacao = new Transacao();
  eventos: Array<any> = [{ codigo: '100', descricao: 'Evento de testes 100' }, { codigo: '101', descricao: 'Evento de testes 101' }];
  eventosSelecionados: Array<EventoVO> = [];

  constructor(protected transacaoService: TransacaoService,
    private alertService: AlertService,
    protected eventosService: EventosService,
    protected utilsService: UtilsService) { }

  ngOnInit(): void {
    this.novaTransacao.documento = new DocumentoVO();
    this.novaTransacao.data = new Date();
  }

  incluirEvento(eventoSelecionado: any) {
    let evento = this.eventosService.buscarDescricaoPorCodigo(eventoSelecionado.codigo)! as EventoVO;
    evento.codigo = eventoSelecionado.codigo;
    evento.valor = new DinheiroVO();
    evento.valor.moeda = 'BRL';
    evento.natureza = "";
    this.eventosSelecionados.push(evento);
  }

  removerEvento(indice: number) {
    this.eventosSelecionados.splice(indice, 1);
  }

  validar(transacao: Transacao): boolean {
    let transacaoOk = true;

    if (transacao.data == undefined) {
      transacaoOk = false;
    }

    if (transacao.codigo == undefined) {
      transacaoOk = false;
    }

    if (transacao.eventos.length == 0) {
      transacaoOk = false;
    }

    transacao.eventos.forEach(e => {
      if (!(e.natureza == 'E' || e.natureza == 'S')) {
        transacaoOk = false;
      }
    });

    return transacaoOk;
  }

  salvar() {
    this.novaTransacao.eventos = this.eventosSelecionados;
    if (this.validar(this.novaTransacao)) {
      this.transacaoService.salvar(this.novaTransacao)
        .subscribe((data: APIResponse<Transacao>) => {
          if (data.status == EMessageStatus.QUEUED) {
            this.alertService.warning(data.mensagem);
          } else if (data.status == EMessageStatus.SUCCESS) {
            this.alertService.success(data.mensagem);
          }
          this.novaTransacao = new Transacao();
          this.novaTransacao.documento = new DocumentoVO();
          this.novaTransacao.data = new Date();
          this.fileUpload = new FileUpload();
        });
    } else {
      this.alertService.danger("Há erros no lançamento. Corrija-os antes de salvar.");
    }
  }

  listarEventos(codigoTransacao: string) {
    this.eventosSelecionados = new Array<EventoVO>;
    this.eventos = this.transacaoService.buscarTransacaoPorCodigo(codigoTransacao)!.eventos as Array<EventoVO>;
  }

  async fileChanged(e: any) {
    let file = e.target.files[0] as File;

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileUpload.fileType = file.type;
      if (file.size < (1024 * 1204)) {
        this.fileUpload.fileSize = `${Math.round(((file.size) / 1024))} Kb`;
      } else {
        this.fileUpload.fileSize = `${Math.round(((file.size) / (1024 * 1024)))} Mb`;
      }
      this.fileUpload.fileName = file.name;
      this.fileUpload.fileContent = reader.result;
      this.novaTransacao.documento.base64 = this.fileUpload.fileContent;
      this.novaTransacao.documento.tipo = this.fileUpload.fileType;
    };
  }
}
