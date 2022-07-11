"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtualizarSaldoSnapshotHandler = void 0;
const Subscriber_1 = require("./Subscriber");
class AtualizarSaldoSnapshotHandler extends Subscriber_1.Subscriber {
    constructor() {
        super(...arguments);
        this.saldo = {};
    }
    async handle(message) {
        if (this.saldo[message.payload.codigo] != null) {
            let valorAtual = 0;
            let saldoAtual = 0;
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
        }
        else {
            this.saldo[message.payload.codigo] = message.payload;
        }
        console.log(`${JSON.stringify(this.saldo)}\n`);
        // if (message.tipo == EMessageTipo.TRANSACAO_SALDO) {
        // }
    }
}
exports.AtualizarSaldoSnapshotHandler = AtualizarSaldoSnapshotHandler;
//# sourceMappingURL=AtualizarSaldoSnapshotHandler.js.map