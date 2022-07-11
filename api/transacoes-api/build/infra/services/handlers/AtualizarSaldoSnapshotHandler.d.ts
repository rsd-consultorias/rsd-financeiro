import { Transacao, MessageEvent } from "../../../application-core";
import { Subscriber } from "./Subscriber";
export declare class AtualizarSaldoSnapshotHandler extends Subscriber {
    private saldo;
    handle(message: MessageEvent<Transacao>): Promise<void>;
}
