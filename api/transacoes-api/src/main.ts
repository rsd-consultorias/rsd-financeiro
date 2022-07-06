import express, { Request, Response } from 'express';
import cors from 'cors';
import { Transacao } from './application-core/model/transacao';
import { TransacaoApplication } from './application-core/application/transacao.application';
import { ITrsansacaoRepository } from './application-core/interfaces/transacao.repository';
import { TransacaoRepository } from './infra/repositories/transacao.repository';
import { TransacaoCommands } from './application-core/commands/transacao.commands';
import { ServiceBus } from './infra/services/service-bus.service';
import { IServiceBus } from './application-core/interfaces/service-bus.interface';
import { MongoClient } from 'mongodb';
import { randomUUID } from 'crypto';
import { hostname } from 'os';

const API_PORTA = 4201;
const API_VERSAO = 'v1'
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

app.get(`/api/${API_VERSAO}/:id`, async (req: any, res: any) => {
    res.send("ok!");
});

app.put(`/api/${API_VERSAO}/`, async (req: Request, res: Response) => {
    let transacao: Transacao = req.body;
    transacao.id = randomUUID();

    res.json(await transacaoApplication.incluir(transacao));
});

app.put(`/api/${API_VERSAO}/lote`, async (req: Request, res: Response) => {
    let transacoes: Array<Transacao> = req.body;
    let processados: Array<any> = [];
    transacoes.forEach(async transacao => {
        transacao.id = randomUUID();
        processados.push(await transacaoApplication.incluir(transacao));
    });

    res.json(processados);
});

app.post(`/api/${API_VERSAO}/`, async (req: any, res: any) => {
    res.send("ok!");
});

app.delete(`/api/${API_VERSAO}/`, async (req: any, res: any) => {
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
    mongoClient = await MongoClient.connect('mongodb://localhost:27017/financeiro?readPreference=primary&appname=api-rsd-transacoes&directConnection=true&ssl=false');
    transacaoRepository = new TransacaoRepository(mongoClient);
    serviceBus = new ServiceBus(transacaoRepository, mongoClient);
    transacaoCommands = new TransacaoCommands(serviceBus);

    transacaoApplication = new TransacaoApplication(transacaoRepository, transacaoCommands);
    console.log(`Escutando porta ${API_PORTA}`);
});