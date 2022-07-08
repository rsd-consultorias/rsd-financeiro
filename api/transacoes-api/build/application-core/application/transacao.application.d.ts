import { ITrsansacaoRepository } from "../interfaces/transacao.repository";
import { Transacao } from "../model/transacao";
import { ApplicationResponse as ApplicationResponse } from "../types/application.response";
export declare class TransacaoApplication {
    private transacaoRepository;
    constructor(transacaoRepository: ITrsansacaoRepository);
    criarTransacao(transacao: Transacao): Promise<ApplicationResponse>;
    alterarTransacao(transacao: Transacao): Promise<ApplicationResponse>;
    excluirTransacao(transacao: Transacao): Promise<ApplicationResponse>;
}
