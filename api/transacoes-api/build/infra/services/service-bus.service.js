"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBus = void 0;
const crypto_1 = require("crypto");
const message_status_enum_1 = require("../../application-core/enum/message-status.enum");
class ServiceBus {
    constructor(transacaoRepository, mongClient) {
        this.transacaoRepository = transacaoRepository;
        this.mongClient = mongClient;
        this.collection = this.mongClient.db("financeiro").collection("message-queue");
        // Simular o processamento da mensagem e a persistência no banco de dados
        setInterval(async () => {
            let queue = await this.collection?.find({ status: 'QUEUED' }, { sort: { data: -1 } });
            queue?.forEach(msg => {
                if (this.transacaoRepository.incluir(msg.transacao).status == message_status_enum_1.EMessageStatus.SUCCESS) {
                    msg.status = message_status_enum_1.EMessageStatus.SUCCESS;
                    Promise.resolve(this.collection?.updateOne({ _id: msg._id }, { $set: msg }));
                }
            });
        }, 30000);
    }
    async publish(message, queue) {
        message.id = (0, crypto_1.randomUUID)();
        message.status = message_status_enum_1.EMessageStatus.QUEUED;
        message.version = 'v1';
        await this.collection?.insertOne(message);
        return message_status_enum_1.EMessageStatus.QUEUED;
    }
}
exports.ServiceBus = ServiceBus;
