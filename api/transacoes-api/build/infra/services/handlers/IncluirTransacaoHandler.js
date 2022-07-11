"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncluirTransacaoHandler = void 0;
const application_core_1 = require("../../../application-core");
const Subscriber_1 = require("./Subscriber");
class IncluirTransacaoHandler extends Subscriber_1.Subscriber {
    constructor(transacaoRepository) {
        super();
        this.transacaoRepository = transacaoRepository;
    }
    async handle(message) {
        if (message.tipo == application_core_1.EMessageTipo.TRANSACAO_INCLUSAO) {
            try {
                message.payload.eventos.forEach((evento) => {
                    if (evento.valor.valor.length < 3) {
                        switch (evento.valor.valor.length) {
                            case 0:
                                evento.valor.valor = '000' + evento.valor.valor;
                                break;
                            case 1:
                                evento.valor.valor = '00' + evento.valor.valor;
                                break;
                            case 2:
                                evento.valor.valor = '0' + evento.valor.valor;
                                break;
                        }
                    }
                });
                await this.transacaoRepository.incluir(message.payload);
            }
            catch (error) {
                console.error(error);
            }
        }
    }
}
exports.IncluirTransacaoHandler = IncluirTransacaoHandler;
//# sourceMappingURL=IncluirTransacaoHandler.js.map