import { randomUUID } from "crypto";
import { ITrsansacaoRepository } from "../../application-core/interfaces/transacao.repository";
import { Transacao } from "../../application-core/model/transacao";
import { EMessageStatus } from "../../application-core/enum/message-status.enum";
import { Collection, MongoClient } from "mongodb";
import { ResponsePaginado } from "../../application-core/types/response-paginado";
import { RepositoryResponse } from "../../application-core/types/repository.response";

export class TransacaoRepository implements ITrsansacaoRepository {
    private collection?: Collection<Transacao>;

    constructor(private mongClient: MongoClient) {
        this.collection = this.mongClient.db("financeiro").collection<Transacao>("transacoes");
    }

    async buscarPorId(id: string): Promise<Transacao> {
        return { id: id } as Transacao;
    }

    async buscarTodos(): Promise<Array<Transacao>> {
        let transacoes: Array<Transacao> = [];

        await this.collection!.find({}, { projection: { _id: 0 }, sort: { data: -1, _id: -1 } }).forEach(data => {
            transacoes.push(data);
        });

        return transacoes;
    }

    async buscarTodosPaginado(pagina: number, tamanho: number): Promise<ResponsePaginado<Transacao>> {
        let response = new ResponsePaginado<Transacao>();
        let transacoes: Array<Transacao> = [];
        await this.collection!.find({}, { projection: { _id: 0 }, sort: { data: -1, _id: -1 } }).limit(tamanho).skip(pagina).forEach(data => {
            transacoes.push(data);
        });

        response.data = transacoes;
        response.pagina = pagina;
        response.tamanho = tamanho;
        response.total = await this.collection!.countDocuments();

        return response;
    }

    async incluir(transacao: Transacao): Promise<RepositoryResponse<Transacao>> {
        transacao.id = randomUUID();
        let result = await this.collection!.insertOne(transacao);

        return { status: result.acknowledged ? EMessageStatus.SUCCESS : EMessageStatus.FAIL, model: transacao } as RepositoryResponse<Transacao>;
    }

    async alterar(transacao: Transacao): Promise<RepositoryResponse<Transacao>> {
        return { status: EMessageStatus.QUEUED, model: transacao } as RepositoryResponse<Transacao>;
    }

    async excluir(id: string): Promise<RepositoryResponse<boolean>> {
        return { status: EMessageStatus.QUEUED, model: true } as RepositoryResponse<boolean>;
    }

}