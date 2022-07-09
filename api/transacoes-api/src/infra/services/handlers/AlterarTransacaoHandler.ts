import { EMessageTipo, Transacao, MessageEvent } from "../../../application-core";
import { Subscriber } from "./Subscriber";

export class AlterarTransacaoHandler extends Subscriber {
    override async handle(message: MessageEvent<Transacao>): Promise<void> {
        if (message.tipo == EMessageTipo.TRANSACAO_ALTERACAO) {
        }
    }
}
