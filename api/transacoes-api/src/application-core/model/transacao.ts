import { EMessageStatus } from "../enum/message-status.enum";
import { EMessageTipo } from "../enum/message-tipo.enum";

export class MessageEvent {
    public status!: EMessageStatus;
    public tipo!: EMessageTipo;
    public id!: string;
    public data!: Date;
    public transacao!: Transacao;
}

export class Transacao {
    public id!: string;
    public codigoEmpresa!: string;
    public data!: Date;
    public codigo!: string;
    public historico!: string;
    public complemento!: string;
    public eventos: Array<EventoVO> = [];
    public documento!: DocumentoVO;
}

export class EventoVO {
    public id!: string;
    public codigo!: string;
    public valor!: DinheiroVO;
    public natureza!: string;
}

export class DinheiroVO {
    public moeda!: string;
    public valor!: number;
}

export class DocumentoVO {
    public referencia!: string;
    public descricao!: string;
    public tipo!: string;
    public base64: any;
}