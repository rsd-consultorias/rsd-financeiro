import { MongoClient } from "mongodb";
import { IServiceBus } from "../../application-core/interfaces/service-bus.interface";
import { ITrsansacaoRepository } from "../../application-core/interfaces/transacao.repository";
import { MessageEvent } from "../../application-core/types/message.event";
export declare class ServiceBus implements IServiceBus {
    private transacaoRepository;
    private mongClient;
    private collection?;
    constructor(transacaoRepository: ITrsansacaoRepository, mongClient: MongoClient);
    publish(message: MessageEvent<any>, queue: string): Promise<MessageEvent<any>>;
}
