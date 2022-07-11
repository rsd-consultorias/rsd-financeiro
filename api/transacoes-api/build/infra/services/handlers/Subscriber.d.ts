import { MessageEvent, IServiceBus } from "../../../application-core";
export declare abstract class Subscriber {
    handle(message: MessageEvent<any>): Promise<void>;
    subscribe(serviceBus: IServiceBus): void;
}
