import { EMessageStatus } from "../enum/message-status.enum";
export declare class RepositoryResponse<T> {
    status: EMessageStatus;
    model: T;
}
