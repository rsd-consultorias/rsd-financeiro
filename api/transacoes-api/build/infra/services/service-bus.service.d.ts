import { MongoClient } from "mongodb";
import { EMessageStatus } from "../../application-core/enum/message-status.enum";
import { IServiceBus } from "../../application-core/interfaces/service-bus.interface";
import { ITrsansacaoRepository } from "../../application-core/interfaces/transacao.repository";
export declare class ServiceBus implements IServiceBus {
    private transacaoRepository;
    private mongClient;
    private collection?;
    constructor(transacaoRepository: ITrsansacaoRepository, mongClient: MongoClient);
    publish(message: any, queue: string): Promise<EMessageStatus>;
}
