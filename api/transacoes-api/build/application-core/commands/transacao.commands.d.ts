import { IServiceBus } from "../interfaces/service-bus.interface";
import { Transacao } from "../model/transacao";
import { TransacaoAlteradaEvent, TransacaoAtualizarSaldoEvent, TransacaoCriadaEvent, TransacaoExcluidaEvent, TransacaoSaldoAtualizadoEvent } from "./transacao.events";
export declare class TransacaoCommands {
    private serviceBus;
    constructor(serviceBus: IServiceBus);
    criarTransacao(transacao: Transacao): Promise<TransacaoCriadaEvent>;
    alterarTransacao(transacao: Transacao): TransacaoAlteradaEvent;
    excluirTransacao(transacao: Transacao): TransacaoExcluidaEvent;
    atualizarSaldos(event: TransacaoAtualizarSaldoEvent): TransacaoSaldoAtualizadoEvent;
}
