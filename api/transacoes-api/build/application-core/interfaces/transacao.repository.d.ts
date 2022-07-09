import { Transacao } from "../model";
import { ResponsePaginado, RepositoryResponse } from "../types";
export interface ITrsansacaoRepository {
    buscarPorId(id: string): Promise<Transacao>;
    buscarTodos(): Promise<Array<Transacao>>;
    buscarTodosPaginado(pagina: number, tamanho: number): Promise<ResponsePaginado<Transacao>>;
    incluir(transacao: Transacao): Promise<RepositoryResponse<Transacao>>;
    alterar(transacao: Transacao): Promise<RepositoryResponse<Transacao>>;
    excluir(id: string): Promise<RepositoryResponse<boolean>>;
}
