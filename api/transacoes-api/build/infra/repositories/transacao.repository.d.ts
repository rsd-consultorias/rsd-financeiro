import { MongoClient } from "mongodb";
import { ITrsansacaoRepository, Transacao, ResponsePaginado, RepositoryResponse } from "../../application-core";
export declare class TransacaoRepository implements ITrsansacaoRepository {
    private mongClient;
    private collection?;
    constructor(mongClient: MongoClient);
    buscarPorId(id: string): Promise<Transacao>;
    buscarTodos(): Promise<Array<Transacao>>;
    buscarTodosPaginado(pagina: number, tamanho: number): Promise<ResponsePaginado<Transacao>>;
    incluir(transacao: Transacao): Promise<RepositoryResponse<Transacao>>;
    alterar(transacao: Transacao): Promise<RepositoryResponse<Transacao>>;
    excluir(id: string): Promise<RepositoryResponse<boolean>>;
}
