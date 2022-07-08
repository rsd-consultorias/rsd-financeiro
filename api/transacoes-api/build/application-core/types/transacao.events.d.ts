import { EMessageStatus } from "../enum/message-status.enum";
import { EMessageTipo } from "../enum/message-tipo.enum";
import { Transacao } from "../model/transacao";
import { MessageEvent } from "./message.event";
export declare class CriarTransacaoEvent implements MessageEvent<Transacao> {
    status: EMessageStatus;
    tipo: EMessageTipo;
    id: string;
    data: Date;
    payload: Transacao;
    version: string;
}
export declare class TransacaoCriadaEvent implements MessageEvent<Transacao> {
    status: EMessageStatus;
    tipo: EMessageTipo;
    id: string;
    data: Date;
    payload: Transacao;
    version: string;
}
export declare class AlterarTransacaoEvent implements MessageEvent<Transacao> {
    status: EMessageStatus;
    tipo: EMessageTipo;
    id: string;
    data: Date;
    payload: Transacao;
    version: string;
}
export declare class TransacaoAlteradaEvent implements MessageEvent<Transacao> {
    status: EMessageStatus;
    tipo: EMessageTipo;
    id: string;
    data: Date;
    payload: Transacao;
    version: string;
}
export declare class ExcluirTransacaoEvent implements MessageEvent<Transacao> {
    status: EMessageStatus;
    tipo: EMessageTipo;
    id: string;
    data: Date;
    payload: Transacao;
    version: string;
}
export declare class TransacaoExcluidaEvent implements MessageEvent<Transacao> {
    status: EMessageStatus;
    tipo: EMessageTipo;
    id: string;
    data: Date;
    payload: Transacao;
    version: string;
}
export declare class AtualizarTransacaoSaldoEvent implements MessageEvent<Transacao> {
    status: EMessageStatus;
    tipo: EMessageTipo;
    id: string;
    data: Date;
    payload: Transacao;
    version: string;
}
export declare class TransacaoSaldoAtualizadoEvent implements MessageEvent<Transacao> {
    status: EMessageStatus;
    tipo: EMessageTipo;
    id: string;
    data: Date;
    payload: Transacao;
    version: string;
}
