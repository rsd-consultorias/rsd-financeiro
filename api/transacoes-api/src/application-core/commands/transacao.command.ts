import { TransacaoFactory } from "../factories/transacao.factory";
import { IServiceBus } from "../interfaces/service-bus.interface";
import { Transacao } from "../model/transacao";
import { Constants } from "../types/constants";
import { AtualizarTransacaoSaldoEvent, TransacaoAlteradaEvent, TransacaoCriadaEvent, TransacaoExcluidaEvent, TransacaoSaldoAtualizadoEvent } from "../types/transacao.events";

export class TransacaoCommands {
    constructor(private serviceBus: IServiceBus) { }

    /**
     * Coloca uma mensagem na fila para incluir uma transação
     * @param transacao 
     * @returns Promise<TransacaoCriadaEvent>
     */
    public async criarTransacao(transacao: Transacao): Promise<TransacaoCriadaEvent> {
        // Regras de negócio -> domain services
        return await this.serviceBus.publish(TransacaoFactory.makeCriarTransacaoEvent(transacao), Constants.QUEUE_CRIAR_TRANSACOES) as TransacaoCriadaEvent;
    }

    /**
     * Colcar uma mensagem na fila para alterar uma transação
     * @param transacao 
     * @returns Promise<TransacaoAlteradaEvent>
     */
    public async alterarTransacao(transacao: Transacao): Promise<TransacaoAlteradaEvent> {
        // Regras de negócio -> domain services
        return await this.serviceBus.publish(TransacaoFactory.makeAlterarTransacaoEvent(transacao), Constants.QUEUE_ALTERAR_TRANSACOES) as TransacaoAlteradaEvent;
    }

    /**
     * Coloca uma mensagem na fila para excluir uma transação
     * @param transacao 
     * @returns Promise<TransacaoAlteradaEvent>
     */
    public async excluirTransacao(transacao: Transacao): Promise<TransacaoExcluidaEvent> {
        // Regras de negócio -> domain services
        return await this.serviceBus.publish(TransacaoFactory.makeExcluirTransacaoEvent(transacao), Constants.QUEUE_EXCLUIR_TRANSACOES) as TransacaoExcluidaEvent;
    }

    /**
     * Coloca uma mensagem na fila para atualizar o saldo de uma transação
     * @param event 
     * @returns Promise<TransacaoSaldoAtualizadoEvent>
     */
    public async atualizarSaldos(event: AtualizarTransacaoSaldoEvent): Promise<TransacaoSaldoAtualizadoEvent> {
        // Regras de negócio -> domain services
        return {} as TransacaoSaldoAtualizadoEvent;
    }
}