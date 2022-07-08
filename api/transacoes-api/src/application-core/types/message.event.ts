import { EMessageStatus } from "../enum/message-status.enum";
import { EMessageTipo } from "../enum/message-tipo.enum";

export interface MessageEvent<T> {
    status: EMessageStatus;
    tipo: EMessageTipo;
    id: string;
    data: Date;
    payload: T;
    version: string;
}