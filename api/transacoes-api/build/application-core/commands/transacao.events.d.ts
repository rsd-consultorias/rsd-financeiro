import { MessageEvent } from "../model/message.event";
import { Transacao } from "../model/transacao";
export declare class TransacaoCriadaEvent extends MessageEvent {
    transacao: Transacao | any;
}
export declare class TransacaoAlteradaEvent extends MessageEvent {
    transacao: Transacao | any;
}
export declare class TransacaoExcluidaEvent extends MessageEvent {
    transacao: Transacao | any;
}
export declare class TransacaoAtualizarSaldoEvent extends MessageEvent {
    transacao: Transacao | any;
}
export declare class TransacaoSaldoAtualizadoEvent extends MessageEvent {
}
