"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransacaoCommands = void 0;
const factories_1 = require("../factories");
const types_1 = require("../types");
class TransacaoCommands {
    constructor(serviceBus) {
        this.serviceBus = serviceBus;
    }
    /**
     * Coloca uma mensagem na fila para incluir uma transação
     * @param transacao
     * @returns Promise<TransacaoCriadaEvent>
     */
    async criarTransacao(transacao) {
        // Regras de negócio -> domain services
        return await this.serviceBus.publish(factories_1.TransacaoFactory.makeCriarTransacaoEvent(transacao), types_1.Constants.QUEUE_CRIAR_TRANSACOES);
    }
    /**
     * Colcar uma mensagem na fila para alterar uma transação
     * @param transacao
     * @returns Promise<TransacaoAlteradaEvent>
     */
    async alterarTransacao(transacao) {
        // Regras de negócio -> domain services
        return await this.serviceBus.publish(factories_1.TransacaoFactory.makeAlterarTransacaoEvent(transacao), types_1.Constants.QUEUE_ALTERAR_TRANSACOES);
    }
    /**
     * Coloca uma mensagem na fila para excluir uma transação
     * @param transacao
     * @returns Promise<TransacaoAlteradaEvent>
     */
    async excluirTransacao(transacao) {
        // Regras de negócio -> domain services
        return await this.serviceBus.publish(factories_1.TransacaoFactory.makeExcluirTransacaoEvent(transacao), types_1.Constants.QUEUE_EXCLUIR_TRANSACOES);
    }
    /**
     * Coloca uma mensagem na fila para atualizar o saldo de uma transação
     * @param event
     * @returns Promise<TransacaoSaldoAtualizadoEvent>
     */
    async atualizarSaldos(event) {
        // Regras de negócio -> domain services
        return {};
    }
}
exports.TransacaoCommands = TransacaoCommands;
