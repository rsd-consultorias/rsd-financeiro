import { ITrsansacaoRepository, MessageEvent, Transacao } from "../../../application-core";
import { Subscriber } from "./Subscriber";
export declare class IncluirTransacaoHandler extends Subscriber {
    private transacaoRepository;
    constructor(transacaoRepository: ITrsansacaoRepository);
    handle(message: MessageEvent<Transacao>): Promise<void>;
}
