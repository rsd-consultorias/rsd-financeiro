import { IServiceBus } from "../interfaces";
import { Transacao } from "../model";
import { TransacaoCriadaEvent, TransacaoAlteradaEvent, TransacaoExcluidaEvent, AtualizarTransacaoSaldoEvent, TransacaoSaldoAtualizadoEvent } from "../types";
export declare class TransacaoCommands {
    private serviceBus;
    constructor(serviceBus: IServiceBus);
    /**
     * Coloca uma mensagem na fila para incluir uma transação
     * @param transacao
     * @returns Promise<TransacaoCriadaEvent>
     */
    criarTransacao(transacao: Transacao): Promise<TransacaoCriadaEvent>;
    /**
     * Colcar uma mensagem na fila para alterar uma transação
     * @param transacao
     * @returns Promise<TransacaoAlteradaEvent>
     */
    alterarTransacao(transacao: Transacao): Promise<TransacaoAlteradaEvent>;
    /**
     * Coloca uma mensagem na fila para excluir uma transação
     * @param transacao
     * @returns Promise<TransacaoAlteradaEvent>
     */
    excluirTransacao(transacao: Transacao): Promise<TransacaoExcluidaEvent>;
    /**
     * Coloca uma mensagem na fila para atualizar o saldo de uma transação
     * @param event
     * @returns Promise<TransacaoSaldoAtualizadoEvent>
     */
    atualizarSaldos(event: AtualizarTransacaoSaldoEvent): Promise<TransacaoSaldoAtualizadoEvent>;
}
