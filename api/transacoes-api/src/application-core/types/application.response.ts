import { EMessageTipo, EMessageStatus } from "../enum";

export class ApplicationResponse {
    public tipo!: EMessageTipo;
    public status!: EMessageStatus;
    public id!: string;
    public sucesso!: boolean | false;
    public mensagem!: string | '';
}

export class ApplicationResponseModel<T> extends ApplicationResponse {
    public model!: T;
}