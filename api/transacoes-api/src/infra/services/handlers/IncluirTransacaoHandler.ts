import { ITrsansacaoRepository, MessageEvent, Transacao, EMessageTipo } from "../../../application-core";
import { Subscriber } from "./Subscriber";

export class IncluirTransacaoHandler extends Subscriber {
    constructor(private transacaoRepository: ITrsansacaoRepository) {
        super();
    }

    override async handle(message: MessageEvent<Transacao>): Promise<void> {
        if (message.tipo == EMessageTipo.TRANSACAO_INCLUSAO) {
            try {
                message.payload!.eventos.forEach((evento: { valor: any; }) => {
                    if (evento.valor!.valor!.length < 3) {
                        switch (evento.valor!.valor!.length) {
                            case 0: evento.valor!.valor! = '000' + evento.valor!.valor!;
                                break;
                            case 1: evento.valor!.valor! = '00' + evento.valor!.valor!;
                                break;
                            case 2: evento.valor!.valor! = '0' + evento.valor!.valor!;
                                break;
                        }
                    }
                });

                await this.transacaoRepository.incluir(message.payload as Transacao);
            } catch (error) {
                console.error(error);
            }
        }
    }
}
