"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransacaoApplication = void 0;
const message_status_enum_1 = require("../enum/message-status.enum");
const message_tipo_enum_1 = require("../enum/message-tipo.enum");
const application_response_1 = require("./application.response");
class TransacaoApplication {
    constructor(transacaoRepository, transacaoCommands) {
        this.transacaoRepository = transacaoRepository;
        this.transacaoCommands = transacaoCommands;
    }
    async incluir(transacao) {
        let response = new application_response_1.ApplicationResponse();
        response.tipo = message_tipo_enum_1.EMessageTipo.TRANSACAO_INCLUSAO;
        // Regras de negócio
        let messageResponse = await this.transacaoCommands.criarTransacao(transacao);
        response.status = messageResponse.status;
        if (messageResponse.status == message_status_enum_1.EMessageStatus.QUEUED) {
            transacao.id = messageResponse.transacao.id;
            response.sucesso = true;
            response.id = messageResponse.id;
            response.mensagem = `Transação na fila para processamento da inclusão.`;
        }
        else if (messageResponse.status == message_status_enum_1.EMessageStatus.SUCCESS) {
            response.sucesso = true;
            transacao.id = messageResponse.transacao.id;
            response.id = messageResponse.id;
            response.mensagem = "Transação incluída com sucesso";
        }
        else {
            response.sucesso = true;
            response.id = messageResponse.id;
            response.mensagem = "Ocorreu uma falha na operação. Tente novamente.";
        }
        return response;
    }
    alterar(transacao) {
        let response = new application_response_1.ApplicationResponse();
        response.tipo = message_tipo_enum_1.EMessageTipo.TRANSACAO_ALTERACAO;
        // Regras de negócio
        let messageResponse = this.transacaoCommands.alterarTransacao(transacao);
        response.status = messageResponse.status;
        if (messageResponse.status == message_status_enum_1.EMessageStatus.QUEUED) {
            transacao.id = messageResponse.transacao.id;
            response.id = transacao.id;
            response.sucesso = true;
            response.mensagem = `Transação na fila para processamento da alteração.`;
        }
        else if (messageResponse.status == message_status_enum_1.EMessageStatus.SUCCESS) {
            response.sucesso = true;
            transacao.id = messageResponse.transacao.id;
            response.id = transacao.id;
            response.mensagem = "Transação alterada com sucesso";
        }
        else {
            response.sucesso = true;
            response.mensagem = "Ocorreu uma falha na operação. Tente novamente.";
        }
        return response;
    }
    excluir(transacao) {
        let response = new application_response_1.ApplicationResponse();
        response.tipo = message_tipo_enum_1.EMessageTipo.TRANSACAO_EXCLUSAO;
        response.id = transacao.id;
        // Regras de negócio
        let messageResponse = this.transacaoCommands.excluirTransacao(transacao);
        response.status = messageResponse.status;
        if (messageResponse.status == message_status_enum_1.EMessageStatus.QUEUED) {
            response.sucesso = true;
            response.mensagem = `Transação na fila para processamento da exclusão. Id ${transacao.id}`;
        }
        else if (messageResponse.status == message_status_enum_1.EMessageStatus.SUCCESS) {
            response.sucesso = true;
            response.mensagem = "Transação excluída com sucesso";
        }
        else {
            response.sucesso = true;
            response.mensagem = "Ocorreu uma falha na operação. Tente novamente.";
        }
        return response;
    }
}
exports.TransacaoApplication = TransacaoApplication;
