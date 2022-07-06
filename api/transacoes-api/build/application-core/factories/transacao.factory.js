"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransacaoFactory = void 0;
const transacao_events_1 = require("../commands/transacao.events");
const message_tipo_enum_1 = require("../enum/message-tipo.enum");
var TransacaoFactory;
(function (TransacaoFactory) {
    function makeTransacaoCriadaEvent(transacao) {
        let evento = new transacao_events_1.TransacaoCriadaEvent();
        evento.tipo = message_tipo_enum_1.EMessageTipo.TRANSACAO_INCLUSAO;
        evento.data = Date.now();
        evento.transacao = transacao;
        return evento;
    }
    TransacaoFactory.makeTransacaoCriadaEvent = makeTransacaoCriadaEvent;
    function makeTransacaoAlteradaEvent(transacao) {
        let evento = new transacao_events_1.TransacaoAlteradaEvent();
        evento.tipo = message_tipo_enum_1.EMessageTipo.TRANSACAO_ALTERACAO;
        evento.data = Date.now();
        evento.transacao = transacao;
        return evento;
    }
    TransacaoFactory.makeTransacaoAlteradaEvent = makeTransacaoAlteradaEvent;
    function makeTransacaoExcluidaEvent(transacao) {
        let evento = new transacao_events_1.TransacaoExcluidaEvent();
        evento.tipo = message_tipo_enum_1.EMessageTipo.TRANSACAO_EXCLUSAO;
        evento.data = Date.now();
        evento.transacao = transacao;
        return evento;
    }
    TransacaoFactory.makeTransacaoExcluidaEvent = makeTransacaoExcluidaEvent;
})(TransacaoFactory = exports.TransacaoFactory || (exports.TransacaoFactory = {}));
