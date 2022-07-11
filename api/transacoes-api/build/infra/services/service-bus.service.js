"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBus = void 0;
const crypto_1 = require("crypto");
const application_core_1 = require("../../application-core");
class ServiceBus {
    constructor(transacaoRepository, mongClient) {
        this.transacaoRepository = transacaoRepository;
        this.mongClient = mongClient;
        this.subscribers = [];
        this.collection = this.mongClient.db("financeiro").collection("message-queue");
        // Simular o processamento da mensagem e a persistência no banco de dados
        setInterval(async () => {
            let queue = this.collection?.find({ status: application_core_1.EMessageStatus.QUEUED }, { sort: { data: -1 } });
            queue?.forEach((msg) => {
                msg.status = application_core_1.EMessageStatus.SUCCESS;
                Promise.resolve(this.collection?.updateOne({ _id: msg._id }, { $set: msg }));
                this.subscribers.forEach(async (sub) => {
                    await sub.handle(msg);
                });
            });
        }, 60000);
    }
    async publish(message, queue) {
        message.id = (0, crypto_1.randomUUID)();
        message.status = application_core_1.EMessageStatus.QUEUED;
        await this.collection?.insertOne(message);
        return message;
    }
    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }
}
exports.ServiceBus = ServiceBus;
//# sourceMappingURL=service-bus.service.js.map