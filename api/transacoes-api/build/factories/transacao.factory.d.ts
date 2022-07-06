import { TransacaoAlteradaEvent, TransacaoCriadaEvent, TransacaoExcluidaEvent } from "../application-core/commands/transacao.events";
import { Transacao } from "../application-core/model/transacao";
export declare module TransacaoFactory {
    function makeTransacaoCriadaEvent(transacao: Transacao): TransacaoCriadaEvent;
    function makeTransacaoAlteradaEvent(transacao: Transacao): TransacaoAlteradaEvent;
    function makeTransacaoExcluidaEvent(transacao: Transacao): TransacaoExcluidaEvent;
}
