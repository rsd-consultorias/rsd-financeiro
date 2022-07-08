import { EMessageStatus } from "../enum/message-status.enum";

export class RepositoryResponse<T> {
    public status!: EMessageStatus;
    public model!: T;
}