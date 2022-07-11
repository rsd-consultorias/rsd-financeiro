import { MongoClient } from "mongodb";
import { IServiceBus, ITrsansacaoRepository, MessageEvent } from "../../application-core";
import { Subscriber } from "./handlers";
export declare class ServiceBus implements IServiceBus {
    private transacaoRepository;
    private mongClient;
    private collection?;
    private subscribers;
    constructor(transacaoRepository: ITrsansacaoRepository, mongClient: MongoClient);
    publish(message: MessageEvent<any>, queue: string): Promise<MessageEvent<any>>;
    subscribe(subscriber: Subscriber): void;
}
