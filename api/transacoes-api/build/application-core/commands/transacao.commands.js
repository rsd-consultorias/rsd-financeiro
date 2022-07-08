"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransacaoCommands = void 0;
const transacao_factory_1 = require("../factories/transacao.factory");
const constants_1 = require("../types/constants");
class TransacaoCommands {
    constructor(serviceBus) {
        this.serviceBus = serviceBus;
    }
    async criarTransacao(transacao) {
        // Regras de negócio -> domais services
        return await this.serviceBus.publish(transacao_factory_1.TransacaoFactory.makeCriarTransacaoEvent(transacao), constants_1.Constants.QUEUE_CRIAR_TRANSACOES);
    }
    async alterarTransacao(transacao) {
        // Regras de negócio -> domais services
        return await this.serviceBus.publish(transacao_factory_1.TransacaoFactory.makeAlterarTransacaoEvent(transacao), constants_1.Constants.QUEUE_ALTERAR_TRANSACOES);
    }
    async excluirTransacao(transacao) {
        // Regras de negócio -> domais services
        return await this.serviceBus.publish(transacao_factory_1.TransacaoFactory.makeExcluirTransacaoEvent(transacao), constants_1.Constants.QUEUE_EXCLUIR_TRANSACOES);
    }
    async atualizarSaldos(event) {
        // Regras de negócio -> domais services
        return {};
    }
}
exports.TransacaoCommands = TransacaoCommands;
