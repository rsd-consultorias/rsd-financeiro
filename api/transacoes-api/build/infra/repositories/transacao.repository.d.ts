import { ITrsansacaoRepository } from "../../application-core/interfaces/transacao.repository";
import { Transacao } from "../../application-core/model/transacao";
import { MongoClient } from "mongodb";
import { ResponsePaginado } from "../../application-core/types/response-paginado";
import { RepositoryResponse } from "../../application-core/types/repository.response";
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
