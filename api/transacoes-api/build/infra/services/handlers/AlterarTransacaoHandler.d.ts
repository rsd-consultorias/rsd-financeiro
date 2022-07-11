import { Transacao, MessageEvent } from "../../../application-core";
import { Subscriber } from "./Subscriber";
export declare class AlterarTransacaoHandler extends Subscriber {
    handle(message: MessageEvent<Transacao>): Promise<void>;
}
