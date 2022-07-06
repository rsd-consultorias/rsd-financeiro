import { EMessageStatus } from "../application-core/enum/message-status.enum";
import { EMessageTipo } from "../application-core/enum/message-tipo.enum";
import { Transacao } from "../application-core/model/transacao";
export declare class TransacaoCriadaEvent {
    status: EMessageStatus;
    tipo: EMessageTipo;
    id: string | any;
    data: Date | any;
    transacao: Transacao | any;
}
export declare class TransacaoAlteradaEvent {
    status: EMessageStatus;
    tipo: EMessageTipo;
    id: string | any;
    data: Date | any;
    transacao: Transacao | any;
}
export declare class TransacaoExcluidaEvent {
    status: EMessageStatus;
    tipo: EMessageTipo;
    id: string | any;
    data: Date | any;
    transacao: Transacao | any;
}
export declare class TransacaoAtualizarSaldoEvent {
    status: EMessageStatus;
    tipo: EMessageTipo;
    id: string | any;
    data: Date | any;
    transacao: Transacao | any;
}
export declare class TransacaoSaldoAtualizadoEvent {
    status: EMessageStatus;
    tipo: EMessageTipo;
    id: string | any;
    data: Date | any;
}
