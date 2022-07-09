import { MessageEvent } from "../types";
export interface IServiceBus {
    publish(message: MessageEvent<any>, queue: string): Promise<MessageEvent<any>>;
    subscribe(subscriber: any): void;
}
