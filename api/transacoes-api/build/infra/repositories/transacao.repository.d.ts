import { RepositoryResponse } from "../../application-core/application/repository.response";
import { ITrsansacaoRepository } from "../../application-core/interfaces/transacao.repository";
import { Transacao } from "../../application-core/model/transacao";
import { MongoClient } from "mongodb";
import { ResponsePaginado } from "../../application-core/interfaces/response-paginado";
export declare class TransacaoRepository implements ITrsansacaoRepository {
    private mongClient;
    private collection?;
    constructor(mongClient: MongoClient);
    buscarPorId(id: string): Transacao;
    buscarTodos(): Promise<Array<Transacao>>;
    buscarTodosPaginado(pagina: number, tamanho: number): Promise<ResponsePaginado<Transacao>>;
    incluir(transacao: Transacao): RepositoryResponse<Transacao>;
    alterar(transacao: Transacao): RepositoryResponse<Transacao>;
    excluir(id: string): RepositoryResponse<boolean>;
}
