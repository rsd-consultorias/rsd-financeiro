import { Transacao, MessageEvent } from "../../../application-core";
import { Subscriber } from "./Subscriber";

export class AtualizarSaldoSnapshotHandler extends Subscriber {
    private saldo: { [codigo: string]: Transacao; } = {};

    override async handle(message: MessageEvent<Transacao>): Promise<void> {
        if (this.saldo[message.payload.codigo] != null) {
            let valorAtual: number = 0;
            let saldoAtual: number = 0;

            message.payload.eventos.forEach(evt => {
                this.saldo[message.payload.codigo].eventos.forEach(evti => {
                    if (evti.codigo == evt.codigo) {
                        saldoAtual = evti.natureza == 'E' ? evti.valor.valor : -evti.valor.valor;
                        valorAtual = evt.natureza == 'E' ? evt.valor.valor : -evt.valor.valor;
                        saldoAtual += valorAtual * 1.0;

                        evti.natureza = saldoAtual < 0 ? 'S' : 'E';
                        evti.valor.valor = Math.abs(saldoAtual);
                    }
                });
            });

        } else {
            this.saldo[message.payload.codigo] = message.payload;
        }
        console.log(`${JSON.stringify(this.saldo, null, 2)}\n`);
        // if (message.tipo == EMessageTipo.TRANSACAO_SALDO) {
        // }
    }
}
