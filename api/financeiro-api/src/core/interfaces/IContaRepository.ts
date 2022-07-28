import { Conta } from "../model/Conta";
import { RepositoryResponse } from "../types/RepositoryResponse";
import { IRepository } from "./IRepository";

export interface IContaRepository extends IRepository<Conta> {
    buscarPorIdentificadorFiscal(identificador: string): Promise<RepositoryResponse<Conta>>;
}
