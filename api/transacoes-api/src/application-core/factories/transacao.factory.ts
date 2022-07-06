import { randomUUID } from "crypto";
import { TransacaoAlteradaEvent, TransacaoCriadaEvent, TransacaoExcluidaEvent } from "../commands/transacao.events";
import { Transacao } from "../model/transacao";
import { EMessageTipo } from "../enum/message-tipo.enum";

export module TransacaoFactory {
    export function makeTransacaoCriadaEvent(transacao: Transacao): TransacaoCriadaEvent {
        let evento = new TransacaoCriadaEvent();
        evento.tipo = EMessageTipo.TRANSACAO_INCLUSAO;
        evento.data = Date.now();
        evento.transacao = transacao;
        return evento;
    }
    export function makeTransacaoAlteradaEvent(transacao: Transacao): TransacaoAlteradaEvent {
        let evento = new TransacaoAlteradaEvent();
        evento.tipo = EMessageTipo.TRANSACAO_ALTERACAO;
        evento.data = Date.now();
        evento.transacao = transacao;
        return evento;
    }
    export function makeTransacaoExcluidaEvent(transacao: Transacao): TransacaoExcluidaEvent {
        let evento = new TransacaoExcluidaEvent();
        evento.tipo = EMessageTipo.TRANSACAO_EXCLUSAO;
        evento.data = Date.now();
        evento.transacao = transacao;
        return evento;
    }
}