"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterarTransacaoHandler = void 0;
const application_core_1 = require("../../../application-core");
const Subscriber_1 = require("./Subscriber");
class AlterarTransacaoHandler extends Subscriber_1.Subscriber {
    async handle(message) {
        if (message.tipo == application_core_1.EMessageTipo.TRANSACAO_ALTERACAO) {
        }
    }
}
exports.AlterarTransacaoHandler = AlterarTransacaoHandler;
//# sourceMappingURL=AlterarTransacaoHandler.js.map