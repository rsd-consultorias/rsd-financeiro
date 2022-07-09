import cors from "cors";
import { randomUUID } from "crypto";
import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { TransacaoApplication, IServiceBus, TransacaoCommands, ITrsansacaoRepository, Transacao } from "./application-core";
import { TransacaoRepository } from "./infra/repositories/transacao.repository";
import { AlterarTransacaoHandler, AtualizarSaldoSnapshotHandler, IncluirTransacaoHandler } from "./infra/services/handlers";
import { ServiceBus } from "./infra/services/service-bus.service";

const API_PORTA = process.env.API_PORTA!;
const API_VERSAO = 'v1';
const DB_CONN_STR = process.env.DB_CONN_STR!;

const corsOptions = {
    origin: [
        'http://localhost:4200',
        'http://192.168.100.7:4200',
    ]
};

let mongoClient: MongoClient;
let transacaoApplication: TransacaoApplication;
let serviceBus: IServiceBus;
let transacaoCommands: TransacaoCommands;
let transacaoRepository: ITrsansacaoRepository;

const app = express();
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }))
app.set('trust proxy', true);

app.get(`/api/${API_VERSAO}/`, async (req: Request, res: Response) => {
    let pagina = req.query.pagina ?? '0';
    let tamanho = req.query.tamanho ?? '15';
    let response = await transacaoRepository.buscarTodosPaginado(Number(pagina), Number(tamanho));

    res.json(response);
});

app.get(`/api/${API_VERSAO}/:id`, async (req: Request, res: Response) => {
    res.send("ok!");
});

app.put(`/api/${API_VERSAO}/`, async (req: Request, res: Response) => {
    let transacao: Transacao = req.body;
    transacao.id = randomUUID();

    try {
        res.json(await transacaoCommands.criarTransacao(transacao));
    } catch (error) {
        res.json({
            exception: error
        });
    }
});

app.put(`/api/${API_VERSAO}/lote`, async (req: Request, res: Response) => {
    let transacoes: Array<Transacao> = req.body;
    let processados: Array<any> = [];
    transacoes.forEach(async transacao => {
        transacao.id = randomUUID();
        processados.push(await transacaoCommands.criarTransacao(transacao));
    });

    res.json(processados);
});

app.post(`/api/${API_VERSAO}/`, async (req: Request, res: Response) => {
    res.send("ok!");
});

app.delete(`/api/${API_VERSAO}/`, async (req: Request, res: Response) => {
    res.send("ok!");
});

app.use(function (err: Error, req: Request, res: Response, next: any) {
    if (err.name == 'PayloadTooLargeError') {
        res.status(400).json({
            error: 'LIMITE_TAMANHO',
            descricao: 'Request maior que 1Mb será recusado'
        });
    }
    else {
        next(err);
    }
})

// Listener
app.listen(API_PORTA, async () => {
    mongoClient = await MongoClient.connect(DB_CONN_STR);
    transacaoRepository = new TransacaoRepository(mongoClient);
    serviceBus = new ServiceBus(transacaoRepository, mongoClient);
    transacaoCommands = new TransacaoCommands(serviceBus);
    transacaoApplication = new TransacaoApplication(transacaoRepository);

    // Subscribe handlers
    new AlterarTransacaoHandler().subscribe(serviceBus);
    new AtualizarSaldoSnapshotHandler().subscribe(serviceBus);
    new IncluirTransacaoHandler(transacaoRepository).subscribe(serviceBus);

    console.log(`Escutando porta ${API_PORTA}`);
});