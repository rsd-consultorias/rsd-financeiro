import { RepositoryResponse } from "../types/RepositoryResponse";

export interface IRepository<T> {
    listarTodos(opcoes?: {pagina: number, offset: number}): Promise<RepositoryResponse<Array<T>>>;
    incluir(model: T): Promise<RepositoryResponse<T>>;
    alterar(model: T): Promise<RepositoryResponse<T>>;
    excluir(id: string): Promise<RepositoryResponse<T>>;
}