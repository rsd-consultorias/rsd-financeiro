"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransacaoApplication = void 0;
const message_tipo_enum_1 = require("../enum/message-tipo.enum");
const application_response_1 = require("../types/application.response");
class TransacaoApplication {
    constructor(transacaoRepository) {
        this.transacaoRepository = transacaoRepository;
    }
    async criarTransacao(transacao) {
        let applicationResponse = new application_response_1.ApplicationResponse();
        applicationResponse.tipo = message_tipo_enum_1.EMessageTipo.TRANSACAO_INCLUSAO;
        // Regras de negócio
        return applicationResponse;
    }
    async alterarTransacao(transacao) {
        let response = new application_response_1.ApplicationResponse();
        response.tipo = message_tipo_enum_1.EMessageTipo.TRANSACAO_ALTERACAO;
        // Regras de negócio
        return response;
    }
    async excluirTransacao(transacao) {
        let response = new application_response_1.ApplicationResponse();
        response.tipo = message_tipo_enum_1.EMessageTipo.TRANSACAO_EXCLUSAO;
        response.id = transacao.id;
        // Regras de negócio
        return response;
    }
}
exports.TransacaoApplication = TransacaoApplication;
