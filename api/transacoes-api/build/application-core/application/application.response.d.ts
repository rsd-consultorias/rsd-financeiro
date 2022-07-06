import { EMessageStatus } from "../enum/message-status.enum";
import { EMessageTipo } from "../enum/message-tipo.enum";
export declare class ApplicationResponse {
    tipo: EMessageTipo;
    status: EMessageStatus;
    id: string;
    sucesso: boolean | false;
    mensagem: string | '';
}
export declare class ApplicationResponseModel<T> extends ApplicationResponse {
    model: T;
}
