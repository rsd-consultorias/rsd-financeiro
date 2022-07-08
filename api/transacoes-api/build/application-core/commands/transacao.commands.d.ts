import { IServiceBus } from "../interfaces/service-bus.interface";
import { Transacao } from "../model/transacao";
import { AtualizarTransacaoSaldoEvent, TransacaoAlteradaEvent, TransacaoCriadaEvent, TransacaoExcluidaEvent, TransacaoSaldoAtualizadoEvent } from "../types/transacao.events";
export declare class TransacaoCommands {
    private serviceBus;
    constructor(serviceBus: IServiceBus);
    criarTransacao(transacao: Transacao): Promise<TransacaoCriadaEvent>;
    alterarTransacao(transacao: Transacao): Promise<TransacaoAlteradaEvent>;
    excluirTransacao(transacao: Transacao): Promise<TransacaoExcluidaEvent>;
    atualizarSaldos(event: AtualizarTransacaoSaldoEvent): Promise<TransacaoSaldoAtualizadoEvent>;
}
