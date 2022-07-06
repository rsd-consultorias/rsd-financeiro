import { RepositoryResponse } from "../application/repository.response";
import { Transacao } from "../model/transacao";
import { ResponsePaginado } from "./response-paginado";
export interface ITrsansacaoRepository {
    buscarPorId(id: string): Transacao;
    buscarTodos(): Promise<Array<Transacao>>;
    buscarTodosPaginado(pagina: number, tamanho: number): Promise<ResponsePaginado<Transacao>>;
    incluir(transacao: Transacao): RepositoryResponse<Transacao>;
    alterar(transacao: Transacao): RepositoryResponse<Transacao>;
    excluir(id: string): RepositoryResponse<boolean>;
}
