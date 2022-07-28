import { randomUUID } from "crypto";
import { ITrsansacaoRepository, Transacao, ResponsePaginado, RepositoryResponse, EMessageStatus } from "../../application-core";
import { Connection } from 'mysql';

export class TransacaoRepository implements ITrsansacaoRepository {

    constructor(private db: Connection) { }

    async buscarPorId(id: string): Promise<Transacao> {
        return { id: id } as Transacao;
    }

    async buscarTodos(): Promise<Array<Transacao>> {
        let transacoes: Array<Transacao> = [];

        this.db.query('', [], (err: any, result: [any]) => {
            if(!err)
            result.forEach(element => {
                transacoes.push({
                    id: element.id,
                    codigo: element.codigo,
                    codigoEmpresa: element.codigoEmpresa,
                    complemento: element.complemento,
                    data: element.data,
                    historico: element.historico
                } as Transacao);
            });
        });

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