import { EMessageStatus } from "./enum/message-status.enum";
import { EMessageTipo } from "./enum/message-tipo.enum";

export class APIResponse<T> {
    public tipo!: EMessageTipo;
    public status!: EMessageStatus;
    public id!: string;
    public sucesso!: boolean | false;
    public mensagem!: string | '';
    public model!: T;
}