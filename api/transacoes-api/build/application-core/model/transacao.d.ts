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
    centroCustos: string;
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
