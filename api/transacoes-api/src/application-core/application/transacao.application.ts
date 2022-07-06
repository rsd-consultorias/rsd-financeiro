import { TransacaoCommands } from "../commands/transacao.commands";
import { EMessageStatus } from "../enum/message-status.enum";
import { EMessageTipo } from "../enum/message-tipo.enum";
import { ITrsansacaoRepository } from "../interfaces/transacao.repository";
import { Transacao } from "../model/transacao";
import { ApplicationResponse as ApplicationResponse } from "./application.response";

export class TransacaoApplication {
    constructor(private transacaoRepository: ITrsansacaoRepository, private transacaoCommands: TransacaoCommands) { }

    public async incluir(transacao: Transacao): Promise<ApplicationResponse> {
        let response = new ApplicationResponse();
        response.tipo = EMessageTipo.TRANSACAO_INCLUSAO;
        // Regras de negócio

        let messageResponse = await this.transacaoCommands.criarTransacao(transacao);
        response.status = messageResponse.status;
        if (messageResponse.status == EMessageStatus.QUEUED) {
            transacao.id = messageResponse.transacao.id;
            response.sucesso = true;
            response.id = messageResponse.id;
            response.mensagem = `Transação na fila para processamento da inclusão.`;
        } else if (messageResponse.status == EMessageStatus.SUCCESS) {
            response.sucesso = true;
            transacao.id = messageResponse.transacao.id;
            response.id = messageResponse.id;
            response.mensagem = "Transação incluída com sucesso";
        } else {
            response.sucesso = true;
            response.id = messageResponse.id;
            response.mensagem = "Ocorreu uma falha na operação. Tente novamente.";
        }

        return response;
    }

    public alterar(transacao: Transacao): ApplicationResponse {
        let response = new ApplicationResponse();
        response.tipo = EMessageTipo.TRANSACAO_ALTERACAO;
        // Regras de negócio

        let messageResponse = this.transacaoCommands.alterarTransacao(transacao);
        response.status = messageResponse.status;
        if (messageResponse.status == EMessageStatus.QUEUED) {
            transacao.id = messageResponse.transacao.id;
            response.id = transacao.id;
            response.sucesso = true;
            response.mensagem = `Transação na fila para processamento da alteração.`;
        } else if (messageResponse.status == EMessageStatus.SUCCESS) {
            response.sucesso = true;
            transacao.id = messageResponse.transacao.id;
            response.id = transacao.id;
            response.mensagem = "Transação alterada com sucesso";
        } else {
            response.sucesso = true;
            response.mensagem = "Ocorreu uma falha na operação. Tente novamente.";
        }

        return response;
    }

    public excluir(transacao: Transacao): ApplicationResponse {
        let response = new ApplicationResponse();
        response.tipo = EMessageTipo.TRANSACAO_EXCLUSAO;
        response.id = transacao.id;
        // Regras de negócio

        let messageResponse = this.transacaoCommands.excluirTransacao(transacao);
        response.status = messageResponse.status;
        if (messageResponse.status == EMessageStatus.QUEUED) {
            response.sucesso = true;
            response.mensagem = `Transação na fila para processamento da exclusão. Id ${transacao.id}`;
        } else if (messageResponse.status == EMessageStatus.SUCCESS) {
            response.sucesso = true;
            response.mensagem = "Transação excluída com sucesso";
        } else {
            response.sucesso = true;
            response.mensagem = "Ocorreu uma falha na operação. Tente novamente.";
        }

        return response;
    }
}