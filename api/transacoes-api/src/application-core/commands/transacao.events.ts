import { MessageEvent } from "../model/message.event";
import { Transacao } from "../model/transacao";

export class TransacaoCriadaEvent extends MessageEvent {
    public transacao: Transacao | any;
}

export class TransacaoAlteradaEvent extends MessageEvent {
    public transacao: Transacao | any;
}

export class TransacaoExcluidaEvent extends MessageEvent {
    public transacao: Transacao | any;
}

export class TransacaoAtualizarSaldoEvent extends MessageEvent {
    public transacao: Transacao | any;
}

export class TransacaoSaldoAtualizadoEvent extends MessageEvent {
    
}