"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBus = void 0;
const crypto_1 = require("crypto");
const message_status_enum_1 = require("../../application-core/enum/message-status.enum");
const message_tipo_enum_1 = require("../../application-core/enum/message-tipo.enum");
class ServiceBus {
    constructor(transacaoRepository, mongClient) {
        this.transacaoRepository = transacaoRepository;
        this.mongClient = mongClient;
        this.collection = this.mongClient.db("financeiro").collection("message-queue");
        // Simular o processamento da mensagem e a persistência no banco de dados
        setInterval(async () => {
            let queue = this.collection?.find({ status: message_status_enum_1.EMessageStatus.QUEUED }, { sort: { data: -1 } });
            queue?.forEach((msg) => {
                if (msg.tipo == message_tipo_enum_1.EMessageTipo.TRANSACAO_INCLUSAO) {
                    try {
                        msg.payload.eventos.forEach((evento) => {
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
                        this.transacaoRepository.incluir(msg.payload).then(incluido => {
                            if (incluido.status == message_status_enum_1.EMessageStatus.SUCCESS) {
                                msg.status = message_status_enum_1.EMessageStatus.SUCCESS;
                                Promise.resolve(this.collection?.updateOne({ _id: msg._id }, { $set: msg }));
                            }
                        });
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
            });
        }, 60000);
    }
    async publish(message, queue) {
        message.id = (0, crypto_1.randomUUID)();
        message.status = message_status_enum_1.EMessageStatus.QUEUED;
        await this.collection?.insertOne(message);
        return message;
    }
}
exports.ServiceBus = ServiceBus;
