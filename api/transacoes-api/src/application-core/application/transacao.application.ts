import { EMessageTipo } from "../enum/message-tipo.enum";
import { ITrsansacaoRepository } from "../interfaces/transacao.repository";
import { Transacao } from "../model/transacao";
import { ApplicationResponse as ApplicationResponse } from "../types/application.response";

export class TransacaoApplication {
    constructor(private transacaoRepository: ITrsansacaoRepository) { }

    /**
     * Inclusão de uma transação
     * @param transacao 
     * @returns Promise<ApplicationResponse>
     */
    public async criarTransacao(transacao: Transacao): Promise<ApplicationResponse> {
        let applicationResponse = new ApplicationResponse();
        applicationResponse.tipo = EMessageTipo.TRANSACAO_INCLUSAO;
        // Regras de negócio -> domain services

        return applicationResponse;
    }

    /**
     * Alteração de uma transação
     * @param transacao 
     * @returns Promise<ApplicationResponse>
     */
    public async alterarTransacao(transacao: Transacao): Promise<ApplicationResponse> {
        let response = new ApplicationResponse();
        response.tipo = EMessageTipo.TRANSACAO_ALTERACAO;
        // Regras de negócio -> domain services

        return response;
    }

    /**
     * Exclusão de uma transação
     * @param transacao 
     * @returns Promise<ApplicationResponse>
     */
    public async excluirTransacao(transacao: Transacao): Promise<ApplicationResponse> {
        let response = new ApplicationResponse();
        response.tipo = EMessageTipo.TRANSACAO_EXCLUSAO;
        response.id = transacao.id;
        // Regras de negócio -> domain services

        let incluido = await this.transacaoRepository.incluir(transacao);
        response.status = incluido.status;

        return response;
    }
}