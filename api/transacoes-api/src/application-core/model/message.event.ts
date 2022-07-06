import { EMessageStatus } from "../enum/message-status.enum";
import { EMessageTipo } from "../enum/message-tipo.enum";

export abstract class MessageEvent {
    public status!: EMessageStatus;
    public tipo!: EMessageTipo;
    public id: string | any;
    public data: Date | any;
}