import { randomUUID } from "crypto";
import { Connection } from "mysql";
import { IContaRepository } from "../../core/interfaces/IContaRepository";
import { Conta } from "../../core/model/Conta";
import { RepositoryResponse } from "../../core/types/RepositoryResponse";

export class ContaRepository implements IContaRepository {

    constructor(private dbClient: Connection) { }

    buscarPorIdentificadorFiscal(identificador: string): Promise<RepositoryResponse<Conta>> {
        return new Promise((resolve, reject) => {
            let response: RepositoryResponse<Conta> = {};

            this.dbClient.query('SELECT ID, NOME, RAZAO_SOCIAL, IDENTIFICADOR_FISCAL FROM APP_CONTA WHERE IDENTIFICADOR_FISCAL = ? limit 1',
                [identificador],
                (err, result) => {
                    if (!err) {
                        if (result.length != 0) {
                            response.sucesso = true;
                            response.body = {
                                id: result.ID,
                                nome: result.NOME,
                                razaoSocial: result.RAZAO_SOCIAL,
                                identificadorFiscal: result.IDENTIFICADOR_FISCAL
                            } as Conta;
                        } else {
                            response.sucesso = false;
                        }
                        resolve(response);
                    } else {
                        response.sucesso = false;
                        response.mensagem = err.message;
                        reject(response);
                    }
                });
        });
    }

    listarTodos(opcoes?: { pagina: number, offset: number } | undefined): Promise<RepositoryResponse<Array<Conta>>> {
        return new Promise((resolve, reject) => {
            let response: RepositoryResponse<Array<Conta>> = new RepositoryResponse<Array<Conta>>();
            let contas: Array<Conta> = [];
            response.body = [];

            this.dbClient.query('SELECT ID, NOME, RAZAO_SOCIAL, IDENTIFICADOR_FISCAL FROM APP_CONTA',
                (err: Error, result: [any]) => {
                    if (!err) {
                        response.sucesso = true;

                        result.forEach((item) => {
                            contas.push({
                                id: item.ID,
                                nome: item.NOME,
                                razaoSocial: item.RAZAO_SOCIAL,
                                identificadorFiscal: item.IDENTIFICADOR_FISCAL
                            });
                            response.body = contas;
                            resolve(response);
                        });
                    } else {
                        response.sucesso = false;
                        response.mensagem = err.message;
                        reject(response);
                    }
                });
        });
    }

    incluir(model: Conta): Promise<RepositoryResponse<Conta>> {
        return new Promise((resolve, reject) => {
            let response: RepositoryResponse<Conta> = {};
            model.id = randomUUID();

            this.dbClient.query('INSERT INTO APP_CONTA (ID, NOME, RAZAO_SOCIAL, IDENTIFICADOR_FISCAL) VALUES (?, ?, ?, ?)',
                [model.id, model.nome, model.razaoSocial, model.identificadorFiscal],
                (err, result) => {
                    if (!err) {
                        response.sucesso = true;
                        response.body = model;
                        resolve(response);
                    } else {
                        response.sucesso = false;
                        response.mensagem = err.message;
                        reject(response);
                    }
                });
        });
    }

    alterar(model: Conta): Promise<RepositoryResponse<Conta>> {
        return new Promise((resolve, reject) => {
            let response: RepositoryResponse<Conta> = {};

            this.dbClient.query('UPDATE APP_CONTA SET NOME = ?, RAZAO_SOCIAL = ? WHERE ID = ?',
                [model.nome, model.identificadorFiscal, model.razaoSocial],
                (err, result) => {
                    if (!err) {
                        response.sucesso = true;
                        response.body = model;
                    } else {
                        response.sucesso = false;
                        response.mensagem = err.message;
                    }
                });
        });
    }

    excluir(id: string): Promise<RepositoryResponse<Conta>> {
        return new Promise((resolve, reject) => {
            let response: RepositoryResponse<Conta> = {};

            this.dbClient.query('DELETE FROM APP_CONTA WHERE ID = ?',
                [id],
                (err, result) => {
                    if (!err) {
                        response.sucesso = true;
                    } else {
                        response.sucesso = false;
                        response.mensagem = err.message;
                    }
                });
        });
    }
}