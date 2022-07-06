import { EMessageStatus } from "../enum/message-status.enum";
export interface IServiceBus {
    publish(message: any, queue: string): Promise<EMessageStatus>;
}
