import { MongoClient } from "mongodb";
import { IServiceBus, ITrsansacaoRepository, Transacao, MessageEvent } from "../../application-core";
export declare class ServiceBus implements IServiceBus {
    private transacaoRepository;
    private mongClient;
    private collection?;
    private subscribers;
    constructor(transacaoRepository: ITrsansacaoRepository, mongClient: MongoClient);
    publish(message: MessageEvent<any>, queue: string): Promise<MessageEvent<any>>;
    subscribe(subscriber: Subscriber): void;
}
export declare abstract class Subscriber {
    handle(message: MessageEvent<any>): Promise<void>;
    subscribe(serviceBus: IServiceBus): void;
}
export declare class IncluirTransacaoHandler extends Subscriber {
    private transacaoRepository;
    constructor(transacaoRepository: ITrsansacaoRepository);
    handle(message: MessageEvent<Transacao>): Promise<void>;
}
export declare class AlterarTransacaoHandler extends Subscriber {
    handle(message: MessageEvent<Transacao>): Promise<void>;
}
export declare class AtualizarSaldoSnapshotHandler extends Subscriber {
    private saldo;
    handle(message: MessageEvent<Transacao>): Promise<void>;
}
