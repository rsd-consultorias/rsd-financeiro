export class RepositoryResponse<T> {
    sucesso?: boolean;
    mensagem?: string;
    body?: T;
}

export class RepositoryResponseLista<T> extends RepositoryResponse<T> {
    registros?: number;
    quantidade?: number;
}