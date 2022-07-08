import { TransacaoAlteradaEvent, AlterarTransacaoEvent, TransacaoCriadaEvent, CriarTransacaoEvent, TransacaoExcluidaEvent, ExcluirTransacaoEvent } from "../types/transacao.events";
import { Transacao } from "../model/transacao";
export declare module TransacaoFactory {
    function makeCriarTransacaoEvent(transacao: Transacao): CriarTransacaoEvent;
    function makeTransacaoCriadaEvent(transacao: Transacao): TransacaoCriadaEvent;
    function makeTransacaoAlteradaEvent(transacao: Transacao): TransacaoAlteradaEvent;
    function makeAlterarTransacaoEvent(transacao: Transacao): AlterarTransacaoEvent;
    function makeExcluirTransacaoEvent(transacao: Transacao): ExcluirTransacaoEvent;
    function makeTransacaoExcluidaEvent(transacao: Transacao): TransacaoExcluidaEvent;
}
