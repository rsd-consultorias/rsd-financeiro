import { MessageEvent } from "../types/message.event";
export interface IServiceBus {
    publish(message: MessageEvent<any>, queue: string): Promise<MessageEvent<any>>;
}
