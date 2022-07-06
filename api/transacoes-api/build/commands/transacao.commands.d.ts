import { Transacao } from "../application-core/model/transacao";
import { TransacaoAlteradaEvent, TransacaoAtualizarSaldoEvent, TransacaoCriadaEvent, TransacaoExcluidaEvent, TransacaoSaldoAtualizadoEvent } from "./transacao.events";
import { ServiceBus } from "../infra/services/service-bus.service";
export declare class TransacaoCommands {
    private serviceBus;
    constructor(serviceBus: ServiceBus);
    criarTransacao(transacao: Transacao): TransacaoCriadaEvent;
    alterarTransacao(transacao: Transacao): TransacaoAlteradaEvent;
    excluirTransacao(transacao: Transacao): TransacaoExcluidaEvent;
    atualizarSaldos(event: TransacaoAtualizarSaldoEvent): TransacaoSaldoAtualizadoEvent;
}
