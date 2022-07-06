import { TransacaoAlteradaEvent, TransacaoCriadaEvent, TransacaoExcluidaEvent } from "../commands/transacao.events";
import { Transacao } from "../model/transacao";
export declare module TransacaoFactory {
    function makeTransacaoCriadaEvent(transacao: Transacao): TransacaoCriadaEvent;
    function makeTransacaoAlteradaEvent(transacao: Transacao): TransacaoAlteradaEvent;
    function makeTransacaoExcluidaEvent(transacao: Transacao): TransacaoExcluidaEvent;
}
