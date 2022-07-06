import { EMessageStatus } from "../enum/message-status.enum";
import { EMessageTipo } from "../enum/message-tipo.enum";
export declare abstract class MessageEvent {
    status: EMessageStatus;
    tipo: EMessageTipo;
    id: string | any;
    data: Date | any;
}
