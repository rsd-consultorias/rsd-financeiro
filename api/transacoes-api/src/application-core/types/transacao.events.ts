import { EMessageStatus } from "../enum/message-status.enum";
import { EMessageTipo } from "../enum/message-tipo.enum";
import { Transacao } from "../model/transacao";
import { MessageEvent } from "./message.event";

export class CriarTransacaoEvent implements MessageEvent<Transacao> {
    status!: EMessageStatus;
    tipo!: EMessageTipo;
    id!: string;
    data!: Date;
    payload!: Transacao;
    version!: string;
}

export class TransacaoCriadaEvent implements MessageEvent<Transacao> {
    status!: EMessageStatus;
    tipo!: EMessageTipo;
    id!: string;
    data!: Date;
    payload!: Transacao;
    version!: string;
}

export class AlterarTransacaoEvent implements MessageEvent<Transacao> {
    status!: EMessageStatus;
    tipo!: EMessageTipo;
    id!: string;
    data!: Date;
    payload!: Transacao;
    version!: string;
}

export class TransacaoAlteradaEvent implements MessageEvent<Transacao> {
    status!: EMessageStatus;
    tipo!: EMessageTipo;
    id!: string;
    data!: Date;
    payload!: Transacao;
    version!: string;
}

export class ExcluirTransacaoEvent implements MessageEvent<Transacao> {
    status!: EMessageStatus;
    tipo!: EMessageTipo;
    id!: string;
    data!: Date;
    payload!: Transacao;
    version!: string;
}

export class TransacaoExcluidaEvent implements MessageEvent<Transacao> {
    status!: EMessageStatus;
    tipo!: EMessageTipo;
    id!: string;
    data!: Date;
    payload!: Transacao;
    version!: string;
}

export class AtualizarTransacaoSaldoEvent implements MessageEvent<Transacao> {
    status!: EMessageStatus;
    tipo!: EMessageTipo;
    id!: string;
    data!: Date;
    payload!: Transacao;
    version!: string;
}

export class TransacaoSaldoAtualizadoEvent implements MessageEvent<Transacao> {
    status!: EMessageStatus;
    tipo!: EMessageTipo;
    id!: string;
    data!: Date;
    payload!: Transacao;
    version!: string;

}