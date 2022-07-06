"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransacaoCommands = void 0;
const transacao_factory_1 = require("../factories/transacao.factory");
class TransacaoCommands {
    constructor(serviceBus) {
        this.serviceBus = serviceBus;
    }
    async criarTransacao(transacao) {
        let transacaoCriada = transacao_factory_1.TransacaoFactory.makeTransacaoCriadaEvent(transacao);
        transacaoCriada.status = await this.serviceBus.publish(transacaoCriada, 'NOVAS_TRANSACOES');
        ;
        return transacaoCriada;
    }
    alterarTransacao(transacao) {
        return transacao_factory_1.TransacaoFactory.makeTransacaoAlteradaEvent(transacao);
    }
    excluirTransacao(transacao) {
        return transacao_factory_1.TransacaoFactory.makeTransacaoExcluidaEvent(transacao);
    }
    atualizarSaldos(event) {
        return {};
    }
}
exports.TransacaoCommands = TransacaoCommands;
