import { EMessageStatus } from "../enum/message-status.enum";
import { EMessageTipo } from "../enum/message-tipo.enum";
export declare class MessageEvent {
    status: EMessageStatus;
    tipo: EMessageTipo;
    id: string;
    data: Date;
    transacao: Transacao;
}
export declare class Transacao {
    id: string;
    codigoEmpresa: string;
    data: Date;
    codigo: string;
    historico: string;
    complemento: string;
    eventos: Array<EventoVO>;
    documento: DocumentoVO;
}
export declare class EventoVO {
    id: string;
    codigo: string;
    valor: DinheiroVO;
    natureza: string;
}
export declare class DinheiroVO {
    moeda: string;
    valor: number;
}
export declare class DocumentoVO {
    referencia: string;
    descricao: string;
    tipo: string;
    base64: any;
}
