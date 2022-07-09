import { EMessageTipo } from "../enum";
import { Transacao } from "../model";
import { CriarTransacaoEvent, TransacaoCriadaEvent, TransacaoAlteradaEvent, AlterarTransacaoEvent, ExcluirTransacaoEvent, TransacaoExcluidaEvent } from "../types";

export module TransacaoFactory {
    export function makeCriarTransacaoEvent(transacao: Transacao): CriarTransacaoEvent {
        let evento = new CriarTransacaoEvent();
        evento.tipo = EMessageTipo.TRANSACAO_INCLUSAO;
        evento.data = new Date();
        evento.payload = transacao;
        return evento;
    }
    export function makeTransacaoCriadaEvent(transacao: Transacao): TransacaoCriadaEvent {
        let evento = new TransacaoCriadaEvent();
        evento.tipo = EMessageTipo.TRANSACAO_INCLUSAO;
        evento.data = new Date();
        evento.payload = transacao;
        return evento;
    }
    export function makeTransacaoAlteradaEvent(transacao: Transacao): TransacaoAlteradaEvent {
        let evento = new TransacaoAlteradaEvent();
        evento.tipo = EMessageTipo.TRANSACAO_ALTERACAO;
        evento.data = new Date();
        evento.payload = transacao;
        return evento;
    }
    export function makeAlterarTransacaoEvent(transacao: Transacao): AlterarTransacaoEvent {
        let evento = new AlterarTransacaoEvent();
        evento.tipo = EMessageTipo.TRANSACAO_ALTERACAO;
        evento.data = new Date();
        evento.payload = transacao;
        return evento;
    }
    export function makeExcluirTransacaoEvent(transacao: Transacao): ExcluirTransacaoEvent {
        let evento = new TransacaoExcluidaEvent();
        evento.tipo = EMessageTipo.TRANSACAO_EXCLUSAO;
        evento.data = new Date();
        evento.payload = transacao;
        return evento;
    }
    export function makeTransacaoExcluidaEvent(transacao: Transacao): TransacaoExcluidaEvent {
        let evento = new TransacaoExcluidaEvent();
        evento.tipo = EMessageTipo.TRANSACAO_EXCLUSAO;
        evento.data = new Date();
        evento.payload = transacao;
        return evento;
    }
}