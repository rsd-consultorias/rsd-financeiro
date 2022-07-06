import { randomUUID } from "crypto";
import { RepositoryResponse } from "../../application-core/application/repository.response";
import { ITrsansacaoRepository } from "../../application-core/interfaces/transacao.repository";
import { Transacao } from "../../application-core/model/transacao";
import { EMessageStatus } from "../../application-core/enum/message-status.enum";
import { Collection, MongoClient } from "mongodb";
import { ResponsePaginado } from "../../application-core/interfaces/response-paginado";

export class TransacaoRepository implements ITrsansacaoRepository {
    private collection?: Collection<Transacao>;

    constructor(private mongClient: MongoClient) {
        this.collection = this.mongClient.db("financeiro").collection<Transacao>("transacoes");
    }

    buscarPorId(id: string): Transacao {
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

    incluir(transacao: Transacao): RepositoryResponse<Transacao> {
        transacao.id = randomUUID();
        let result = this.collection!.insertOne(transacao).then(() => { }).catch(() => { }).finally(() => { });
        return { status: EMessageStatus.SUCCESS, model: transacao } as RepositoryResponse<Transacao>;
    }

    alterar(transacao: Transacao): RepositoryResponse<Transacao> {
        return { status: EMessageStatus.QUEUED, model: transacao } as RepositoryResponse<Transacao>;
    }

    excluir(id: string): RepositoryResponse<boolean> {
        return { status: EMessageStatus.QUEUED, model: true } as RepositoryResponse<boolean>;
    }

}