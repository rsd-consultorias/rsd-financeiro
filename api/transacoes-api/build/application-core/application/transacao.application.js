"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransacaoApplication = void 0;
const enum_1 = require("../enum");
const types_1 = require("../types");
class TransacaoApplication {
    constructor(transacaoRepository) {
        this.transacaoRepository = transacaoRepository;
    }
    /**
     * Inclusão de uma transação
     * @param transacao
     * @returns Promise<ApplicationResponse>
     */
    async criarTransacao(transacao) {
        let applicationResponse = new types_1.ApplicationResponse();
        applicationResponse.tipo = enum_1.EMessageTipo.TRANSACAO_INCLUSAO;
        // Regras de negócio -> domain services
        return applicationResponse;
    }
    /**
     * Alteração de uma transação
     * @param transacao
     * @returns Promise<ApplicationResponse>
     */
    async alterarTransacao(transacao) {
        let response = new types_1.ApplicationResponse();
        response.tipo = enum_1.EMessageTipo.TRANSACAO_ALTERACAO;
        // Regras de negócio -> domain services
        return response;
    }
    /**
     * Exclusão de uma transação
     * @param transacao
     * @returns Promise<ApplicationResponse>
     */
    async excluirTransacao(transacao) {
        let response = new types_1.ApplicationResponse();
        response.tipo = enum_1.EMessageTipo.TRANSACAO_EXCLUSAO;
        response.id = transacao.id;
        // Regras de negócio -> domain services
        let incluido = await this.transacaoRepository.incluir(transacao);
        response.status = incluido.status;
        return response;
    }
}
exports.TransacaoApplication = TransacaoApplication;
