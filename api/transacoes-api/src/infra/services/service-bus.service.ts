import { randomUUID } from "crypto";
import { Connection } from "mysql";
import { IServiceBus, ITrsansacaoRepository, EMessageStatus, MessageEvent } from "../../application-core";
import { Subscriber } from "./handlers";

export class ServiceBus implements IServiceBus {
    private subscribers: Array<Subscriber> = [];

    constructor(private transacaoRepository: ITrsansacaoRepository, private dbClient: Connection) {
        // Simular o processamento da mensagem e a persistência no banco de dados
        // setInterval(async () => {

        //     let queue = this.dbClient?.find({ status: EMessageStatus.QUEUED }, { sort: { data: -1 } });
        //     queue?.forEach((msg: any) => {

        //         msg.status = EMessageStatus.SUCCESS;
        //         Promise.resolve(this.dbClient?.updateOne({ _id: msg._id }, { $set: msg }));

        //         this.subscribers.forEach(async sub => {
        //             await sub.handle(msg);
        //         });
        //     });
        // }, 60000);
    }

    public async publish(message: MessageEvent<any>, queue: string): Promise<MessageEvent<any>> {
        message.id = randomUUID();
        message.status = EMessageStatus.QUEUED;
        // await this.dbClient?.insertOne(message);

        return message;
    }

    public subscribe(subscriber: Subscriber): void {
        this.subscribers.push(subscriber);
    }
}


