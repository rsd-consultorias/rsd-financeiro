"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const crypto_1 = require("crypto");
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const application_core_1 = require("./application-core");
const transacao_repository_1 = require("./infra/repositories/transacao.repository");
const handlers_1 = require("./infra/services/handlers");
const service_bus_service_1 = require("./infra/services/service-bus.service");
const API_PORTA = process.env.API_PORTA;
const API_VERSAO = 'v1';
const DB_CONN_STR = process.env.DB_CONN_STR;
const corsOptions = {
    origin: [
        'http://localhost:4200',
        'http://192.168.100.7:4200',
    ]
};
let mongoClient;
let transacaoApplication;
let serviceBus;
let transacaoCommands;
let transacaoRepository;
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json({ limit: '1mb' }));
app.use(express_1.default.urlencoded({ limit: '1mb', extended: true }));
app.set('trust proxy', true);
app.get(`/api/${API_VERSAO}/`, async (req, res) => {
    let pagina = req.query.pagina ?? '0';
    let tamanho = req.query.tamanho ?? '15';
    let response = await transacaoRepository.buscarTodosPaginado(Number(pagina), Number(tamanho));
    res.json(response);
});
app.get(`/api/${API_VERSAO}/:id`, async (req, res) => {
    res.send("ok!");
});
app.put(`/api/${API_VERSAO}/`, async (req, res) => {
    let transacao = req.body;
    transacao.id = (0, crypto_1.randomUUID)();
    try {
        res.json(await transacaoCommands.criarTransacao(transacao));
    }
    catch (error) {
        res.json({
            exception: error
        });
    }
});
app.put(`/api/${API_VERSAO}/lote`, async (req, res) => {
    let transacoes = req.body;
    let processados = [];
    transacoes.forEach(async (transacao) => {
        transacao.id = (0, crypto_1.randomUUID)();
        processados.push(await transacaoCommands.criarTransacao(transacao));
    });
    res.json(processados);
});
app.post(`/api/${API_VERSAO}/`, async (req, res) => {
    res.send("ok!");
});
app.delete(`/api/${API_VERSAO}/`, async (req, res) => {
    res.send("ok!");
});
app.use(function (err, req, res, next) {
    if (err.name == 'PayloadTooLargeError') {
        res.status(400).json({
            error: 'LIMITE_TAMANHO',
            descricao: 'Request maior que 1Mb será recusado'
        });
    }
    else {
        next(err);
    }
});
// Listener
app.listen(API_PORTA, async () => {
    mongoClient = await mongodb_1.MongoClient.connect(DB_CONN_STR);
    transacaoRepository = new transacao_repository_1.TransacaoRepository(mongoClient);
    serviceBus = new service_bus_service_1.ServiceBus(transacaoRepository, mongoClient);
    transacaoCommands = new application_core_1.TransacaoCommands(serviceBus);
    transacaoApplication = new application_core_1.TransacaoApplication(transacaoRepository);
    // Subscribe handlers
    new handlers_1.AlterarTransacaoHandler().subscribe(serviceBus);
    new handlers_1.AtualizarSaldoSnapshotHandler().subscribe(serviceBus);
    new handlers_1.IncluirTransacaoHandler(transacaoRepository).subscribe(serviceBus);
    console.log(`${new Date().toISOString()} Escutando porta ${API_PORTA}`);
    console.log(`${new Date().toISOString()} Ambiente ${process.env.NODE_ENV}`);
});
//# sourceMappingURL=main.js.map