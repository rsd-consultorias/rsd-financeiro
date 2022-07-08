import { randomUUID } from "crypto";
import { Collection, MongoClient } from "mongodb";
import { EMessageStatus } from "../../application-core/enum/message-status.enum";
import { EMessageTipo } from "../../application-core/enum/message-tipo.enum";
import { IServiceBus } from "../../application-core/interfaces/service-bus.interface";
import { ITrsansacaoRepository } from "../../application-core/interfaces/transacao.repository";
import { Transacao } from "../../application-core/model/transacao";
import { MessageEvent } from "../../application-core/types/message.event";

export class ServiceBus implements IServiceBus {
    private collection?: Collection<any>;

    constructor(private transacaoRepository: ITrsansacaoRepository, private mongClient: MongoClient) {
        this.collection = this.mongClient.db("financeiro").collection<any>("message-queue");
        // Simular o processamento da mensagem e a persistência no banco de dados
        setInterval(async () => {

            let queue = this.collection?.find({ status: EMessageStatus.QUEUED }, { sort: { data: -1 } });
            queue?.forEach((msg: any) => {
                if (msg.tipo == EMessageTipo.TRANSACAO_INCLUSAO) {
                    try {
                        msg.payload!.eventos.forEach((evento: { valor: any; }) => {
                            if (evento.valor!.valor!.length < 3) {
                                switch (evento.valor!.valor!.length) {
                                    case 0: evento.valor!.valor! = '000' + evento.valor!.valor!;
                                        break;
                                    case 1: evento.valor!.valor! = '00' + evento.valor!.valor!;
                                        break;
                                    case 2: evento.valor!.valor! = '0' + evento.valor!.valor!;
                                        break;
                                }
                            }
                        });

                        this.transacaoRepository.incluir(msg.payload as Transacao).then(incluido => {
                            if (incluido.status == EMessageStatus.SUCCESS) {
                                msg.status = EMessageStatus.SUCCESS;
                                Promise.resolve(this.collection?.updateOne({ _id: msg._id }, { $set: msg }));
                            }
                        });
                    } catch (error) {
                        console.error(error);
                    }
                }
            });
        }, 60000);
    }

    public async publish(message: MessageEvent<any>, queue: string): Promise<MessageEvent<any>> {
        message.id = randomUUID();
        message.status = EMessageStatus.QUEUED;
        await this.collection?.insertOne(message);
        return message;
    }
}