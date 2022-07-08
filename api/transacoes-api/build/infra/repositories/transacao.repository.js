"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransacaoRepository = void 0;
const crypto_1 = require("crypto");
const message_status_enum_1 = require("../../application-core/enum/message-status.enum");
const response_paginado_1 = require("../../application-core/types/response-paginado");
class TransacaoRepository {
    constructor(mongClient) {
        this.mongClient = mongClient;
        this.collection = this.mongClient.db("financeiro").collection("transacoes");
    }
    async buscarPorId(id) {
        return { id: id };
    }
    async buscarTodos() {
        let transacoes = [];
        await this.collection.find({}, { projection: { _id: 0 }, sort: { data: -1, _id: -1 } }).forEach(data => {
            transacoes.push(data);
        });
        return transacoes;
    }
    async buscarTodosPaginado(pagina, tamanho) {
        let response = new response_paginado_1.ResponsePaginado();
        let transacoes = [];
        await this.collection.find({}, { projection: { _id: 0 }, sort: { data: -1, _id: -1 } }).limit(tamanho).skip(pagina).forEach(data => {
            transacoes.push(data);
        });
        response.data = transacoes;
        response.pagina = pagina;
        response.tamanho = tamanho;
        response.total = await this.collection.countDocuments();
        return response;
    }
    async incluir(transacao) {
        transacao.id = (0, crypto_1.randomUUID)();
        let result = await this.collection.insertOne(transacao);
        return { status: result.acknowledged ? message_status_enum_1.EMessageStatus.SUCCESS : message_status_enum_1.EMessageStatus.FAIL, model: transacao };
    }
    async alterar(transacao) {
        return { status: message_status_enum_1.EMessageStatus.QUEUED, model: transacao };
    }
    async excluir(id) {
        return { status: message_status_enum_1.EMessageStatus.QUEUED, model: true };
    }
}
exports.TransacaoRepository = TransacaoRepository;
