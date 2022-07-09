"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtualizarSaldoSnapshotHandler = exports.AlterarTransacaoHandler = exports.IncluirTransacaoHandler = exports.Subscriber = exports.ServiceBus = void 0;
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
class Subscriber {
    async handle(message) {
        console.log(`SaldoHandler: ${JSON.stringify(message)}`);
    }
    subscribe(serviceBus) {
        serviceBus.subscribe(this);
    }
}
exports.Subscriber = Subscriber;
class IncluirTransacaoHandler extends Subscriber {
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
class AlterarTransacaoHandler extends Subscriber {
    async handle(message) {
        if (message.tipo == application_core_1.EMessageTipo.TRANSACAO_ALTERACAO) {
        }
    }
}
exports.AlterarTransacaoHandler = AlterarTransacaoHandler;
class AtualizarSaldoSnapshotHandler extends Subscriber {
    constructor() {
        super(...arguments);
        this.saldo = {};
    }
    async handle(message) {
        if (this.saldo[message.payload.codigo] != null) {
            console.log('Atualizando saldo...');
            let valorAtual = 0;
            let saldoAtual = 0;
            message.payload.eventos.forEach(evt => {
                this.saldo[message.payload.codigo].eventos.forEach(evti => {
                    if (evti.codigo == evt.codigo) {
                        saldoAtual = evti.natureza == 'E' ? evti.valor.valor : -evti.valor.valor;
                        valorAtual = evt.natureza == 'E' ? evt.valor.valor : -evt.valor.valor;
                        saldoAtual += valorAtual * 1.0;
                        evti.natureza = saldoAtual < 0 ? 'S' : 'E';
                        evti.valor.valor = Math.abs(saldoAtual);
                    }
                });
            });
        }
        else {
            this.saldo[message.payload.codigo] = message.payload;
        }
        console.log(`${JSON.stringify(this.saldo)}\n`);
        // if (message.tipo == EMessageTipo.TRANSACAO_SALDO) {
        // }
    }
}
exports.AtualizarSaldoSnapshotHandler = AtualizarSaldoSnapshotHandler;
