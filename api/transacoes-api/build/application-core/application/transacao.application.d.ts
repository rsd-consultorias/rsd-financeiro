import { ITrsansacaoRepository } from "../interfaces";
import { Transacao } from "../model";
import { ApplicationResponse } from "../types";
export declare class TransacaoApplication {
    private transacaoRepository;
    constructor(transacaoRepository: ITrsansacaoRepository);
    /**
     * Inclusão de uma transação
     * @param transacao
     * @returns Promise<ApplicationResponse>
     */
    criarTransacao(transacao: Transacao): Promise<ApplicationResponse>;
    /**
     * Alteração de uma transação
     * @param transacao
     * @returns Promise<ApplicationResponse>
     */
    alterarTransacao(transacao: Transacao): Promise<ApplicationResponse>;
    /**
     * Exclusão de uma transação
     * @param transacao
     * @returns Promise<ApplicationResponse>
     */
    excluirTransacao(transacao: Transacao): Promise<ApplicationResponse>;
}
