import { TransacaoCommands } from "../commands/transacao.commands";
import { ITrsansacaoRepository } from "../interfaces/transacao.repository";
import { Transacao } from "../model/transacao";
import { ApplicationResponse as ApplicationResponse } from "./application.response";
export declare class TransacaoApplication {
    private transacaoRepository;
    private transacaoCommands;
    constructor(transacaoRepository: ITrsansacaoRepository, transacaoCommands: TransacaoCommands);
    incluir(transacao: Transacao): Promise<ApplicationResponse>;
    alterar(transacao: Transacao): ApplicationResponse;
    excluir(transacao: Transacao): ApplicationResponse;
}
