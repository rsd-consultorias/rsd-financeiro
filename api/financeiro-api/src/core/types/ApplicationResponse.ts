export class ApplicationResponse<T> {
    sucesso?: boolean;
    mensagem?: string;
    body?: T;
}