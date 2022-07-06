import { TransacaoFactory } from "../factories/transacao.factory";
import { IServiceBus } from "../interfaces/service-bus.interface";
import { Transacao } from "../model/transacao";
import { TransacaoAlteradaEvent, TransacaoAtualizarSaldoEvent, TransacaoCriadaEvent, TransacaoExcluidaEvent, TransacaoSaldoAtualizadoEvent } from "./transacao.events";

export class TransacaoCommands {
    constructor(private serviceBus: IServiceBus) { }

    public async criarTransacao(transacao: Transacao): Promise<TransacaoCriadaEvent> {
        let transacaoCriada = TransacaoFactory.makeTransacaoCriadaEvent(transacao);
        transacaoCriada.status = await this.serviceBus.publish(transacaoCriada, 'NOVAS_TRANSACOES');;

        return transacaoCriada;
    }

    public alterarTransacao(transacao: Transacao): TransacaoAlteradaEvent {
        return TransacaoFactory.makeTransacaoAlteradaEvent(transacao);
    }

    public excluirTransacao(transacao: Transacao): TransacaoExcluidaEvent {
        return TransacaoFactory.makeTransacaoExcluidaEvent(transacao);
    }

    public atualizarSaldos(event: TransacaoAtualizarSaldoEvent): TransacaoSaldoAtualizadoEvent {
        return {} as TransacaoSaldoAtualizadoEvent;
    }
}