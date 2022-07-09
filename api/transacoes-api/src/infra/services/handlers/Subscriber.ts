import { MessageEvent, IServiceBus } from "../../../application-core";

export abstract class Subscriber {
    async handle(message: MessageEvent<any>): Promise<void> {
        console.log(`SaldoHandler: ${JSON.stringify(message)}`);
    }

    subscribe(serviceBus: IServiceBus) {
        serviceBus.subscribe(this);
    }
}
