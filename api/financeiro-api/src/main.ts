import cors from "cors";
import express, { Request, Response } from "express";
import { Connection, createConnection } from "mysql";
import { ContaApplication } from "./core/application/ContaApplication";
import { IContaRepository } from "./core/interfaces/IContaRepository";
import { EEventos } from "./core/types/Eventos.enum";
import { ContaRepository } from "./infra/repositories/ContaRepository";
import { publicarContaCriada } from "./infra/service-bus/ContaPublisher";

const API_PORTA = 4201;
const API_VERSAO = 'v1';

const corsOptions = {
    origin: [
        'http://localhost:4200',
        'http://192.168.100.7:4200',
    ]
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }))
app.set('trust proxy', true);

var dbClient: Connection;
var contaRepository: IContaRepository;
var contaApplication: ContaApplication;

// Endpoints: Contas
app.get(`/api/${API_VERSAO}/contas`, async (req: Request, res: Response) => {
    try {
        res.json(await contaRepository.listarTodos());
    }
    catch (err) {
        res.json(err);
    }
});

app.post(`/api/${API_VERSAO}/contas`, async (req: Request, res: Response) => {
    try {
        res.json(await contaApplication.criarNovaConta(req.body!));
    } catch (err) {
        res.json(err);
    }
});

// Endpoints: health
app.get(`/api/${API_VERSAO}/`, async (req: Request, res: Response) => {
    res.send("ok!");
});

// Tratar erros
app.use(function (err: Error, req: Request, res: Response, next: any) {
    if (err.name == 'PayloadTooLargeError') {
        res.status(400).json({
            error: 'LIMITE_TAMANHO',
            descricao: 'Request maior que 1Mb é recusado'
        });
    }
    else {
        next(err);
    }
});

// Listener
app.listen(API_PORTA, async () => {
    dbClient = createConnection({
        host: 'localhost',
        port: 3306,
        password: 'root',
        user: 'root',
        database: 'FINANCEIRO'
    });
    
    contaRepository = new ContaRepository(dbClient);
    contaApplication = new ContaApplication(contaRepository);
    contaApplication.on(EEventos.CONTA_CRIADA, (data) => publicarContaCriada(data));

    console.log(`${new Date().toISOString()} Escutando porta ${API_PORTA}`);
    console.log(`${new Date().toISOString()} Ambiente ${process.env.NODE_ENV}`);
});