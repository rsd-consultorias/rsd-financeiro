"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransacaoFactory = void 0;
const transacao_events_1 = require("../types/transacao.events");
const message_tipo_enum_1 = require("../enum/message-tipo.enum");
var TransacaoFactory;
(function (TransacaoFactory) {
    function makeCriarTransacaoEvent(transacao) {
        let evento = new transacao_events_1.CriarTransacaoEvent();
        evento.tipo = message_tipo_enum_1.EMessageTipo.TRANSACAO_INCLUSAO;
        evento.data = new Date();
        evento.payload = transacao;
        return evento;
    }
    TransacaoFactory.makeCriarTransacaoEvent = makeCriarTransacaoEvent;
    function makeTransacaoCriadaEvent(transacao) {
        let evento = new transacao_events_1.TransacaoCriadaEvent();
        evento.tipo = message_tipo_enum_1.EMessageTipo.TRANSACAO_INCLUSAO;
        evento.data = new Date();
        evento.payload = transacao;
        return evento;
    }
    TransacaoFactory.makeTransacaoCriadaEvent = makeTransacaoCriadaEvent;
    function makeTransacaoAlteradaEvent(transacao) {
        let evento = new transacao_events_1.TransacaoAlteradaEvent();
        evento.tipo = message_tipo_enum_1.EMessageTipo.TRANSACAO_ALTERACAO;
        evento.data = new Date();
        evento.payload = transacao;
        return evento;
    }
    TransacaoFactory.makeTransacaoAlteradaEvent = makeTransacaoAlteradaEvent;
    function makeAlterarTransacaoEvent(transacao) {
        let evento = new transacao_events_1.AlterarTransacaoEvent();
        evento.tipo = message_tipo_enum_1.EMessageTipo.TRANSACAO_ALTERACAO;
        evento.data = new Date();
        evento.payload = transacao;
        return evento;
    }
    TransacaoFactory.makeAlterarTransacaoEvent = makeAlterarTransacaoEvent;
    function makeExcluirTransacaoEvent(transacao) {
        let evento = new transacao_events_1.TransacaoExcluidaEvent();
        evento.tipo = message_tipo_enum_1.EMessageTipo.TRANSACAO_EXCLUSAO;
        evento.data = new Date();
        evento.payload = transacao;
        return evento;
    }
    TransacaoFactory.makeExcluirTransacaoEvent = makeExcluirTransacaoEvent;
    function makeTransacaoExcluidaEvent(transacao) {
        let evento = new transacao_events_1.TransacaoExcluidaEvent();
        evento.tipo = message_tipo_enum_1.EMessageTipo.TRANSACAO_EXCLUSAO;
        evento.data = new Date();
        evento.payload = transacao;
        return evento;
    }
    TransacaoFactory.makeTransacaoExcluidaEvent = makeTransacaoExcluidaEvent;
})(TransacaoFactory = exports.TransacaoFactory || (exports.TransacaoFactory = {}));
