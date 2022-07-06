"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransacaoSaldoAtualizadoEvent = exports.TransacaoAtualizarSaldoEvent = exports.TransacaoExcluidaEvent = exports.TransacaoAlteradaEvent = exports.TransacaoCriadaEvent = void 0;
const message_event_1 = require("../model/message.event");
class TransacaoCriadaEvent extends message_event_1.MessageEvent {
}
exports.TransacaoCriadaEvent = TransacaoCriadaEvent;
class TransacaoAlteradaEvent extends message_event_1.MessageEvent {
}
exports.TransacaoAlteradaEvent = TransacaoAlteradaEvent;
class TransacaoExcluidaEvent extends message_event_1.MessageEvent {
}
exports.TransacaoExcluidaEvent = TransacaoExcluidaEvent;
class TransacaoAtualizarSaldoEvent extends message_event_1.MessageEvent {
}
exports.TransacaoAtualizarSaldoEvent = TransacaoAtualizarSaldoEvent;
class TransacaoSaldoAtualizadoEvent extends message_event_1.MessageEvent {
}
exports.TransacaoSaldoAtualizadoEvent = TransacaoSaldoAtualizadoEvent;
