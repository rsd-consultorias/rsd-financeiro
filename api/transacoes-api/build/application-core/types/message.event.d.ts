import { EMessageStatus, EMessageTipo } from "../enum";
export interface MessageEvent<T> {
    status: EMessageStatus;
    tipo: EMessageTipo;
    id: string;
    data: Date;
    payload: T;
    version: string;
}
