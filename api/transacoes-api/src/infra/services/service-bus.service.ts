import { randomUUID } from "crypto";
import { Collection, MongoClient } from "mongodb";
import { EMessageStatus } from "../../application-core/enum/message-status.enum";
import { IServiceBus } from "../../application-core/interfaces/service-bus.interface";
import { ITrsansacaoRepository } from "../../application-core/interfaces/transacao.repository";
import { Transacao } from "../../application-core/model/transacao";

export class ServiceBus implements IServiceBus {
    private collection?: Collection<any>;

    constructor(private transacaoRepository: ITrsansacaoRepository, private mongClient: MongoClient) {
        this.collection = this.mongClient.db("financeiro").collection<any>("message-queue");
        // Simular o processamento da mensagem e a persistência no banco de dados
        setInterval(async () => {
            let queue = await this.collection?.find({ status: 'QUEUED' }, { sort: { data: -1 } });
            queue?.forEach(msg => {
                if (this.transacaoRepository.incluir(msg.transacao as Transacao).status == EMessageStatus.SUCCESS) {
                    msg.status = EMessageStatus.SUCCESS;
                    Promise.resolve(this.collection?.updateOne({ _id: msg._id }, { $set: msg }));
                }
            });
        }, 30000);
    }

    public async publish(message: any, queue: string): Promise<EMessageStatus> {
        message.id = randomUUID();
        message.status = EMessageStatus.QUEUED;
        message.version = 'v1';
        await this.collection?.insertOne(message);
        return EMessageStatus.QUEUED;
    }
}